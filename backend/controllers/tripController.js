const Trip = require("../models/Trip");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateTrip = async (req, res) => {
  try {
    const {
      destination,
      durationDays,
      budgetTier,
      interests,
    } = req.body;

    const currentMonth = new Date().toLocaleString(
      "en-US",
      { month: "long" }
    );

    const prompt = `
You are an expert travel planner.

Create a detailed and realistic ${durationDays}-day travel itinerary.

Destination: ${destination}
Budget Tier: ${budgetTier}
Interests: ${interests.join(", ")}
Current Month: ${currentMonth}

Requirements:
1. Create a day-by-day itinerary.
2. Include morning, afternoon and evening activities.
3. Recommend 3 hotels.
4. Generate realistic budget estimates.
5. Generate a weather-aware packing checklist.
6. Return ONLY valid JSON.
7. Do not return markdown.
8. Every activity must contain a realistic estimatedCostUSD.
9. Free attractions can be 0, but restaurants, cruises, museums, transportation and paid attractions must have realistic costs.

Return JSON in this format:

{
  "itinerary": [
    {
      "dayNumber": 1,
      "activities": [
        {
          "title": "Activity Name",
          "description": "Short description",
          "estimatedCostUSD": 20,
          "timeOfDay": "Morning"
        }
      ]
    }
  ],
  "hotels": [
    {
      "name": "Hotel Name",
      "tier": "Budget",
      "estimatedCostNightUSD": 80,
      "rating": "4.5/5"
    }
  ],
  "estimatedBudget": {
    "transport": 100,
    "accommodation": 300,
    "food": 150,
    "activities": 120,
    "total": 670
  },
  "packingList": [
    {
      "item": "Passport",
      "category": "Documents",
      "isPacked": false
    }
  ]
}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    let text = response.text;

    if (!text) {
      return res.status(500).json({
        message: "Gemini returned empty response",
      });
    }

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.error(
        "JSON Parse Error:",
        error
      );

      console.error(
        "Gemini Response:",
        text
      );

      return res.status(500).json({
        message:
          "Gemini returned invalid JSON",
      });
    }

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      durationDays,
      budgetTier,
      interests,

      itinerary:
        parsed.itinerary || [],

      hotels:
        parsed.hotels || [],

      estimatedBudget:
        parsed.estimatedBudget || {
          transport: 0,
          accommodation: 0,
          food: 0,
          activities: 0,
          total: 0,
        },

      packingList:
        parsed.packingList || [],
    });

    return res
      .status(201)
      .json(trip);
  } catch (err) {
    console.error(
      "Trip Generation Error:",
      err
    );

    return res.status(500).json({
      message:
        "Trip Generation Failed",
    });
  }
};

exports.getTrips = async (
  req,
  res
) => {
  try {
    const trips =
      await Trip.find({
        userId: req.user.id,
      }).sort({
        createdAt: -1,
      });

    return res.json(trips);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message:
        "Failed to fetch trips",
    });
  }
};

exports.getTrip = async (
  req,
  res
) => {
  try {
    const trip =
      await Trip.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.json(trip);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message:
        "Failed to fetch trip",
    });
  }
};

exports.updateTrip = async (
  req,
  res
) => {
  try {
    const trip =
      await Trip.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user.id,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.json(trip);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message:
        "Failed to update trip",
    });
  }
};

exports.deleteTrip = async (
  req,
  res
) => {
  try {
    const deletedTrip =
      await Trip.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

    if (!deletedTrip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.json({
      message:
        "Trip Deleted Successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message:
        "Failed to delete trip",
    });
  }
};

exports.addActivity = async (req, res) => {
  try {
    const { dayNumber, activity } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const day = trip.itinerary.find(
      (d) => d.dayNumber === Number(dayNumber)
    );

    if (!day) {
      return res.status(404).json({
        message: "Day not found",
      });
    }

    day.activities.push(activity);

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to add activity",
    });
  }
};

exports.removeActivity = async (req, res) => {
  try {
    const { dayNumber, activityIndex } =
      req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const day = trip.itinerary.find(
      (d) => d.dayNumber === Number(dayNumber)
    );

    if (!day) {
      return res.status(404).json({
        message: "Day not found",
      });
    }

    day.activities.splice(
      activityIndex,
      1
    );

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to remove activity",
    });
  }
};


exports.regenerateDay = async (
  req,
  res
) => {
  try {
    const { dayNumber } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const prompt = `
Generate ONLY day ${dayNumber}
for a trip to ${trip.destination}

Return JSON:

{
  "activities":[
    {
      "title":"",
      "description":"",
      "estimatedCostUSD":20,
      "timeOfDay":"Morning"
    }
  ]
}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    let text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(text);

    const day =
      trip.itinerary.find(
        (d) =>
          d.dayNumber ===
          Number(dayNumber)
      );

    day.activities =
      parsed.activities;

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message:
        "Failed to regenerate day",
    });
  }
};
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  estimatedCostUSD: Number,
  timeOfDay: String
});

const daySchema = new mongoose.Schema({
  dayNumber: Number,
  activities: [activitySchema]
});

const packingSchema = new mongoose.Schema({
  item: String,
  category: String,
  isPacked: {
    type: Boolean,
    default: false
  }
});

const hotelSchema = new mongoose.Schema({
  name: String,
  tier: String,
  estimatedCostNightUSD: Number,
  rating: String
});

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    destination: String,

    durationDays: Number,

    budgetTier: {
      type: String,
      enum: ["Low", "Medium", "High"]
    },

    interests: [String],

    itinerary: [daySchema],

    hotels: [hotelSchema],

    estimatedBudget: {
      transport: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      total: Number
    },

    packingList: [packingSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Trip", tripSchema);
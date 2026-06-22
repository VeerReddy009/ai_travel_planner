const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const fallbackMongoUri =
    process.env.MONGO_URI_FALLBACK ||
    "mongodb://127.0.0.1:27017/ai-travel-planner";

  if (!mongoUri) {
    console.error("MONGO_URI is not set.");
    return;
  }

  try {
    console.log("=================================");
    console.log("MONGO_URI =", mongoUri);
    console.log("=================================");

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    const isSrvLookupError =
      err &&
      (err.code === "ECONNREFUSED" ||
        err.code === "ENOTFOUND" ||
        err.code === "EAI_AGAIN") &&
      typeof mongoUri === "string" &&
      mongoUri.startsWith("mongodb+srv://");

    if (isSrvLookupError) {
      console.error(
        "Atlas SRV lookup failed. Trying fallback MongoDB URI..."
      );

      try {
        await mongoose.connect(fallbackMongoUri, {
          serverSelectionTimeoutMS: 5000,
        });

        console.log(
          "MongoDB Connected using fallback URI"
        );
        return;
      } catch (fallbackErr) {
        console.error(
          "Fallback MongoDB connection failed:"
        );
        console.error(fallbackErr);
      }
    }

    console.error("MongoDB Connection Error:");
    console.error(err);
    console.error(
      "Server will continue running without a database connection. Set MONGO_URI_FALLBACK to a reachable local MongoDB or fix Atlas DNS/network access."
    );
  }
};

module.exports = connectDB;
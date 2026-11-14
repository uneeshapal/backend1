import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

mongoose.set("bufferCommands", false);

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.ATLASURL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected");
    console.log("Database Name:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log("Retrying MongoDB connection in 5 seconds...");
    setTimeout(connectDatabase, 5000);
  }
};

connectDatabase();

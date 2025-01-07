import mongoose from "mongoose";
import config from "../config/index.js";
import print from "../utils/console.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.dbUrl);
    print(`MongoDB Connected: ${conn.connection.db.databaseName}`, "cyan");
  } catch (error) {
    print("MongoDB Connection Error", "red");
    process.exit(1);
  }
};

import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("mongoDB Connected.");
  } catch {
    logger.error("Could not connect to DB.");
    process.exit(1);
  }
};

export default connectDB;

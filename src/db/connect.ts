import mongoose from "mongoose";
import config from "../config/default";

const connectDB = async () => {
  try {
    const connection: any = await mongoose.connect(config.dbURI);
    console.log("mongoDB Connected.");
  } catch {
    console.error("Could not connect to DB.");
    process.exit(1);
  }
};

export default connectDB;

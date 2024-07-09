import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/taskmanager");
    console.log("MongoDB connected...");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      process.exit(1);
    } else {
      console.error("Unexpected error", err);
      process.exit(1);
    }
  }
};

export default connectDB;

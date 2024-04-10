import mongoose from "mongoose";

export default async function connectDB(db) {
  try {
    await mongoose.connect(db);
    console.log("The connect is successfully");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

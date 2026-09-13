import mongoose from "mongoose";

export let isDbConnected = false;

export const checkDbConnected = () => {
  return isDbConnected && mongoose.connection.readyState === 1;
};

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mhada_utsav_db";
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    isDbConnected = true;
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Offline notice: Local MongoDB not detected (${error.message}).`);
    console.warn(`[MongoDB] Running in standalone offline mode (all public and admin features remain fully active).`);
    isDbConnected = false;
    return false;
  }
};

export default connectDB;

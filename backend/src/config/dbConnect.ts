import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || ''

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URL);
    console.log(`Database connected: ${connect.connection.host}, ${connect.connection.name}`, "Mongoose connected");
  } catch (err) {
        console.log(err);
        process.exit(1);
  }
  // if (mongoose.connection.readyState >= 1) return; // already connected
  // await mongoose.connect(MONGO_URL, { dbName: "expo-app" });
  // console.log("Mongoose connected");
};

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

export let auth: ReturnType<typeof betterAuth>;

export const initAuth = () => {
  const db = mongoose.connection.db as unknown as import("mongodb").Db;

  // if (!mongoose.connection.db) throw new Error("Mongoose not connected yet!");

  auth = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.AUTH_SECRET || "supersecretkey",
    tokenLifetime: "1h",
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 4
    },
    user: {
      fields: {}
    }
  });

  console.log("Better Auth initialized");
  return auth;
};




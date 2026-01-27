import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import mongoose from "mongoose";
import Challenge from "../models/challengeSchema";

async function savePredefinedChallenges() {
  await mongoose.connect(process.env.MONGO_URL || ''); // npx tsx src/seed/data.ts 

  const challenges = [
    { title: "Take a new route during a walk", isPredefined: true },
    { title: "Try out a new recipe", isPredefined: true },
    { title: "Watch a movie from an unexplored genre", isPredefined: true },
    { title: "Make short small talk with a stranger", isPredefined: true },
    { title: "Complete a chore you've been postponing (or one that came up today)", isPredefined: true },
    { title: "Go someplace new and do something fun (like a park, or nearby town)", isPredefined: true },
    { title: "Plan your next 3 days", isPredefined: true },
    { title: "Plan your next week", isPredefined: true },
    { title: "Watch a video from a new channel", isPredefined: true },
    { title: "Complete a task that will make tomorrow easier", isPredefined: true },
    { title: "Limit your phone time to 2h for the day", isPredefined: true },
    
  ]

  await Challenge.deleteMany({ isPredefined: true });
  await Challenge.insertMany(challenges);

  // await Promise.all(
  //   challenges.map(ch => 
  //     Challenge.updateOne(
  //       { title: ch.title },
  //       { $set: ch },
  //       { upsert: true }
  //     )
  //   )
  // );

  console.log("Predefined challenges seeded successfully!");
  await mongoose.disconnect();
}

savePredefinedChallenges().catch(err => {
  console.error(err);
  process.exit(1);
});
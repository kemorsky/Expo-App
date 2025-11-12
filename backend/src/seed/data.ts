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
    { title: "Take a moonlit walk", isPredefined: true },
    { title: "Try out a new recipe", isPredefined: true },
    { title: "Watch a movie from an unexplored genre", isPredefined: true },
    { title: "Make short small talk with a stranger", isPredefined: true },
    { title: "Complete a chore you've been postponing (or one that came up today!)", isPredefined: true },
    { title: "Go someplace new and do something fun (like a park, or nearby town)", isPredefined: true },
  ]

  await Promise.all(
    challenges.map(ch => 
      Challenge.updateOne(
        { title: ch.title },
        { $set: ch },
        { upsert: true }
      )
    )
  );

  console.log("Predefined challenges seeded successfully!");
  await mongoose.disconnect();
}

savePredefinedChallenges().catch(err => {
  console.error(err);
  process.exit(1);
});
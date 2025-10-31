import mongoose from "mongoose";

export const settingsSchema = new mongoose.Schema(
    {
        numberOfChallengesPerDay: { 
            type: Number, 
            default: 1,
            max: [3, "You can only do a maximum of 3 challenges per day. It's important not to overexert yourself, even if it feels like you can!"]
        },
        language: { 
            type: String, 
            default: "en" 
        },
        theme: { 
            type: String,
            default: "dark"
        }
    }, { 
        _id: false 
    }
);
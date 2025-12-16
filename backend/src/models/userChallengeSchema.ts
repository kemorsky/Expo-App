import mongoose, { ObjectId, Document } from "mongoose";
import { ChallengeDocument } from "./challengeSchema";

export type UserChallengeDocument = Document & {
    _id: ObjectId;
    user: ObjectId;
    challenge: ObjectId | ChallengeDocument;
    notes: string;
    done: boolean;
    currentChallenge: boolean;
    currentChallengeExpiresAt: string | null;
    createdAt: string;
    updatedAt: string;
    completedAt: Date | null
}

const userChallengeSchema = new mongoose.Schema<UserChallengeDocument>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        challenge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenge",
            required: true
        },
        notes: {
            type: String,
            required: false
        },
        done: {
            type: Boolean,
            required: true
        },
        currentChallenge: {
            type: Boolean,
            default: false
        },
        currentChallengeExpiresAt: {
            type: String,
            default: null
        },
        completedAt: {
            type: Date,
            default: null
        }
    }, {
            timestamps: true,
            validateBeforeSave: true,
    }
)

const UserChallenge = mongoose.model<UserChallengeDocument>("UserChallenge", userChallengeSchema);
export default UserChallenge;
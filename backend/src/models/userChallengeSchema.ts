import mongoose, { ObjectId, Document } from "mongoose";
import { ChallengeDocument } from "./challengeSchema";

export type UserChallengeDocument = Document & {
    _id: ObjectId;
    user: ObjectId;
    challenge: ObjectId | ChallengeDocument;
    notes: string;
    done: boolean;
    currentChallenge: boolean;
    assignedAt: Date | null;
    createdAt: string;
    updatedAt: string;
    completedAt: Date | null;
    repeatable: boolean;
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
        assignedAt: {
            type: Date,
            default: null
        },
        completedAt: {
            type: Date,
            default: null
        },
        repeatable: {
            type: Boolean,
            default: false
        }
    }, {
            timestamps: true,
            validateBeforeSave: true,
    }
)

const UserChallenge = mongoose.model<UserChallengeDocument>("UserChallenge", userChallengeSchema);
export default UserChallenge;
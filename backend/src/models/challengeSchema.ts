import mongoose, { Document, ObjectId } from "mongoose";

export type ChallengeDocument = Document & {
    _id: ObjectId;
    title: string;
    author: ObjectId;
    notes: string;
    done: boolean;
    currentChallenge: boolean;
    currentChallengeExpiresAt: string;
    isPredefined: boolean;
    createdAt: string;
    updatedAt: string
}

const challengeSchema = new mongoose.Schema<ChallengeDocument>(
    {
        title: {
            type: String,
            required: [true, "Title must be provided"],
            trim: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        notes: {
            type: String
        },
        done: {
            type: Boolean,
            default: false
        },
        currentChallenge: {
            type: Boolean,
            default: false
        },
        currentChallengeExpiresAt: {
            type: String
        },
        isPredefined: {
            type: Boolean,
            default: true
        },
    }, {
            timestamps: true,
            validateBeforeSave: true,
    }
)

const Challenge = mongoose.model<ChallengeDocument>("Challenge", challengeSchema);
export default Challenge;
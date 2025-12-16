import mongoose, { Document, ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import { settingsSchema } from "../models/settingsSchema.js";

export type UserDocument = Document & {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  settings?: {
    numberOfChallengesPerDay?: number;
    language?: string;
    theme?: string;
  };
  challengeResetDate: Date | null;
  refreshToken: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
};

export const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: {
            type: String,
            required: [true, "Username must be provided"],
            trim: true,
            unique: [true, "Username must be unique"],
            minLength: [3, "Username must be at least 3 characters"]
        },
        password: {
            type: String,
            required: [true, "Password must be provided"],
            trim: true,
            minLength: [3, "Password must be at least 5 characters"],
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        settings: {
            type: settingsSchema,
            default: () => ({})
        },
        challengeResetDate: {
            type: Date,
            default: null
        },
        refreshToken: {
            type: String
        }
    }, {
            timestamps: true,
            validateBeforeSave: true,
    }
)

userSchema.virtual("challenges", {
    ref: "UserChallenge",
    localField: "_id",
    foreignField: "user",
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
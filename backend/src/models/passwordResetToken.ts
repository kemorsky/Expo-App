import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true }, 
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now() },
});

passwordResetTokenSchema.index(
  { expiresAt: 1 }, // auto-cleanup of expired tokens in db
  { expireAfterSeconds: 0 }
);

const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetTokenSchema);
export default PasswordResetToken;
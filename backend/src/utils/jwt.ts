import jwt from 'jsonwebtoken';
import gqlError from "../../src/graphql/errors.js";

type User = {
    _id: string
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || '',
    { expiresIn: "1h" }
  );
}

export function generateRefreshToken(user: User): string {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET || '',
    { expiresIn: "7d" }
  );
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw gqlError("Invalid token", "UNAUTHENTICATED", 401);
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_SECRET || '');
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw gqlError("Invalid token", "UNAUTHENTICATED", 401);
  }
}

export default { generateToken, generateRefreshToken, verifyToken, verifyRefreshToken };
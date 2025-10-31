import jwt from 'jsonwebtoken';

const JWT_SECRET = "kavinskyROLLER975"; // use .env in production
const REFRESH_SECRET = "irisout259";

type User = {
    _id: string
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

export function generateRefreshToken(user: User): string {
  return jwt.sign(
    { id: user._id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("Invalid token");
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, REFRESH_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("Invalid token");
  }
}

export default { generateToken, generateRefreshToken, verifyToken, verifyRefreshToken };
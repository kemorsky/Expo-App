import jwt from 'jsonwebtoken';

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
    throw new Error("Invalid token");
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_SECRET || '');
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("Invalid token");
  }
}

export default { generateToken, generateRefreshToken, verifyToken, verifyRefreshToken };
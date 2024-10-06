// lib/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(token) {
  try {
    console.log("JWT_SECRET:", JWT_SECRET);
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("Error in verifyToken:", err.message);
    return null;
  }
}
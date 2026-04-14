import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;


export const generateAccessToken = (adminId: string) => {
  return jwt.sign({ adminId }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { adminId: string };
};
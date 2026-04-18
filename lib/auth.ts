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

export const generatePasswordResetToken = (adminId: string, passwordHash: string) => {
  return jwt.sign(
    { adminId, type: "admin_password_reset" },
    `${JWT_SECRET}${passwordHash}`,
    { expiresIn: "15m" }
  );
};

export const decodePasswordResetToken = (token: string) => {
  return jwt.decode(token) as { adminId?: string; type?: string } | null;
};

export const verifyPasswordResetToken = (token: string, passwordHash: string) => {
  return jwt.verify(token, `${JWT_SECRET}${passwordHash}`) as {
    adminId: string;
    type: string;
  };
};
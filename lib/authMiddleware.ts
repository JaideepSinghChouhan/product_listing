import { verifyToken } from "./auth";

export function requireAuth(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("No token");
  }

  const token = authHeader.split(" ")[1];

  return verifyToken(token);
}
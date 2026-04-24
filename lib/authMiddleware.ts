import { verifyToken } from "./auth";
import { prisma } from "./prisma";

type AdminRoleValue = "ADMIN" | "SUPERADMIN";

export function requireAuth(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("No token");
  }

  const token = authHeader.split(" ")[1];

  return verifyToken(token);
}

export async function requireRole(
  req: Request,
  requiredRole: AdminRoleValue | AdminRoleValue[]
) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("No token");
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  const admin = await prisma.admin.findUnique({
    where: { id: decoded.adminId },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  const allowedRoles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];
  
  if (!allowedRoles.includes(admin.role)) {
    throw new Error(
      `Access denied. Required role: ${allowedRoles.join(" or ")}`
    );
  }

  return { adminId: decoded.adminId, role: admin.role };
}
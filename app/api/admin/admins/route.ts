import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { requireRole } from "@/lib/authMiddleware";

function parseAdminRole(role: unknown): "ADMIN" | "SUPERADMIN" | null {
  if (role === "admin") return "ADMIN";
  if (role === "superadmin") return "SUPERADMIN";
  return null;
}

// GET - List all admins (superadmin only)
export async function GET(req: Request) {
  try {
    await requireRole(req, "SUPERADMIN");

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        lastLogin: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const normalizedAdmins = admins.map((admin) => ({
      ...admin,
      role: admin.role.toLowerCase(),
    }));

    return NextResponse.json({ admins: normalizedAdmins });
  } catch (err: any) {
    console.error("Get admins error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: err.message.includes("Access denied") ? 403 : 500 }
    );
  }
}

// POST - Create new admin (superadmin only)
export async function POST(req: Request) {
  try {
    await requireRole(req, "SUPERADMIN");
    const { email, password, role = "admin" } = await req.json();
    const parsedRole = parseAdminRole(role);

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!parsedRole) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'admin' or 'superadmin'" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        role: parsedRole,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: `${String(role).charAt(0).toUpperCase() + String(role).slice(1)} created successfully`,
      admin: {
        ...newAdmin,
        role: newAdmin.role.toLowerCase(),
      },
    });
  } catch (err: any) {
    console.error("Create admin error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: err.message.includes("Access denied") ? 403 : 500 }
    );
  }
}

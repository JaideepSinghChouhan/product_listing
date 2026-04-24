import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/authMiddleware";

function parseAdminRole(role: unknown): "ADMIN" | "SUPERADMIN" | null {
  if (role === "admin") return "ADMIN";
  if (role === "superadmin") return "SUPERADMIN";
  return null;
}

// DELETE - Remove an admin (superadmin only)
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: adminId } = await context.params;
    const auth = await requireRole(req, "SUPERADMIN");

    // Prevent deleting yourself
    if (auth.adminId === adminId) {
      return NextResponse.json(
        { error: "You cannot delete your own admin account" },
        { status: 400 }
      );
    }

    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    // Delete admin
    await prisma.admin.delete({
      where: { id: adminId },
    });

    return NextResponse.json({
      message: `Admin ${admin.email} deleted successfully`,
      deletedAdminId: adminId,
    });
  } catch (err: any) {
    console.error("Delete admin error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: err.message.includes("Access denied") ? 403 : 500 }
    );
  }
}

// PUT - Update admin role (superadmin only)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: adminId } = await context.params;
    const auth = await requireRole(req, "SUPERADMIN");
    const { role } = await req.json();
    const parsedRole = parseAdminRole(role);

    if (!role) {
      return NextResponse.json(
        { error: "Role is required" },
        { status: 400 }
      );
    }

    if (!parsedRole) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'admin' or 'superadmin'" },
        { status: 400 }
      );
    }

    // Prevent downgrading yourself if you're superadmin
    if (auth.adminId === adminId && parsedRole === "ADMIN") {
      return NextResponse.json(
        { error: "You cannot downgrade your own role" },
        { status: 400 }
      );
    }

    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    // Update admin
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: { role: parsedRole },
      select: {
        id: true,
        email: true,
        role: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: `Admin role updated successfully`,
      admin: {
        ...updatedAdmin,
        role: updatedAdmin.role.toLowerCase(),
      },
    });
  } catch (err: any) {
    console.error("Update admin error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: err.message.includes("Access denied") ? 403 : 500 }
    );
  }
}

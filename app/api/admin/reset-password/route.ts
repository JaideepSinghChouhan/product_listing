import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  decodePasswordResetToken,
  verifyPasswordResetToken,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body?.token || "").trim();
    const password = String(body?.password || "");

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const decoded = decodePasswordResetToken(token);
    if (!decoded?.adminId || decoded.type !== "admin_password_reset") {
      return NextResponse.json({ error: "Invalid reset token" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
    });

    if (!admin) {
      return NextResponse.json({ error: "Invalid reset token" }, { status: 400 });
    }

    try {
      const verified = verifyPasswordResetToken(token, admin.password);
      if (verified.type !== "admin_password_reset" || verified.adminId !== admin.id) {
        return NextResponse.json({ error: "Invalid reset token" }, { status: 400 });
      }
    } catch {
      return NextResponse.json(
        { error: "Reset link is invalid or expired" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password has been reset successfully" });
  } catch (err: any) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: "Unable to reset password", details: err?.message },
      { status: 500 }
    );
  }
}

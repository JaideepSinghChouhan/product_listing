import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetToken } from "@/lib/auth";
import { sendAdminPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const redirectBaseUrl = String(body?.redirectBaseUrl || "").trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (admin) {
      const token = generatePasswordResetToken(admin.id, admin.password);
      const origin = redirectBaseUrl || new URL(req.url).origin;
      const resetUrl = `${origin}/admin/reset-password?token=${encodeURIComponent(token)}`;

      await sendAdminPasswordResetEmail(admin.email, resetUrl);
    }

    return NextResponse.json({
      message: "If an account with this email exists, a reset link has been sent.",
    });
  } catch (err: any) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Unable to process request", details: err?.message },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req: Request, { params }: any) {
  try {
    requireAuth(req);

    const { id } = await params;

    const hero = await prisma.hero.findUnique({
      where: { id },
    });

    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }

    // Delete image from Cloudinary (don't throw if it fails)
    if (hero.publicId) {
      try {
        await cloudinary.uploader.destroy(hero.publicId);
      } catch (err: any) {
        // Silently fail - continue with DB deletion
      }
    }

    await prisma.hero.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Hero deleted successfully" });
  } catch (err: any) {
    const status = err?.message?.includes("No token") ? 401 : 500;
    return NextResponse.json(
      { error: "Failed to delete hero", details: err.message },
      { status }
    );
  }
}
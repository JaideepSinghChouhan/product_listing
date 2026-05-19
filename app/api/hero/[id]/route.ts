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
        console.log("Deleted hero image from Cloudinary:", hero.publicId);
      } catch (err: any) {
        console.warn("Failed to delete hero image from Cloudinary:", err?.message);
        // Continue anyway - record will be deleted from DB
      }
    }

    await prisma.hero.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Hero deleted successfully" });
  } catch (err: any) {
    console.error("DELETE HERO ERROR:", err);
    const status = err?.message === "No token" ? 401 : 500;
    return NextResponse.json(
      { error: status === 401 ? "Unauthorized" : "Delete failed", details: err.message },
      { status }
    );
  }
}
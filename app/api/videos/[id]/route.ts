import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req: Request, context: any) {
  try {
    requireAuth(req);

    const { id } = await context.params;

    const video = await prisma.video.findUnique({
      where: { id },
    }) as any;

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Delete video from Cloudinary if it exists
    if (video.publicId) {
      try {
        await cloudinary.uploader.destroy(video.publicId, {
          resource_type: "video",
        });
        console.log("Deleted video from Cloudinary:", video.publicId);
      } catch (err: any) {
        console.warn("Failed to delete video from Cloudinary:", err?.message);
      }
    }

    // Delete thumbnail from Cloudinary if it exists
    if (video.thumbnailPublicId) {
      try {
        await cloudinary.uploader.destroy(video.thumbnailPublicId);
        console.log("Deleted thumbnail from Cloudinary:", video.thumbnailPublicId);
      } catch (err: any) {
        console.warn("Failed to delete thumbnail from Cloudinary:", err?.message);
      }
    }

    // Delete video record from database
    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (err: any) {
    console.error("Video delete error:", err);
    const status = err?.message === "No token" ? 401 : 500;
    return NextResponse.json(
      {
        error: status === 401 ? "Unauthorized" : "Failed to delete video",
        details: err.message,
      },
      { status }
    );
  }
}
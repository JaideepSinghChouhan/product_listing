import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware"; 
import { v2 as cloudinary } from "cloudinary";

export async function DELETE(req: Request, context: any) {
  try {
    requireAuth(req);

    const { id } = await context.params;

    const video = await prisma.video.findUnique({
      where: { id },
    }) as any;

    if (!video) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (video.publicId) {
      await cloudinary.uploader.destroy(video.publicId, {
        resource_type: "video",
      });
    }

    if (video.thumbnailPublicId) {
      await cloudinary.uploader.destroy(video.thumbnailPublicId);
    }

    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch(err:any) {
    console.error("Video delete error:", err);
    const status = err?.message === "No token" ? 401 : 500;
    return NextResponse.json(
      { error: status === 401 ? "Unauthorized" : "Failed", details: err.message },
      { status }
    );
  }
}
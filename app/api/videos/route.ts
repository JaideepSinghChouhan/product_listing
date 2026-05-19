import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { uploadImage } from "@/lib/upload";

export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(videos);
}

export async function POST(req: Request) {
  try {
    requireAuth(req);

    // Frontend uploads video directly to Cloudinary and sends back the data
    const { title, videoPublicId, videoUrl, thumbnailFile } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!videoPublicId || !videoUrl) {
      return NextResponse.json(
        { error: "Video must be uploaded to Cloudinary first" },
        { status: 400 }
      );
    }

    let thumbnailData = null;
    if (thumbnailFile) {
      thumbnailData = await uploadImage(thumbnailFile, "videos");
    }

    const savedVideo = await prisma.video.create({
      data: {
        title,
        url: videoUrl,
        publicId: videoPublicId,
        thumbnailUrl: thumbnailData?.url || null,
        thumbnailPublicId: thumbnailData?.publicId || null,
      },
    });

    return NextResponse.json(savedVideo);
  } catch (err: any) {
    console.error("Video create error:", err);
    const status = err?.message === "No token" ? 401 : 500;
    return NextResponse.json(
      {
        error: status === 401 ? "Unauthorized" : "Failed to create video",
        details: err.message,
      },
      { status }
    );
  }
}


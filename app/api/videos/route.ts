import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { uploadImage, uploadVideo } from "@/lib/upload";

export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(videos);
}


export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { title, url, video, thumbnail } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    let videoData = null;
    if (video) {
      videoData = await uploadVideo(video);
    }

    let thumbnailData = null;
    if (thumbnail) {
      thumbnailData = await uploadImage(thumbnail);
    }

    const finalUrl = videoData?.url || url?.trim();

    if (!finalUrl) {
      return NextResponse.json(
        { error: "Video file or URL is required" },
        { status: 400 }
      );
    }

    const savedVideo = await prisma.video.create({
      data: {
        title,
        url: finalUrl,
        publicId: videoData?.publicId || null,
        thumbnailUrl: thumbnailData?.url || null,
        thumbnailPublicId: thumbnailData?.publicId || null,
      },
    });

    return NextResponse.json(savedVideo);
  } catch(err:any) {
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


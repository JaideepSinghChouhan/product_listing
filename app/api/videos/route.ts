import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { uploadImage, uploadVideo } from "@/lib/upload";

export async function GET() {
  try {
    // Limit to recent 20 videos to avoid 413 payload error
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(videos);
  } catch (err: any) {
    console.error("GET videos error:", err);
    return NextResponse.json(
      { error: "Failed to fetch videos", details: err.message },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { title, url, video, thumbnail } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!process.env.CLOUDINARY_UPLOAD_PRESET) {
      return NextResponse.json(
        { error: "Upload preset not configured" },
        { status: 500 }
      );
    }

    let videoData = null;
    if (video) {
      videoData = await uploadVideo(video);
    }

    let thumbnailData = null;
    if (thumbnail) {
      thumbnailData = await uploadImage(thumbnail, "videos");
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
    console.error("Video create error:", {
      message: err?.message,
      status: err?.status,
      stack: err?.stack?.substring(0, 200),
    });
    
    if (err?.message?.includes("Cloudinary")) {
      return NextResponse.json(
        {
          error: "Upload failed - Cloudinary error",
          details: err.message,
        },
        { status: 500 }
      );
    }
    
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


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET() {
  const videos = await prisma.video.findMany();
  return NextResponse.json(videos);
}


export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { title, url } = await req.json();

    const video = await prisma.video.create({
      data: { title, url },
    });

    return NextResponse.json(video);
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { uploadImage } from "@/lib/upload";

export async function GET() {
  const heroes = await prisma.hero.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(heroes);
}

// 🔥 ONE IMAGE = ONE SLIDE
export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { heading, subtext, image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image required" }, { status: 400 });
    }

    const uploaded = await uploadImage(image);

    const hero = await prisma.hero.create({
      data: {
        heading,
        subtext,
        imageUrl: uploaded.url,
        publicId: uploaded.publicId,
      },
    });

    return NextResponse.json(hero);

  } catch (err: any) {
    console.error("HERO CREATE ERROR:", err);

    return NextResponse.json(
      { error: "Failed to create hero slide", details: err.message },
      { status: 500 }
    );
  }
}
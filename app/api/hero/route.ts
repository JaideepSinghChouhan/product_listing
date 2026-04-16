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

export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { heading, subtext, images } = await req.json();

    const uploadedImages = await Promise.all(
      images.map((img: string) => uploadImage(img))
    );

    const hero = await prisma.hero.create({
      data: {
        heading,
        subtext,
        images: uploadedImages,
      },
    });

    return NextResponse.json(hero);

  } catch (err) {
    console.error("HERO CREATE ERROR:", err);

    return NextResponse.json(
      { error: "Failed to create hero slide" },
      { status: 500 }
    );
  }
}
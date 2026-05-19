import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

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

    const { heading, subtext, imageUrl, publicId } = await req.json();

    if (!imageUrl || !publicId) {
      return NextResponse.json(
        { error: "imageUrl and publicId are required" },
        { status: 400 }
      );
    }

    const hero = await prisma.hero.create({
      data: {
        heading,
        subtext,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(hero);

  } catch (err: any) {
    console.error("Hero create error:", err);

    return NextResponse.json(
      { error: "Failed to create hero slide", details: err.message },
      { status: 500 }
    );
  }
}
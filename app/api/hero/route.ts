import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET() {
  const hero = await prisma.hero.findFirst();
  return NextResponse.json(hero);
}


export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { heading, subtext, imageUrl, publicId } =
      await req.json();

    const existing = await prisma.hero.findFirst();

    let hero;

    if (existing) {
      hero = await prisma.hero.update({
        where: { id: existing.id },
        data: { heading, subtext, imageUrl, publicId },
      });
    } else {
      hero = await prisma.hero.create({
        data: { heading, subtext, imageUrl, publicId },
      });
    }

    return NextResponse.json(hero);
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
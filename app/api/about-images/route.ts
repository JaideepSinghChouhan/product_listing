import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/authMiddleware";
import { deleteImage, uploadImage } from "@/lib/upload";

const HOME_ABOUT_KEY = "home-about-image";
const ABOUT_PAGE_HERO_KEY = "about-page-hero-image";

const ALLOWED_KEYS = new Set([HOME_ABOUT_KEY, ABOUT_PAGE_HERO_KEY]);

export async function GET() {
  try {
    const rows = await prisma.aboutImage.findMany({
      where: { key: { in: [HOME_ABOUT_KEY, ABOUT_PAGE_HERO_KEY] } },
    });

    const byKey = rows.reduce<Record<string, string>>((acc, row) => {
      acc[row.key] = row.imageUrl;
      return acc;
    }, {});

    return NextResponse.json({
      homeAboutImageUrl: byKey[HOME_ABOUT_KEY] || null,
      aboutPageHeroImageUrl: byKey[ABOUT_PAGE_HERO_KEY] || null,
    });
  } catch (err: any) {
    console.error("About images fetch error:", err);
    return NextResponse.json(
      { homeAboutImageUrl: null, aboutPageHeroImageUrl: null },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { key, image } = await req.json();

    if (!key || !ALLOWED_KEYS.has(key)) {
      return NextResponse.json({ error: "Invalid image key" }, { status: 400 });
    }

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const existing = await prisma.aboutImage.findUnique({
      where: { key },
    });

    const uploaded = await uploadImage(image, "about");

    if (existing?.publicId) {
      try {
        await deleteImage(existing.publicId);
      } catch (deleteErr) {
        console.error("Failed deleting old about image:", deleteErr);
      }
    }

    const saved = await prisma.aboutImage.upsert({
      where: { key },
      update: {
        imageUrl: uploaded.url,
        publicId: uploaded.publicId,
      },
      create: {
        key,
        imageUrl: uploaded.url,
        publicId: uploaded.publicId,
      },
    });

    return NextResponse.json(saved);
  } catch (err: any) {
    console.error("About image save error:", err);
    return NextResponse.json(
      { error: "Failed to save about image", details: err?.message },
      { status: 500 }
    );
  }
}

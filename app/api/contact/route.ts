import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

const CONTACT_CACHE_TTL_MS = 60 * 1000;

let contactCache: {
  data: any;
  expiresAt: number;
} | null = null;

export async function GET() {
  const now = Date.now();

  if (contactCache && contactCache.expiresAt > now) {
    return NextResponse.json(contactCache.data, {
      headers: {
        "Cache-Control": "public, max-age=30, stale-while-revalidate=120",
      },
    });
  }

  try {
    const contact = await prisma.contactInfo.findFirst();

    contactCache = {
      data: contact,
      expiresAt: now + CONTACT_CACHE_TTL_MS,
    };

    return NextResponse.json(contact, {
      headers: {
        "Cache-Control": "public, max-age=30, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    console.error("Contact fetch error:", err);

    if (contactCache?.data) {
      return NextResponse.json(contactCache.data, {
        headers: {
          "Cache-Control": "public, max-age=10, stale-while-revalidate=60",
        },
      });
    }

    return NextResponse.json(
      { error: "Contact unavailable" },
      { status: 503 }
    );
  }
}


export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { address, phone, email, mapUrl } = await req.json();

    const existing = await prisma.contactInfo.findFirst();

    let contact;

    if (existing) {
      contact = await prisma.contactInfo.update({
        where: { id: existing.id },
        data: { address, phone, email, mapUrl },
      });
    } else {
      contact = await prisma.contactInfo.create({
        data: { address, phone, email, mapUrl },
      });
    }

    contactCache = {
      data: contact,
      expiresAt: Date.now() + CONTACT_CACHE_TTL_MS,
    };

    return NextResponse.json(contact);
  } catch (err:any) {
    console.error("Contact update/create error:", err);
    return NextResponse.json(
      { error: "Failed", details: err.message },
      { status: 500 }
    );
  }
}
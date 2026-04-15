import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";


export async function GET() {
  const data = await prisma.testimonial.findMany();
  return NextResponse.json(data);
}


export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { name, role, company, message } =
      await req.json();

    const testimonial = await prisma.testimonial.create({
      data: { name, role, company, message },
    });

    return NextResponse.json(testimonial);
  } catch(err:any) {
    console.error("Testimonial create error:", err);
    return NextResponse.json(
      { error: "Unauthorized", details: err.message },
      { status: 401 }
    );
  }
}

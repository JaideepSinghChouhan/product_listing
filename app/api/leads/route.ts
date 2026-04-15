import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const {
  name,
  contact,
  email,
  companyName,
  message,
  requirement,
  quantity,
  productId,
  utmSource,
  utmMedium,
  utmCampaign,
} = await req.json();

    
    if (!name || !contact) {
      return NextResponse.json(
        { error: "Name and contact required" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
    data: {
    name,
    contact,
    email: email || null,
    companyName: companyName || null,
    message: message || null,
    requirement: requirement || null,
    quantity: quantity ? Number(quantity) : null,
    productId: productId || null,
    utmSource: utmSource || null,
    utmMedium: utmMedium || null,
    utmCampaign: utmCampaign || null,
  },
});
   
    sendLeadEmail(lead);

    return NextResponse.json(lead);
  } catch (err) {
    console.error("Error creating lead:", err);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
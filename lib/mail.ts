import nodemailer from "nodemailer";

function getMailerConfig() {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.replace(/\s+/g, "");
  const to = process.env.CLIENT_EMAIL?.trim();

  if (!user || !pass || !to) {
    throw new Error("Missing EMAIL_USER, EMAIL_PASS, or CLIENT_EMAIL in environment");
  }

  return { user, pass, to };
}

export const sendLeadEmail = async (lead: any) => {
  const { user, pass, to } = getMailerConfig();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: `"Lead Alert" <${user}>`,
    to, // client email
    subject: "🚀 New Lead Received",
    html: `
    <h2>🚀 New Lead Received</h2>

    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Contact:</strong> ${lead.contact}</p>
    <p><strong>Email:</strong> ${lead.email || "N/A"}</p>
    <p><strong>Company:</strong> ${lead.companyName || "N/A"}</p>

    <p><strong>Requirement:</strong> ${lead.requirement || "N/A"}</p>
    <p><strong>Message:</strong> ${lead.message || "N/A"}</p>
    <p><strong>Quantity:</strong> ${lead.quantity || "N/A"}</p>

    <hr />

    <p><strong>UTM Source:</strong> ${lead.utmSource || "-"}</p>
    <p><strong>UTM Campaign:</strong> ${lead.utmCampaign || "-"}</p>
    `,
  });
};
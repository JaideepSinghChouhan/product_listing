import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendLeadEmail = async (lead: any) => {
  await transporter.sendMail({
    from: `"Lead Alert" <${process.env.EMAIL_USER}>`,
    to: process.env.CLIENT_EMAIL, // client email
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
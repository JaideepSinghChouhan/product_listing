import {prisma}  from "../lib/prisma";
import bcrypt from "bcrypt";


async function main() {
  console.log("🌱 Seeding database...");

  // Check if superadmin already exists
  const existingSuperAdmin = await prisma.admin.findFirst({
    where: { role: "SUPERADMIN" },
  });

  if (existingSuperAdmin) {
    console.log("✅ Superadmin already exists:", existingSuperAdmin.email);
    return;
  }

  // Create initial superadmin (change email and password as needed)
  const superAdminEmail = process.env.SUPERADMIN_EMAIL || "superadmin@example.com";
  const superAdminPassword = process.env.SUPERADMIN_PASSWORD || "SuperAdmin@123";

  // Check if email already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: superAdminEmail },
  });

  if (existingAdmin) {
    // Update existing admin to superadmin
    const updated = await prisma.admin.update({
      where: { email: superAdminEmail },
      data: { role: "SUPERADMIN" },
    });
    console.log("✅ Updated existing admin to superadmin:", updated.email);
  } else {
    // Create new superadmin
    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
    const superAdmin = await prisma.admin.create({
      data: {
        email: superAdminEmail,
        password: hashedPassword,
        role: "SUPERADMIN",
      },
    });
    console.log("✅ Created superadmin:", superAdmin.email);
    console.log("⚠️  Default superadmin password: " + superAdminPassword);
    console.log("⚠️  CHANGE THE PASSWORD AFTER FIRST LOGIN!");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Seeding completed");
  })
  .catch(async (error) => {
    console.error("❌ Seeding failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });

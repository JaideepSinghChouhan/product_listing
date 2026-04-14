import prisma  from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Add your seeding logic here
  // Example:
  // const user = await prisma.user.create({
  //   data: {
  //     email: "test@example.com",
  //     name: "Test User",
  //   },
  // });
  // console.log("Created user:", user);
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

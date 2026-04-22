// import "dotenv/config";
import {prisma} from "../lib/prisma.ts";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
    },
  });

  console.log("Admin created");
}

main();
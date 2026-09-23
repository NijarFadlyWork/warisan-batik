import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@nijar.com" },
    update: {},
    create: {
      name: "Admin Nijar",
      email: "admin@nijar.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  const gudangHash = await bcrypt.hash("gudang123", 10);

  const gudang = await prisma.user.upsert({
    where: { email: "gudang@nijar.com" },
    update: {},
    create: {
      name: "Staf Gudang",
      email: "gudang@nijar.com",
      passwordHash: gudangHash,
      role: "GUDANG",
    },
  });

  console.log("Akun dibuat:", { admin: admin.email, gudang: gudang.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error("❌ DATABASE_URL is not set");
    process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🔌 Testing database connection...");
    console.log(`URL: ${process.env.DATABASE_URL?.replace(/:[^:@]*@/, ":****@")}`);

    try {
        await prisma.$connect();
        console.log("✅ Successfully connected to the database!");

        // Perform a simple query (count users)
        const userCount = await prisma.user.count();
        console.log(`📊 Current User count: ${userCount}`);

    } catch (error) {
        console.error("❌ Stats: Connection failed.");
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

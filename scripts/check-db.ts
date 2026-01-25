import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

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

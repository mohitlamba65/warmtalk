const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const path = require("path");

// Try specifying path if default doesn't work, though standard config() usually finds .env in root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const prisma = new PrismaClient();

async function main() {
    console.log("🔌 Testing database connection...");
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
        console.error("❌ Error: DATABASE_URL is not defined in environment variables.");
        return;
    }

    console.log(`URL: ${dbUrl.replace(/:[^:@]*@/, ":****@")}`);

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

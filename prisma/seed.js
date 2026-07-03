import prisma from "../lib/prisma.js";


async function main() {
    await prisma.genre.createMany({
        data: [
            { name: "Action" },
            { name: "Comedy" },
            { name: "Drama" },
            { name: "Horror" },
            { name: "Sci-Fi" },
            { name: "Romance" },
            { name: "Thriller" },
            { name: "Mystery" },
            { name: "Adventure" },
            { name: "Fantasy" },
            { name: "Crime" },
            { name: "Animation" },
            { name: "Documentary" },
            { name: "Biography" },
            { name: "History" },
            { name: "War" },
            { name: "Family" },
            { name: "Musical" }
        ],
        skipDuplicates: true
    })
    console.log("🌱 Genres seeded successfully");

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
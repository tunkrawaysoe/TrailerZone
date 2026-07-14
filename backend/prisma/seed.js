import prisma from "../lib/prisma.js";

async function seedGenres() {
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
    });

    console.log("✅ Genres seeded");
}

const movies = [
    {
        title: "The Dark Knight",
        description: "Batman faces the Joker in Gotham City.",
        releaseDate: new Date("2008-07-18"),
        duration: 152,
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
        language: "English",
        genres: ["Action", "Drama", "Crime"]
    },
    {
        title: "Inception",
        description: "A thief enters dreams to steal secrets.",
        releaseDate: new Date("2010-07-16"),
        duration: 148,
        posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        language: "English",
        genres: ["Action", "Sci-Fi", "Thriller"]
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space to save humanity.",
        releaseDate: new Date("2014-11-07"),
        duration: 169,
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        language: "English",
        genres: ["Adventure", "Drama", "Sci-Fi"]
    },
    {
        title: "John Wick",
        description: "A retired hitman seeks vengeance after losing everything.",
        releaseDate: new Date("2014-10-24"),
        duration: 101,
        posterUrl: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg",
        language: "English",
        genres: ["Action", "Crime", "Thriller"]
    },
    {
        title: "Oppenheimer",
        description: "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
        releaseDate: new Date("2023-07-21"),
        duration: 180,
        posterUrl: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
        language: "English",
        genres: ["Biography", "Drama", "History"]
    }
];

async function seedMovies() {
    const genres = await prisma.genre.findMany();

    const genreMap = Object.fromEntries(
        genres.map((genre) => [genre.name, genre.id])
    );

    for (const movie of movies) {
        const createdMovie = await prisma.movie.create({
            data: {
                title: movie.title,
                description: movie.description,
                releaseDate: movie.releaseDate,
                duration: movie.duration,
                posterUrl: movie.posterUrl,
                backdropUrl: movie.backdropUrl,
                language: movie.language
            }
        });

        await prisma.movieGenre.createMany({
            data: movie.genres.map((genreName) => ({
                movieId: createdMovie.id,
                genreId: genreMap[genreName]
            }))
        });
    }

    console.log("✅ Movies seeded");
}

async function seedActors() {
    await prisma.actor.createMany({
        data: [
            {
                name: "Christian Bale",
                profileImage: "https://image.tmdb.org/t/p/w500/qCpZn2e3dimwbryLnqxZuI88PTi.jpg",
                biography: "English actor known for The Dark Knight trilogy and American Psycho.",
                birthDate: new Date("1974-01-30")
            },
            {
                name: "Heath Ledger",
                profileImage: "https://image.tmdb.org/t/p/w500/5Y9HnYYa9jF4NunY9lSgJGjM7aV.jpg",
                biography: "Australian actor best known for playing the Joker in The Dark Knight.",
                birthDate: new Date("1979-04-04")
            },
            {
                name: "Leonardo DiCaprio",
                profileImage: "https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
                biography: "Academy Award-winning actor known for Titanic, Inception, and The Revenant.",
                birthDate: new Date("1974-11-11")
            },
            {
                name: "Matthew McConaughey",
                profileImage: "https://image.tmdb.org/t/p/w500/e6Bq6Xih5iCTl5l7Rj8b5VQfP4F.jpg",
                biography: "American actor known for Interstellar and Dallas Buyers Club.",
                birthDate: new Date("1969-11-04")
            },
            {
                name: "Keanu Reeves",
                profileImage: "https://image.tmdb.org/t/p/w500/rRdru6REr9i3WIHv2mntpcgxnoY.jpg",
                biography: "Canadian actor famous for The Matrix and John Wick franchises.",
                birthDate: new Date("1964-09-02")
            },
            {
                name: "Cillian Murphy",
                profileImage: "https://image.tmdb.org/t/p/w500/2lKs67rG8L9E0QBN6fSk8Ajk6Gm.jpg",
                biography: "Irish actor known for Oppenheimer and Peaky Blinders.",
                birthDate: new Date("1976-05-25")
            }
        ],
        skipDuplicates: true
    });

    console.log("✅ Actors seeded");
}

async function seedDirectors() {
    await prisma.director.createMany({
        data: [
            {
                name: "Christopher Nolan",
                biography: "British-American filmmaker known for Inception, Interstellar, The Dark Knight, and Oppenheimer.",
                birthDate: new Date("1970-07-30")
            },
            {
                name: "Chad Stahelski",
                biography: "American director and stuntman best known for directing the John Wick series.",
                birthDate: new Date("1968-09-20")
            }
        ],
        skipDuplicates: true
    });

    console.log("✅ Directors seeded");
}

async function main() {
    await seedGenres();
    await seedMovies();
    await seedActors();
    await seedDirectors();

    console.log("🌱 ALL SEEDING COMPLETED");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
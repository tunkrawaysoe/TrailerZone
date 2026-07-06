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

    console.log(" Genres seeded");
}

const movies = [
    {
        title: "The Dark Knight",
        description: "Batman faces the Joker in Gotham City.",
        releaseDate: new Date("2008-07-18"),
        duration: 152,
        posterUrl: "https://example.com/dark.jpg",
        backdropUrl: "https://example.com/dark-bg.jpg",
        language: "English",
        genres: ["Action", "Drama", "Crime"]
    },
    {
        title: "Inception",
        description: "A thief enters dreams to steal secrets.",
        releaseDate: new Date("2010-07-16"),
        duration: 148,
        posterUrl: "https://example.com/inception.jpg",
        backdropUrl: "https://example.com/inception-bg.jpg",
        language: "English",
        genres: ["Action", "Sci-Fi", "Thriller"]
    },
    {
        title: "Interstellar",
        description: "Space mission to save humanity.",
        releaseDate: new Date("2014-11-07"),
        duration: 169,
        posterUrl: "https://example.com/interstellar.jpg",
        backdropUrl: "https://example.com/interstellar-bg.jpg",
        language: "English",
        genres: ["Adventure", "Drama", "Sci-Fi"]
    },
    {
        title: "John Wick",
        description: "Retired assassin seeks revenge.",
        releaseDate: new Date("2014-10-24"),
        duration: 101,
        posterUrl: "https://example.com/johnwick.jpg",
        backdropUrl: "https://example.com/johnwick-bg.jpg",
        language: "English",
        genres: ["Action", "Crime", "Thriller"]
    },
    {
        title: "Oppenheimer",
        description: "The story of the atomic bomb creator.",
        releaseDate: new Date("2023-07-21"),
        duration: 180,
        posterUrl: "https://example.com/opp.jpg",
        backdropUrl: "https://example.com/opp-bg.jpg",
        language: "English",
        genres: ["Biography", "Drama", "History"]
    }
];

async function seedMovies() {
    const genres = await prisma.genre.findMany();
    const genreMap = Object.fromEntries(
        genres.map(g => [g.name, g.id])
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
            data: movie.genres.map(name => ({
                movieId: createdMovie.id,
                genreId: genreMap[name]
            }))
        });
    }

    console.log(" Movies seeded");
}

async function seedActors() {
    await prisma.actor.createMany({
        data: [
            {
                name: "Tom Hardy",
                profileImage: "https://example.com/tom.jpg",
                biography: "British actor known for Venom and Mad Max",
                birthDate: new Date("1977-09-15")
            },
            {
                name: "Leonardo DiCaprio",
                profileImage: "https://example.com/leo.jpg",
                biography: "Hollywood actor known for Inception and Titanic",
                birthDate: new Date("1974-11-11")
            }
        ],
        skipDuplicates: true
    });

    console.log(" Actors seeded");
}

async function seedDirectors() {
    await prisma.director.createMany({
        data: [
            {
                name: "Christopher Nolan",
                biography: "Famous director of Inception & Interstellar",
                birthDate: new Date("1970-07-30")
            },
            {
                name: "Quentin Tarantino",
                biography: "Director of crime films like Pulp Fiction",
                birthDate: new Date("1963-03-27")
            }
        ],
        skipDuplicates: true
    });

    console.log(" Directors seeded");
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
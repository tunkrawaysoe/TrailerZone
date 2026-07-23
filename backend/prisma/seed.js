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

    console.log("Genres seeded");
}



const actors = [
    {
        name: "Christian Bale",
        biography: "Known for The Dark Knight trilogy.",
        birthDate: new Date("1974-01-30")
    },
    {
        name: "Heath Ledger",
        biography: "Australian actor famous for Joker.",
        birthDate: new Date("1979-04-04")
    },
    {
        name: "Michael Caine",
        biography: "English actor known for Batman movies.",
        birthDate: new Date("1933-03-14")
    },
    {
        name: "Leonardo DiCaprio",
        biography: "Oscar winning actor.",
        birthDate: new Date("1974-11-11")
    },
    {
        name: "Joseph Gordon-Levitt",
        biography: "Actor from Inception.",
        birthDate: new Date("1981-02-17")
    },
    {
        name: "Tom Hardy",
        biography: "English actor known for Venom and Inception.",
        birthDate: new Date("1977-09-15")
    },
    {
        name: "Matthew McConaughey",
        biography: "Actor from Interstellar.",
        birthDate: new Date("1969-11-04")
    },
    {
        name: "Anne Hathaway",
        biography: "Actress known for Interstellar.",
        birthDate: new Date("1982-11-12")
    },
    {
        name: "Jessica Chastain",
        biography: "Academy award actress.",
        birthDate: new Date("1977-03-24")
    },
    {
        name: "Cillian Murphy",
        biography: "Actor from Oppenheimer.",
        birthDate: new Date("1976-05-25")
    },
    {
        name: "Robert Downey Jr.",
        biography: "Iron Man actor.",
        birthDate: new Date("1965-04-04")
    },
    {
        name: "Emily Blunt",
        biography: "British actress.",
        birthDate: new Date("1983-02-23")
    },
    {
        name: "Keanu Reeves",
        biography: "John Wick actor.",
        birthDate: new Date("1964-09-02")
    },
    {
        name: "Ian McShane",
        biography: "Actor from John Wick.",
        birthDate: new Date("1942-09-29")
    },
    {
        name: "Kate Winslet",
        biography: "Titanic actress.",
        birthDate: new Date("1975-10-05")
    },
    {
        name: "Sam Worthington",
        biography: "Avatar actor.",
        birthDate: new Date("1976-08-02")
    },
    {
        name: "Zoe Saldana",
        biography: "Avatar actress.",
        birthDate: new Date("1978-06-19")
    },
    {
        name: "Russell Crowe",
        biography: "Gladiator actor.",
        birthDate: new Date("1964-04-07")
    },
    {
        name: "Joaquin Phoenix",
        biography: "Oscar winning actor.",
        birthDate: new Date("1974-10-28")
    },
    {
        name: "Tom Hanks",
        biography: "Forrest Gump actor.",
        birthDate: new Date("1956-07-09")
    }
];


async function seedActors() {

    await prisma.actor.createMany({
        data: actors,
        skipDuplicates: true
    });

    console.log("Actors seeded");
}



const directors = [
    {
        name: "Christopher Nolan",
        biography: "Director of Inception, Interstellar and Oppenheimer.",
        birthDate: new Date("1970-07-30")
    },
    {
        name: "Chad Stahelski",
        biography: "Director of John Wick.",
        birthDate: new Date("1968-09-20")
    },
    {
        name: "James Cameron",
        biography: "Director of Titanic and Avatar.",
        birthDate: new Date("1954-08-16")
    },
    {
        name: "Ridley Scott",
        biography: "Director of Gladiator.",
        birthDate: new Date("1937-11-30")
    },
    {
        name: "Francis Ford Coppola",
        biography: "Director of The Godfather.",
        birthDate: new Date("1939-04-07")
    },
    {
        name: "Quentin Tarantino",
        biography: "Director of Pulp Fiction.",
        birthDate: new Date("1963-03-27")
    },
    {
        name: "David Fincher",
        biography: "Director of Fight Club.",
        birthDate: new Date("1962-08-28")
    },
    {
        name: "Steven Spielberg",
        biography: "Director of Saving Private Ryan.",
        birthDate: new Date("1946-12-18")
    },
    {
        name: "Martin Scorsese",
        biography: "Director of The Departed.",
        birthDate: new Date("1942-11-17")
    },
    {
        name: "Damien Chazelle",
        biography: "Director of Whiplash.",
        birthDate: new Date("1985-01-19")
    }
];


async function seedDirectors() {

    await prisma.director.createMany({
        data: directors,
        skipDuplicates: true
    });

    console.log("Directors seeded");
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

        genres: [
            "Action",
            "Crime",
            "Drama"
        ],

        actors: [
            {
                name: "Christian Bale",
                character: "Bruce Wayne / Batman"
            },
            {
                name: "Heath Ledger",
                character: "Joker"
            },
            {
                name: "Michael Caine",
                character: "Alfred Pennyworth"
            }
        ],

        directors: [
            "Christopher Nolan"
        ]
    },


    {
        title: "Inception",
        description: "A thief enters people's dreams to steal secrets.",
        releaseDate: new Date("2010-07-16"),
        duration: 148,
        posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        language: "English",

        genres: [
            "Action",
            "Sci-Fi",
            "Thriller"
        ],

        actors: [
            {
                name: "Leonardo DiCaprio",
                character: "Dom Cobb"
            },
            {
                name: "Joseph Gordon-Levitt",
                character: "Arthur"
            },
            {
                name: "Tom Hardy",
                character: "Eames"
            }
        ],

        directors: [
            "Christopher Nolan"
        ]
    },


    {
        title: "Interstellar",
        description: "Explorers travel through a wormhole to save humanity.",
        releaseDate: new Date("2014-11-07"),
        duration: 169,
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        language: "English",

        genres: [
            "Adventure",
            "Drama",
            "Sci-Fi"
        ],

        actors: [
            {
                name: "Matthew McConaughey",
                character: "Cooper"
            },
            {
                name: "Anne Hathaway",
                character: "Amelia Brand"
            },
            {
                name: "Jessica Chastain",
                character: "Murph"
            }
        ],

        directors: [
            "Christopher Nolan"
        ]
    },


    {
        title: "Oppenheimer",
        description: "The story of J. Robert Oppenheimer and the atomic bomb.",
        releaseDate: new Date("2023-07-21"),
        duration: 180,
        posterUrl: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
        language: "English",

        genres: [
            "Biography",
            "Drama",
            "History"
        ],

        actors: [
            {
                name: "Cillian Murphy",
                character: "J. Robert Oppenheimer"
            },
            {
                name: "Robert Downey Jr.",
                character: "Lewis Strauss"
            },
            {
                name: "Emily Blunt",
                character: "Kitty Oppenheimer"
            }
        ],

        directors: [
            "Christopher Nolan"
        ]
    },


    {
        title: "John Wick",
        description: "A retired assassin seeks revenge after losing everything.",
        releaseDate: new Date("2014-10-24"),
        duration: 101,
        posterUrl: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg",
        language: "English",

        genres: [
            "Action",
            "Crime",
            "Thriller"
        ],

        actors: [
            {
                name: "Keanu Reeves",
                character: "John Wick"
            },
            {
                name: "Ian McShane",
                character: "Winston"
            }
        ],

        directors: [
            "Chad Stahelski"
        ]
    },


    {
        title: "Titanic",
        description: "A romance between Jack and Rose aboard the Titanic.",
        releaseDate: new Date("1997-12-19"),
        duration: 194,
        posterUrl: "",
        backdropUrl: "",
        language: "English",

        genres: [
            "Drama",
            "Romance",
            "History"
        ],

        actors: [
            {
                name: "Leonardo DiCaprio",
                character: "Jack Dawson"
            },
            {
                name: "Kate Winslet",
                character: "Rose"
            }
        ],

        directors: [
            "James Cameron"
        ]
    },


    {
        title: "Avatar",
        description: "A human soldier enters the world of Pandora.",
        releaseDate: new Date("2009-12-18"),
        duration: 162,
        posterUrl: "",
        backdropUrl: "",
        language: "English",

        genres: [
            "Action",
            "Adventure",
            "Sci-Fi"
        ],

        actors: [
            {
                name: "Sam Worthington",
                character: "Jake Sully"
            },
            {
                name: "Zoe Saldana",
                character: "Neytiri"
            }
        ],

        directors: [
            "James Cameron"
        ]
    },


    {
        title: "Gladiator",
        description: "A Roman general seeks revenge.",
        releaseDate: new Date("2000-05-05"),
        duration: 155,
        posterUrl: "",
        backdropUrl: "",
        language: "English",

        genres: [
            "Action",
            "Drama",
            "History"
        ],

        actors: [
            {
                name: "Russell Crowe",
                character: "Maximus"
            },
            {
                name: "Joaquin Phoenix",
                character: "Commodus"
            }
        ],

        directors: [
            "Ridley Scott"
        ]
    },


    {
        title: "The Godfather",
        description: "A crime family struggles for power.",
        releaseDate: new Date("1972-03-24"),
        duration: 175,
        posterUrl: "",
        backdropUrl: "",
        language: "English",

        genres: [
            "Crime",
            "Drama"
        ],

        actors: [
            {
                name: "Robert Downey Jr.",
                character: "Tony Stark"
            }
        ],

        directors: [
            "Francis Ford Coppola"
        ]
    },


    {
        title: "Saving Private Ryan",
        description: "A group of soldiers search for a missing soldier.",
        releaseDate: new Date("1998-07-24"),
        duration: 169,
        posterUrl: "",
        backdropUrl: "",
        language: "English",

        genres: [
            "War",
            "Drama"
        ],

        actors: [
            {
                name: "Tom Hanks",
                character: "Captain Miller"
            }
        ],

        directors: [
            "Steven Spielberg"
        ]
    }
];



async function seedMovies() {

    const allGenres = await prisma.genre.findMany({
        select: {
            id: true,
            name: true
        }
    });


    const allActors = await prisma.actor.findMany({
        select: {
            id: true,
            name: true
        }
    });


    const allDirectors = await prisma.director.findMany({
        select: {
            id: true,
            name: true
        }
    });


    const genreMap = new Map(
        allGenres.map((genre) => [
            genre.name,
            genre.id
        ])
    );


    const actorMap = new Map(
        allActors.map((actor) => [
            actor.name,
            actor.id
        ])
    );


    const directorMap = new Map(
        allDirectors.map((director) => [
            director.name,
            director.id
        ])
    );


    for (const movie of movies) {

        await prisma.movie.create({
            data: {

                title: movie.title,
                description: movie.description,
                releaseDate: movie.releaseDate,
                duration: movie.duration,
                posterUrl: movie.posterUrl,
                backdropUrl: movie.backdropUrl,
                language: movie.language,


                movieGenres: {
                    create: movie.genres.map((genreName) => {

                        const genreId = genreMap.get(genreName);

                        if (!genreId) {
                            throw new Error(`Genre not found: ${genreName}`);
                        }

                        return {
                            genre: {
                                connect: {
                                    id: genreId
                                }
                            }
                        };
                    })
                },


                movieActors: {
                    create: movie.actors.map((actor) => {

                        const actorId = actorMap.get(actor.name);

                        if (!actorId) {
                            throw new Error(`Actor not found: ${actor.name}`);
                        }

                        return {
                            characterName: actor.character,

                            actor: {
                                connect: {
                                    id: actorId
                                }
                            }
                        };
                    })
                },


                movieDirectors: {
                    create: movie.directors.map((directorName) => {

                        const directorId = directorMap.get(directorName);

                        if (!directorId) {
                            throw new Error(`Director not found: ${directorName}`);
                        }

                        return {
                            director: {
                                connect: {
                                    id: directorId
                                }
                            }
                        };
                    })
                }

            }
        });

        console.log(`Created movie: ${movie.title}`);

    }


    console.log("Movies seeded");

}

async function seedRoles() {
    await prisma.role.createMany({
        data: [
            {
                name: "USER",
                code: 2001
            },
            {
                name: "ADMIN",
                code: 2002
            },
            {
                name: "MODERATOR",
                code: 2003
            }
        ],
        skipDuplicates: true
    });
    console.log("seeding roles done")
}
async function main() {
    await seedGenres();
    await seedActors();
    await seedDirectors();
    await seedMovies();
    await seedRoles();
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
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
        name: "Heath Ledger",
        biography: "Australian actor known for his performances in The Dark Knight, Brokeback Mountain, A Knight's Tale, and 10 Things I Hate About You. He won a posthumous Academy Award for his portrayal of the Joker in The Dark Knight.",
        birthDate: new Date("1979-04-04")
    },
    {
        name: "Michael Caine",
        biography: "English actor known for his roles in The Dark Knight trilogy, The Italian Job, Inception, The Cider House Rules, and numerous acclaimed films throughout his career. He is a two-time Academy Award winner.",
        birthDate: new Date("1933-03-14")
    },
    {
        name: "Joseph Gordon-Levitt",
        biography: "American actor known for his roles in Inception, The Dark Knight Rises, Looper, 500 Days of Summer, and 10 Things I Hate About You. He is also a filmmaker and founder of the creative platform HitRecord.",
        birthDate: new Date("1981-02-17")
    },
    {
        name: "Leonardo DiCaprio",
        biography: "American actor and producer known for his roles in Titanic, Inception, The Revenant, and Once Upon a Time in Hollywood.",
        birthDate: new Date("1974-11-11")
    },
    {
        name: "Robert Downey Jr.",
        biography: "American actor best known for portraying Tony Stark in the Marvel Cinematic Universe and for films such as Oppenheimer and Sherlock Holmes.",
        birthDate: new Date("1965-04-04")
    },
    {
        name: "Tom Hanks",
        biography: "American actor and filmmaker known for acclaimed performances in Forrest Gump, Cast Away, Saving Private Ryan, and Toy Story.",
        birthDate: new Date("1956-07-09")
    },
    {
        name: "Tom Hardy",
        biography: "English actor known for his roles in Inception, The Dark Knight Rises, Mad Max: Fury Road, Venom, and The Revenant. He is recognized for his intense performances and versatile character portrayals.",
        birthDate: new Date("1977-09-15")
    },
    {
        name: "Matthew McConaughey",
        biography: "American actor known for his roles in Interstellar, Dallas Buyers Club, True Detective, The Lincoln Lawyer, and The Wolf of Wall Street. He won an Academy Award for Best Actor for his performance in Dallas Buyers Club.",
        birthDate: new Date("1969-11-04")
    },
    {
        name: "Jessica Chastain",
        biography: "American actress and producer known for her roles in Interstellar, The Help, Zero Dark Thirty, The Martian, and It Chapter Two. She won an Academy Award for Best Actress for her performance in The Eyes of Tammy Faye.",
        birthDate: new Date("1977-03-24")
    },
    {
        name: "Emily Blunt",
        biography: "British actress known for her roles in The Devil Wears Prada, A Quiet Place, Edge of Tomorrow, Sicario, and Oppenheimer. She is recognized for her versatility across drama, action, and comedy films.",
        birthDate: new Date("1983-02-23")
    },
    {
        name: "Ian McShane",
        biography: "English actor known for his roles in Deadwood, John Wick, Pirates of the Caribbean: On Stranger Tides, and The Golden Compass. He is recognized for his commanding screen presence and extensive work in film and television.",
        birthDate: new Date("1942-09-29")
    },
    {
        name: "Kate Winslet",
        biography: "English actress known for her roles in Titanic, The Reader, Eternal Sunshine of the Spotless Mind, Revolutionary Road, and Mare of Easttown. She won an Academy Award for Best Actress for her performance in The Reader.",
        birthDate: new Date("1975-10-05")
    },
    {
        name: "Sam Worthington",
        biography: "Australian actor known for Avatar, Terminator Salvation, and Clash of the Titans.",
        birthDate: new Date("1976-08-02")
    },
    {
        name: "Zoe Saldana",
        biography: "American actress known for Avatar, Guardians of the Galaxy, and Star Trek films.",
        birthDate: new Date("1978-06-19")
    },
    {
        name: "Russell Crowe",
        biography: "New Zealand actor known for Gladiator, A Beautiful Mind, and The Insider. He won an Academy Award for Gladiator.",
        birthDate: new Date("1964-04-07")
    },
    {
        name: "Brad Pitt",
        biography: "American actor and film producer known for Fight Club, Se7en, Once Upon a Time in Hollywood, and Moneyball.",
        birthDate: new Date("1963-12-18")
    },
    {
        name: "Christian Bale",
        biography: "English actor known for his transformation-focused performances in films including The Dark Knight trilogy, American Psycho, and The Fighter.",
        birthDate: new Date("1974-01-30")
    },
    {
        name: "Cillian Murphy",
        biography: "Irish actor known for Peaky Blinders, Inception, Dunkirk, and his Academy Award-winning performance in Oppenheimer.",
        birthDate: new Date("1976-05-25")
    },
    {
        name: "Matt Damon",
        biography: "American actor, producer, and screenwriter known for the Bourne series, Good Will Hunting, and The Martian.",
        birthDate: new Date("1970-10-08")
    },
    {
        name: "Ryan Gosling",
        biography: "Canadian actor known for La La Land, Drive, Blade Runner 2049, and The Notebook.",
        birthDate: new Date("1980-11-12")
    },
    {
        name: "Chris Evans",
        biography: "American actor best known for playing Captain America in the Marvel Cinematic Universe and roles in Knives Out and Snowpiercer.",
        birthDate: new Date("1981-06-13")
    },
    {
        name: "Chris Hemsworth",
        biography: "Australian actor known for portraying Thor in the Marvel Cinematic Universe and starring in Extraction.",
        birthDate: new Date("1983-08-11")
    },
    {
        name: "Scarlett Johansson",
        biography: "American actress known for her roles in Lost in Translation, Marriage Story, and as Black Widow in the Marvel Cinematic Universe.",
        birthDate: new Date("1984-11-22")
    },
    {
        name: "Margot Robbie",
        biography: "Australian actress and producer known for The Wolf of Wall Street, I, Tonya, Barbie, and Birds of Prey.",
        birthDate: new Date("1990-07-02")
    },
    {
        name: "Emma Stone",
        biography: "American actress known for La La Land, Easy A, The Favourite, and Poor Things.",
        birthDate: new Date("1988-11-06")
    },
    {
        name: "Anne Hathaway",
        biography: "American actress known for The Devil Wears Prada, Interstellar, Les Misérables, and The Dark Knight Rises.",
        birthDate: new Date("1982-11-12")
    },
    {
        name: "Natalie Portman",
        biography: "Israeli-American actress known for Black Swan, V for Vendetta, Léon: The Professional, and Thor films.",
        birthDate: new Date("1981-06-09")
    },
    {
        name: "Jennifer Lawrence",
        biography: "American actress known for The Hunger Games series, Silver Linings Playbook, and X-Men films.",
        birthDate: new Date("1990-08-15")
    },
    {
        name: "Tom Holland",
        biography: "English actor known for playing Spider-Man in the Marvel Cinematic Universe and starring in Uncharted.",
        birthDate: new Date("1996-06-01")
    },
    {
        name: "Zendaya",
        biography: "American actress and singer known for Euphoria, Spider-Man films, Dune, and Challengers.",
        birthDate: new Date("1996-09-01")
    },
    {
        name: "Keanu Reeves",
        biography: "Canadian actor known for The Matrix series, John Wick franchise, and Speed.",
        birthDate: new Date("1964-09-02")
    },
    {
        name: "Denzel Washington",
        biography: "American actor and filmmaker known for Training Day, Glory, Malcolm X, and The Equalizer series.",
        birthDate: new Date("1954-12-28")
    },
    {
        name: "Morgan Freeman",
        biography: "American actor known for his distinctive voice and roles in The Shawshank Redemption, Se7en, Million Dollar Baby, and The Dark Knight trilogy.",
        birthDate: new Date("1937-06-01")
    },
    {
        name: "Samuel L. Jackson",
        biography: "American actor known for Pulp Fiction, Django Unchained, and his role as Nick Fury in the Marvel Cinematic Universe.",
        birthDate: new Date("1948-12-21")
    },
    {
        name: "Joaquin Phoenix",
        biography: "American actor known for Joker, Gladiator, Walk the Line, and The Master.",
        birthDate: new Date("1974-10-28")
    },
    {
        name: "Johnny Depp",
        biography: "American actor known for Pirates of the Caribbean, Edward Scissorhands, Sweeney Todd, and Charlie and the Chocolate Factory.",
        birthDate: new Date("1963-06-09")
    },
    {
        name: "Hugh Jackman",
        biography: "Australian actor known for playing Wolverine in the X-Men series and starring in The Greatest Showman and Les Misérables.",
        birthDate: new Date("1968-10-12")
    },
    {
        name: "Jake Gyllenhaal",
        biography: "American actor known for Nightcrawler, Prisoners, Brokeback Mountain, and Spider-Man: Far From Home.",
        birthDate: new Date("1980-12-19")
    },
    {
        name: "Oscar Isaac",
        biography: "Guatemalan-American actor known for Dune, Ex Machina, Star Wars sequel trilogy, and Inside Llewyn Davis.",
        birthDate: new Date("1979-03-09")
    },
    {
        name: "Pedro Pascal",
        biography: "Chilean-American actor known for The Last of Us, The Mandalorian, Narcos, and Gladiator II.",
        birthDate: new Date("1975-04-02")
    },
    {
        name: "Adam Driver",
        biography: "American actor known for Star Wars sequel trilogy, Marriage Story, Paterson, and Ferrari.",
        birthDate: new Date("1983-11-19")
    },
    {
        name: "Benedict Cumberbatch",
        biography: "English actor known for Sherlock, Doctor Strange, The Imitation Game, and The Power of the Dog.",
        birthDate: new Date("1976-07-19")
    },
    {
        name: "Daniel Craig",
        biography: "English actor best known for portraying James Bond in Casino Royale, Skyfall, and other films in the franchise.",
        birthDate: new Date("1968-03-02")
    },
    {
        name: "Harrison Ford",
        biography: "American actor known for iconic roles as Han Solo in Star Wars and Indiana Jones in the Indiana Jones series.",
        birthDate: new Date("1942-07-13")
    },
    {
        name: "Al Pacino",
        biography: "American actor known for The Godfather trilogy, Scarface, Heat, and Scent of a Woman.",
        birthDate: new Date("1940-04-25")
    },
    {
        name: "Robert De Niro",
        biography: "American actor known for Taxi Driver, Raging Bull, Goodfellas, and The Irishman.",
        birthDate: new Date("1943-08-17")
    },
    {
        name: "Christian Slater",
        biography: "American actor known for Heathers, True Romance, Mr. Robot, and Interview with the Vampire.",
        birthDate: new Date("1969-08-18")
    },
    {
        name: "Will Smith",
        biography: "American actor and rapper known for Men in Black, The Pursuit of Happyness, Ali, and Bad Boys.",
        birthDate: new Date("1968-09-25")
    },
    {
        name: "Mark Ruffalo",
        biography: "American actor known for Spotlight, Zodiac, and portraying Bruce Banner in the Marvel Cinematic Universe.",
        birthDate: new Date("1967-11-22")
    },
    {
        name: "Jeremy Renner",
        biography: "American actor known for The Hurt Locker, Arrival, Mission: Impossible films, and Hawkeye in the Marvel Cinematic Universe.",
        birthDate: new Date("1971-01-07")
    },
    {
        name: "Michael Fassbender",
        biography: "Irish-German actor known for X-Men films, Steve Jobs, 12 Years a Slave, and Shame.",
        birthDate: new Date("1977-04-02")
    },
    {
        name: "Rami Malek",
        biography: "American actor known for Mr. Robot, Bohemian Rhapsody, and No Time to Die.",
        birthDate: new Date("1981-05-12")
    }

]

async function seedActors() {

    await prisma.actor.createMany({
        data: actors,
        skipDuplicates: true
    });

    console.log("Actors seeded");
}



const directors = [
    {
        name: "Chad Stahelski",
        biography: "American filmmaker and stunt coordinator best known for directing the John Wick film series. He previously worked as a stunt performer and stunt coordinator in Hollywood.",
        birthDate: new Date("1968-09-20")
    },
    {
        name: "Christopher Nolan",
        biography: "Director known for Inception, Interstellar, The Dark Knight trilogy, Dunkirk, and Oppenheimer.",
        birthDate: new Date("1970-07-30")
    },
    {
        name: "Steven Spielberg",
        biography: "American director known for Jurassic Park, Jaws, E.T., Saving Private Ryan, and Schindler's List.",
        birthDate: new Date("1946-12-18")
    },
    {
        name: "Martin Scorsese",
        biography: "American director known for Taxi Driver, Goodfellas, The Departed, and Killers of the Flower Moon.",
        birthDate: new Date("1942-11-17")
    },
    {
        name: "Quentin Tarantino",
        biography: "American director known for Pulp Fiction, Kill Bill, Inglourious Basterds, and Once Upon a Time in Hollywood.",
        birthDate: new Date("1963-03-27")
    },
    {
        name: "James Cameron",
        biography: "Canadian director known for Titanic, Avatar, Terminator, and Aliens.",
        birthDate: new Date("1954-08-16")
    },
    {
        name: "Denis Villeneuve",
        biography: "Canadian director known for Dune, Blade Runner 2049, Arrival, and Sicario.",
        birthDate: new Date("1967-10-03")
    },
    {
        name: "David Fincher",
        biography: "American director known for Fight Club, Se7en, Gone Girl, and The Social Network.",
        birthDate: new Date("1962-08-28")
    },
    {
        name: "Ridley Scott",
        biography: "English director known for Alien, Gladiator, Blade Runner, and The Martian.",
        birthDate: new Date("1937-11-30")
    },
    {
        name: "Peter Jackson",
        biography: "New Zealand director known for The Lord of the Rings trilogy, The Hobbit trilogy, and King Kong.",
        birthDate: new Date("1961-10-31")
    },
    {
        name: "Greta Gerwig",
        biography: "American director known for Lady Bird, Little Women, and Barbie.",
        birthDate: new Date("1983-08-04")
    },
    {
        name: "Bong Joon-ho",
        biography: "South Korean director known for Parasite, Snowpiercer, Memories of Murder, and The Host.",
        birthDate: new Date("1969-09-14")
    },
    {
        name: "Alfonso Cuarón",
        biography: "Mexican director known for Gravity, Roma, Children of Men, and Harry Potter and the Prisoner of Azkaban.",
        birthDate: new Date("1961-11-28")
    },
    {
        name: "Guillermo del Toro",
        biography: "Mexican director known for Pan's Labyrinth, The Shape of Water, Hellboy, and Pacific Rim.",
        birthDate: new Date("1964-10-09")
    },
    {
        name: "Tim Burton",
        biography: "American director known for Edward Scissorhands, Batman, Beetlejuice, and The Nightmare Before Christmas.",
        birthDate: new Date("1958-08-25")
    },
    {
        name: "Francis Ford Coppola",
        biography: "American director known for The Godfather trilogy, Apocalypse Now, and The Conversation.",
        birthDate: new Date("1939-04-07")
    },
    {
        name: "Wes Anderson",
        biography: "American director known for The Grand Budapest Hotel, Moonrise Kingdom, and The French Dispatch.",
        birthDate: new Date("1969-05-01")
    },
    {
        name: "James Gunn",
        biography: "American director known for Guardians of the Galaxy, The Suicide Squad, and Superman.",
        birthDate: new Date("1970-08-05")
    },
    {
        name: "Taika Waititi",
        biography: "New Zealand director known for Jojo Rabbit, Thor: Ragnarok, and What We Do in the Shadows.",
        birthDate: new Date("1975-08-16")
    },
    {
        name: "Zack Snyder",
        biography: "American director known for 300, Watchmen, Man of Steel, and Justice League.",
        birthDate: new Date("1966-03-01")
    },
    {
        name: "Robert Zemeckis",
        biography: "American director known for Back to the Future trilogy, Forrest Gump, and Cast Away.",
        birthDate: new Date("1952-05-14")
    }
]


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
    // await seedGenres();
    // await seedActors();
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
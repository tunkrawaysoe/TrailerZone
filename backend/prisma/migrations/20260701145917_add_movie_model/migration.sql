/*
  Warnings:

  - You are about to drop the `_GenreToMovie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "_GenreToMovie";

-- CreateTable
CREATE TABLE "MovieGenre" (
    "movieId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "profileImage" TEXT,
    "biography" TEXT,
    "birthDate" TIMESTAMP(3),

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieActor" (
    "movieId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "characterName" TEXT,

    CONSTRAINT "MovieActor_pkey" PRIMARY KEY ("movieId","actorId")
);

-- CreateTable
CREATE TABLE "Director" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "biography" TEXT,
    "birthDate" TIMESTAMP(3),

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieDirector" (
    "movieId" INTEGER NOT NULL,
    "directorId" INTEGER NOT NULL,

    CONSTRAINT "MovieDirector_pkey" PRIMARY KEY ("movieId","directorId")
);

-- CreateIndex
CREATE INDEX "MovieGenre_movieId_idx" ON "MovieGenre"("movieId");

-- CreateIndex
CREATE INDEX "MovieGenre_genreId_idx" ON "MovieGenre"("genreId");

-- CreateIndex
CREATE INDEX "MovieActor_movieId_idx" ON "MovieActor"("movieId");

-- CreateIndex
CREATE INDEX "MovieActor_actorId_idx" ON "MovieActor"("actorId");

-- CreateIndex
CREATE INDEX "MovieDirector_movieId_idx" ON "MovieDirector"("movieId");

-- CreateIndex
CREATE INDEX "MovieDirector_directorId_idx" ON "MovieDirector"("directorId");

-- CreateIndex
CREATE INDEX "Review_movieId_idx" ON "Review"("movieId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_movieId_key" ON "Review"("userId", "movieId");

-- CreateIndex
CREATE INDEX "Trailer_movieId_idx" ON "Trailer"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Watchlist_movieId_idx" ON "Watchlist"("movieId");

-- CreateIndex
CREATE INDEX "Watchlist_userId_idx" ON "Watchlist"("userId");

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActor" ADD CONSTRAINT "MovieActor_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieActor" ADD CONSTRAINT "MovieActor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD CONSTRAINT "MovieDirector_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD CONSTRAINT "MovieDirector_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Director"("id") ON DELETE CASCADE ON UPDATE CASCADE;

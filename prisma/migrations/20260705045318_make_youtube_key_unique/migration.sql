/*
  Warnings:

  - A unique constraint covering the columns `[youtubeKey]` on the table `Trailer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trailer_youtubeKey_key" ON "Trailer"("youtubeKey");

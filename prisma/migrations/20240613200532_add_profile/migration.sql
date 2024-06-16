/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `masters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `players` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "profileId" INTEGER;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "masters_name_key" ON "masters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "players_profileId_key" ON "players"("profileId");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

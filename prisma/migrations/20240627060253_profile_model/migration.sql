/*
  Warnings:

  - A unique constraint covering the columns `[playerId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_profileId_fkey";

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "playerId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_playerId_key" ON "profiles"("playerId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

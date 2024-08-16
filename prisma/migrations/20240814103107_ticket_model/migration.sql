/*
  Warnings:

  - Made the column `playerId` on table `pairs` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ColorTheme" AS ENUM ('light', 'dark');

-- CreateEnum
CREATE TYPE "ViewVariant" AS ENUM ('card', 'table');

-- DropForeignKey
ALTER TABLE "pairs" DROP CONSTRAINT "pairs_playerId_fkey";

-- AlterTable
ALTER TABLE "pairs" ALTER COLUMN "playerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "players" ADD COLUMN     "ticketId" TEXT;

-- CreateTable
CREATE TABLE "tickets" (
    "uuid" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "playerId" INTEGER NOT NULL,
    "cAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uAt" TIMESTAMP(3) NOT NULL,
    "eAt" INTEGER,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "theme" "ColorTheme" NOT NULL DEFAULT 'light',
    "view" "ViewVariant" NOT NULL DEFAULT 'card',

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_playerId_key" ON "tickets"("playerId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

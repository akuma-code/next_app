/*
  Warnings:

  - Made the column `playerId` on table `pairs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pairs" DROP CONSTRAINT "pairs_playerId_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "cost" INTEGER DEFAULT 1;

-- AlterTable
ALTER TABLE "pairs" ALTER COLUMN "playerId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Ticket" (
    "uuid" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "eAt" TEXT NOT NULL DEFAULT 'never',
    "event_dates" TEXT[],
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER,
    "eventId" INTEGER,
    "masterId" INTEGER,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pair2" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "played_with" TEXT,

    CONSTRAINT "Pair2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'light',
    "view" TEXT NOT NULL DEFAULT 'card',

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_playerId_key" ON "Ticket"("playerId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "masters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pair2" ADD CONSTRAINT "Pair2_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pair2" ADD CONSTRAINT "Pair2_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

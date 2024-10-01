/*
  Warnings:

  - You are about to drop the column `cAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `uAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `coachId` on the `players` table. All the data in the column will be lost.
  - You are about to drop the `_CoachToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coaches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CoachToEvent" DROP CONSTRAINT "_CoachToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoachToEvent" DROP CONSTRAINT "_CoachToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_coachId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "cAt",
DROP COLUMN "uAt",
ADD COLUMN     "isDraft" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "players" DROP COLUMN "coachId";

-- DropTable
DROP TABLE "_CoachToEvent";

-- DropTable
DROP TABLE "coaches";

-- CreateTable
CREATE TABLE "pairs" (
    "id" SERIAL NOT NULL,
    "firstPlayerId" INTEGER NOT NULL,
    "secondPlayerId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "pairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventInfo" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "text" TEXT,

    CONSTRAINT "eventInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserved_tables" (
    "id" SERIAL NOT NULL,
    "coachId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "eventInfoId" INTEGER NOT NULL,

    CONSTRAINT "reserved_tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masterEvents" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "masterEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drafts" (
    "uuid" TEXT NOT NULL,

    CONSTRAINT "drafts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "instance" (
    "uuid" TEXT NOT NULL,

    CONSTRAINT "instance_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_MasterEventToPlayer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DraftEventToMember" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pairs_firstPlayerId_secondPlayerId_key" ON "pairs"("firstPlayerId", "secondPlayerId");

-- CreateIndex
CREATE UNIQUE INDEX "eventInfo_eventId_key" ON "eventInfo"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "_MasterEventToPlayer_AB_unique" ON "_MasterEventToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_MasterEventToPlayer_B_index" ON "_MasterEventToPlayer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DraftEventToMember_AB_unique" ON "_DraftEventToMember"("A", "B");

-- CreateIndex
CREATE INDEX "_DraftEventToMember_B_index" ON "_DraftEventToMember"("B");

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventInfo" ADD CONSTRAINT "eventInfo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterEventToPlayer" ADD CONSTRAINT "_MasterEventToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "masterEvents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterEventToPlayer" ADD CONSTRAINT "_MasterEventToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DraftEventToMember" ADD CONSTRAINT "_DraftEventToMember_A_fkey" FOREIGN KEY ("A") REFERENCES "drafts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DraftEventToMember" ADD CONSTRAINT "_DraftEventToMember_B_fkey" FOREIGN KEY ("B") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_playerId_fkey";

-- DropTable
DROP TABLE "Ticket";

-- CreateTable
CREATE TABLE "tickets" (
    "uuid" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 480,
    "cfd" TEXT NOT NULL DEFAULT '',
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_playerId_key" ON "tickets"("playerId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

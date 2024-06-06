/*
  Warnings:

  - You are about to drop the column `profileUuId` on the `players` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `players_profileUuId_fkey`;

-- AlterTable
ALTER TABLE `players` DROP COLUMN `profileUuId`;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `playerId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_playerId_key` ON `Profile`(`playerId`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

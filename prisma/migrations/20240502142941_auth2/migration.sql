/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `stp-props` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paramId]` on the table `stps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stpNumPropId]` on the table `stps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `stp-props` DROP FOREIGN KEY `stp-props_stpName_fkey`;

-- AlterTable
ALTER TABLE `stps` ADD COLUMN `paramId` INTEGER NULL,
    ADD COLUMN `stpNumPropId` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    ADD COLUMN `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `stp-props`;

-- CreateTable
CREATE TABLE `num-props` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stpName` VARCHAR(191) NOT NULL,
    `Ro` DOUBLE NOT NULL,
    `Rw` INTEGER NOT NULL,
    `Lt` INTEGER NOT NULL,
    `Lr` INTEGER NOT NULL,
    `Ra` INTEGER NOT NULL,
    `Det` INTEGER NOT NULL,
    `Er` INTEGER NOT NULL,
    `Ea` INTEGER NOT NULL,
    `Sf` INTEGER NOT NULL,
    `S` DOUBLE NOT NULL,
    `weight` INTEGER NOT NULL,

    UNIQUE INDEX `num-props_stpName_key`(`stpName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stp-params` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stpName` VARCHAR(191) NOT NULL,
    `cams` INTEGER NOT NULL,
    `depth` INTEGER NOT NULL,
    `secure` ENUM('P2A', 'none', 'CM2', 'CM3') NOT NULL,

    UNIQUE INDEX `stp-params_stpName_key`(`stpName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSession` (
    `id` VARCHAR(191) NOT NULL,
    `userUuid` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `UserSession_userUuid_key`(`userUuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `stps_paramId_key` ON `stps`(`paramId`);

-- CreateIndex
CREATE UNIQUE INDEX `stps_stpNumPropId_key` ON `stps`(`stpNumPropId`);

-- CreateIndex
CREATE UNIQUE INDEX `users_uuid_key` ON `users`(`uuid`);

-- AddForeignKey
ALTER TABLE `num-props` ADD CONSTRAINT `num-props_stpName_fkey` FOREIGN KEY (`stpName`) REFERENCES `stps`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stp-params` ADD CONSTRAINT `stp-params_stpName_fkey` FOREIGN KEY (`stpName`) REFERENCES `stps`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

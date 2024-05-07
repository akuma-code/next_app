/*
  Warnings:

  - You are about to drop the `usersession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `usersession` DROP FOREIGN KEY `UserSession_userUuid_fkey`;

-- DropTable
DROP TABLE `usersession`;

-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `profileUuId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `uuid` VARCHAR(191) NOT NULL,
    `rttf_score` INTEGER NULL,
    `rttf_link` VARCHAR(191) NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EventToPlayer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EventToPlayer_AB_unique`(`A`, `B`),
    INDEX `_EventToPlayer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_profileUuId_fkey` FOREIGN KEY (`profileUuId`) REFERENCES `Profile`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToPlayer` ADD CONSTRAINT `_EventToPlayer_A_fkey` FOREIGN KEY (`A`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToPlayer` ADD CONSTRAINT `_EventToPlayer_B_fkey` FOREIGN KEY (`B`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

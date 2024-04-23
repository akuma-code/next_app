-- CreateTable
CREATE TABLE `stps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `prop_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `stps_name_key`(`name`),
    UNIQUE INDEX `stps_prop_id_key`(`prop_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stp-props` (
    `id` VARCHAR(191) NOT NULL,
    `Ro` INTEGER NOT NULL,
    `Rw` INTEGER NOT NULL,
    `Lt` INTEGER NOT NULL,
    `Lr` INTEGER NOT NULL,
    `Ra` INTEGER NOT NULL,
    `Det` INTEGER NOT NULL,
    `Er` INTEGER NOT NULL,
    `Ea` INTEGER NOT NULL,
    `Sf` INTEGER NOT NULL,
    `S` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `stp_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `stp-props_stp_id_key`(`stp_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('guest', 'user', 'admin') NOT NULL DEFAULT 'guest',

    UNIQUE INDEX `users_nickname_key`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stp-props` ADD CONSTRAINT `stp-props_stp_id_fkey` FOREIGN KEY (`stp_id`) REFERENCES `stps`(`prop_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

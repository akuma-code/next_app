/*
  Warnings:

  - The primary key for the `stp-props` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stp_id` on the `stp-props` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `stp-props` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `prop_id` on the `stps` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stpName]` on the table `stp-props` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stpName` to the `stp-props` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stp-props` DROP FOREIGN KEY `stp-props_stp_id_fkey`;

-- DropIndex
DROP INDEX `stps_prop_id_key` ON `stps`;

-- AlterTable
ALTER TABLE `stp-props` DROP PRIMARY KEY,
    DROP COLUMN `stp_id`,
    ADD COLUMN `stpName` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `stps` DROP COLUMN `prop_id`;

-- CreateIndex
CREATE UNIQUE INDEX `stp-props_stpName_key` ON `stp-props`(`stpName`);

-- AddForeignKey
ALTER TABLE `stp-props` ADD CONSTRAINT `stp-props_stpName_fkey` FOREIGN KEY (`stpName`) REFERENCES `stps`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

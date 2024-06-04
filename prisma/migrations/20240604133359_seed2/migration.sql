/*
  Warnings:

  - You are about to drop the `_MasterEventToPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MasterEventToPlayer" DROP CONSTRAINT "_MasterEventToPlayer_A_fkey";

-- DropForeignKey
ALTER TABLE "_MasterEventToPlayer" DROP CONSTRAINT "_MasterEventToPlayer_B_fkey";

-- DropTable
DROP TABLE "_MasterEventToPlayer";

-- DropTable
DROP TABLE "instance";

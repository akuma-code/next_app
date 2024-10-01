-- AlterTable
ALTER TABLE "pairs" ADD COLUMN     "masterId" INTEGER,
ADD COLUMN     "playerId" INTEGER;

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "masters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pairs" ADD CONSTRAINT "pairs_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

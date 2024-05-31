-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uAt" TIMESTAMP(3) NOT NULL,
    "coachId" INTEGER,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "title" TEXT DEFAULT 'Тренировка',
    "cAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "infos" (
    "uuid" TEXT NOT NULL,
    "rttf_score" INTEGER,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "infos_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "coaches" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT,
    "cAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToPlayer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CoachToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "events_date_key" ON "events"("date");

-- CreateIndex
CREATE UNIQUE INDEX "infos_playerId_key" ON "infos"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "name" ON "coaches"("first_name", "second_name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToPlayer_AB_unique" ON "_EventToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToPlayer_B_index" ON "_EventToPlayer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoachToEvent_AB_unique" ON "_CoachToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CoachToEvent_B_index" ON "_CoachToEvent"("B");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infos" ADD CONSTRAINT "infos_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPlayer" ADD CONSTRAINT "_EventToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToPlayer" ADD CONSTRAINT "_EventToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToEvent" ADD CONSTRAINT "_CoachToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "coaches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToEvent" ADD CONSTRAINT "_CoachToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

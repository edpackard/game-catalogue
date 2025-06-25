/*
  Warnings:

  - Added the required column `gameConsoleId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameConsoleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GameConsole" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "manufacturer" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameConsole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameConsoleId_fkey" FOREIGN KEY ("gameConsoleId") REFERENCES "GameConsole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

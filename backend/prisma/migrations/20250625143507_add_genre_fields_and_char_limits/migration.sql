/*
  Warnings:

  - You are about to alter the column `labelCode` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `region` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "primaryGenre" VARCHAR(50),
ADD COLUMN     "secondaryGenre" VARCHAR(50),
ALTER COLUMN "labelCode" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "region" SET DATA TYPE VARCHAR(25);

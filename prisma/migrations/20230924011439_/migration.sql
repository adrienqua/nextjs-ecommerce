/*
  Warnings:

  - You are about to drop the column `score` on the `review` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `score`,
    ADD COLUMN `rating` INTEGER NOT NULL;

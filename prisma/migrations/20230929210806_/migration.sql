/*
  Warnings:

  - You are about to drop the column `cartMinPrice` on the `discount` table. All the data in the column will be lost.
  - Added the required column `minCartPrice` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` DROP COLUMN `cartMinPrice`,
    ADD COLUMN `minCartPrice` INTEGER NOT NULL;

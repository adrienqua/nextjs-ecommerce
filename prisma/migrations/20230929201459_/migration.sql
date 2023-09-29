/*
  Warnings:

  - Added the required column `cartMinPrice` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` ADD COLUMN `cartMinPrice` INTEGER NOT NULL;

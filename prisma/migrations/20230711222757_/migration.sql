/*
  Warnings:

  - Added the required column `label` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `label` VARCHAR(191) NOT NULL;

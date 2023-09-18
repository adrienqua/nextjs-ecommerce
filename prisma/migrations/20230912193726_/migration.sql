/*
  Warnings:

  - Added the required column `subTotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `subTotal` DECIMAL(7, 2) NOT NULL,
    ADD COLUMN `total` DECIMAL(7, 2) NOT NULL;

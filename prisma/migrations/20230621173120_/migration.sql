/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(6,2)` to `Decimal(7,2)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `price` DECIMAL(7, 2) NOT NULL;

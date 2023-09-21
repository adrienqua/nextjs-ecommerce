/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `picture` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `picture` DROP FOREIGN KEY `Picture_productVariantId_fkey`;

-- AlterTable
ALTER TABLE `picture` DROP COLUMN `productVariantId`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Made the column `name` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postalCode` on table `address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Address_phone_key` ON `address`;

-- AlterTable
ALTER TABLE `address` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `postalCode` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL;

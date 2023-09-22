-- AlterTable
ALTER TABLE `order` ADD COLUMN `orderNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `orderitems` ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `size` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Settings` (
    `id` VARCHAR(191) NOT NULL,
    `freeShipping` DECIMAL(7, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

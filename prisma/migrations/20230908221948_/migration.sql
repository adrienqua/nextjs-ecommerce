-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `ProductVariant_colorId_fkey`;

-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `ProductVariant_sizeId_fkey`;

-- AlterTable
ALTER TABLE `productvariant` MODIFY `colorId` INTEGER NULL,
    MODIFY `sizeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `Size`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

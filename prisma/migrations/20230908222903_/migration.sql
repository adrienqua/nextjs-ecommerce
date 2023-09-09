-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `ProductVariant_productId_fkey`;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

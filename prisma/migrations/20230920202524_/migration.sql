-- CreateTable
CREATE TABLE `Picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productVariantId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_productVariantId_fkey` FOREIGN KEY (`productVariantId`) REFERENCES `ProductVariant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `picture` ADD COLUMN `colorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

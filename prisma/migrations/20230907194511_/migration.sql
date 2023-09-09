-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Favorite_productId_userId_key` ON `Favorite`(`productId`, `userId`);

/*
  Warnings:

  - A unique constraint covering the columns `[productId,label,value]` on the table `Specification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Specification_productId_label_value_key` ON `Specification`(`productId`, `label`, `value`);

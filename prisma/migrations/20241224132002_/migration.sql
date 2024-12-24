/*
  Warnings:

  - Added the required column `statusId` to the `Penyakit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penyakit` ADD COLUMN `statusId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Penyakit` ADD CONSTRAINT `Penyakit_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

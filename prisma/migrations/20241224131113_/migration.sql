/*
  Warnings:

  - A unique constraint covering the columns `[namaPenyakit]` on the table `Penyakit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statusId` to the `Pasien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pasien` ADD COLUMN `statusId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `statusId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `GenericParam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tx` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GenericParam_tx_key`(`tx`),
    UNIQUE INDEX `GenericParam_name_key`(`name`),
    UNIQUE INDEX `GenericParam_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Status_name_key`(`name`),
    UNIQUE INDEX `Status_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Penyakit_namaPenyakit_key` ON `Penyakit`(`namaPenyakit`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pasien` ADD CONSTRAINT `Pasien_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

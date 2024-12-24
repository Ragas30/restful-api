/*
  Warnings:

  - You are about to drop the `_pasientouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `namaPenyakit` to the `Pasien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Pasien` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_pasientouser` DROP FOREIGN KEY `_PasienToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pasientouser` DROP FOREIGN KEY `_PasienToUser_B_fkey`;

-- AlterTable
ALTER TABLE `pasien` ADD COLUMN `namaPenyakit` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_pasientouser`;

-- CreateTable
CREATE TABLE `Penyakit` (
    `id` VARCHAR(191) NOT NULL,
    `namaPenyakit` VARCHAR(191) NOT NULL,
    `penyebab` VARCHAR(191) NOT NULL,
    `solusi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pasien` ADD CONSTRAINT `Pasien_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

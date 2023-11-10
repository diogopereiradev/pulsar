/*
  Warnings:

  - You are about to alter the column `messages` on the `Documentation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `colors` on the `Documentation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `categories` on the `Documentation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `customizations` on the `Documentation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `features` on the `Documentation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Documentation` MODIFY `messages` JSON NOT NULL,
    MODIFY `colors` JSON NOT NULL,
    MODIFY `categories` JSON NOT NULL,
    MODIFY `customizations` JSON NOT NULL,
    MODIFY `features` JSON NOT NULL;

-- CreateTable
CREATE TABLE `Documentation` (
    `id` VARCHAR(14) NOT NULL,
    `title` VARCHAR(26) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `messages` JSON NOT NULL,
    `colors` JSON NOT NULL,
    `categories` JSON NOT NULL,
    `pages` JSON NOT NULL,
    `customizations` JSON NOT NULL,
    `features` JSON NOT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authorIdentifier` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

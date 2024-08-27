/*
  Warnings:

  - The values [SUPER_ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `adoptionrequests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `donations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pets` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'USER');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "adoptionrequests" DROP CONSTRAINT "adoptionrequests_petId_fkey";

-- DropForeignKey
ALTER TABLE "adoptionrequests" DROP CONSTRAINT "adoptionrequests_userId_fkey";

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_blogId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_userId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status";

-- DropTable
DROP TABLE "adoptionrequests";

-- DropTable
DROP TABLE "blogs";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "donations";

-- DropTable
DROP TABLE "pets";

-- DropEnum
DROP TYPE "AnimelSleep";

-- DropEnum
DROP TYPE "BlogStatus";

-- DropEnum
DROP TYPE "OpinionOption";

-- DropEnum
DROP TYPE "RequestStatus";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "salary" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "numberOFOpenions" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "coverLetter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

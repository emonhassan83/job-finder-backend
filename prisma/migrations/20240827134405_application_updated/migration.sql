-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';

/*
  Warnings:

  - You are about to drop the column `primary_color` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `secondary_color` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "primary_color",
DROP COLUMN "secondary_color",
ADD COLUMN     "colors" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "theme_mode" TEXT NOT NULL DEFAULT 'light';

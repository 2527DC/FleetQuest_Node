/*
  Warnings:

  - Added the required column `vendor` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleNo` to the `vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "vendor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vendor" ADD COLUMN     "vehicleNo" INTEGER NOT NULL;

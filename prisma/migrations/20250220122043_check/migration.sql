/*
  Warnings:

  - Added the required column `permanentAddress` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "permanentAddress" TEXT NOT NULL;

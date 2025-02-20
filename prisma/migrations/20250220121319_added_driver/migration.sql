/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Driver" (
    "driverName" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "altPhoneNumber" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "gender" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_driverName_key" ON "Driver"("driverName");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_phoneNumber_key" ON "Driver"("phoneNumber");

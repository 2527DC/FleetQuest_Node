-- CreateTable
CREATE TABLE "Driver" (
    "driverName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "altPhoneNumber" TEXT,
    "city" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "vendor" (
    "vendorName" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "altPhoneNumber" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "vehicleNo" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_driverName_key" ON "Driver"("driverName");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_phoneNumber_key" ON "Driver"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_vendorName_key" ON "vendor"("vendorName");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_phoneNumber_key" ON "vendor"("phoneNumber");

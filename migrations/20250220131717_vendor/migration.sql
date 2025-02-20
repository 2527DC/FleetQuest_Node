-- CreateTable
CREATE TABLE "vendor" (
    "vendorName" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "altPhoneNumber" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "companyName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "vendor_vendorName_key" ON "vendor"("vendorName");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_phoneNumber_key" ON "vendor"("phoneNumber");

-- CreateTable
CREATE TABLE "Tenant" (
    "name" TEXT NOT NULL,
    "dbUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_name_key" ON "Tenant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_dbUrl_key" ON "Tenant"("dbUrl");

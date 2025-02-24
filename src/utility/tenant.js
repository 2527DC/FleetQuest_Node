// import { tenantClients } from "../controllers/adminController.js"
// import { PrismaClient as DefaultPrismaClient } from "../../prisma/generated/default/index.js";
// import fs from "fs";
// import path from "path";


// const defaultPrisma = new DefaultPrismaClient();
// export const getTenantClient = async (tenantName) => {
//   // Define the file path for storing cached tenants
//   const filePath = path.join(process.cwd(), "tenantClients.json");

//   // Convert the Map to a JSON object
//   const tenantData = {};
//   tenantClients.forEach((client, key) => {
//       tenantData[key] = { dbUrl: client._engineConfig.datasources.db.url }; // Extract only DB URL
//   });

//   // Write the tenant data to a file
//   fs.writeFileSync(filePath, JSON.stringify(tenantData, null, 2), "utf-8");

//   console.log(`📂 Cached tenants saved to ${filePath}`);

//   // Check if the Prisma client for this tenant already exists in cache
//   if (tenantClients.has(tenantName)) {
//       console.log(`⚡ Using cached Prisma client for tenant: ${tenantName}`);
//       return tenantClients.get(tenantName);
//   }

//   // Fetch the tenant details from the main database
//   const tenant = await defaultPrisma.tenant.findUnique({
//       where: { name: tenantName },
//   });

//   if (!tenant) {
//       throw new Error(`Tenant '${tenantName}' not found`);
//   }

//   console.log(`🔌 Connecting to tenant database: ${tenant.dbUrl}`);

//   // Dynamically create and cache the Prisma client for this tenant
//   const { PrismaClient: TenantPrismaClient } = await import("../../prisma/generated/tenant/index.js");

//   const tenantClient = new TenantPrismaClient({
//       datasources: { db: { url: tenant.dbUrl } },
//   });

//   tenantClients.set(tenantName, tenantClient); // Cache the client

//   console.log("✅ Prisma Client Cached for:", tenantName);

//   // Update the file again after adding a new tenant
//   tenantData[tenantName] = { dbUrl: tenant.dbUrl };
//   fs.writeFileSync(filePath, JSON.stringify(tenantData, null, 2), "utf-8");

//   console.log(`📂 Updated cached tenants saved to ${filePath}`);

//   return tenantClient;
// };

import { tenantClients } from "../controllers/adminController.js"
import { PrismaClient as DefaultPrismaClient } from "../../prisma/generated/default/index.js";


const defaultPrisma = new DefaultPrismaClient();
export const getTenantClient = async (tenantName) => {
  // Log all cached clients
  console.log("📌 Currently Cached Prisma Clients:", Array.from(tenantClients.keys()));

  // Check if the Prisma client for this tenant already exists in cache
  if (tenantClients.has(tenantName)) {
    console.log(`⚡ Using cached Prisma client for tenant: ${tenantName}`);
    return tenantClients.get(tenantName);
  }

  // Fetch the tenant details from the main database
  const tenant = await defaultPrisma.tenant.findUnique({
    where: { name: tenantName },
  });

  if (!tenant) {
    throw new Error(`Tenant '${tenantName}' not found`);
  }

  console.log(`🔌 Connecting to tenant database: ${tenant.dbUrl}`);

  // Dynamically create and cache the Prisma client for this tenant
  const { PrismaClient: TenantPrismaClient } = await import("../../prisma/generated/tenant/index.js");

  const tenantClient = new TenantPrismaClient({
    datasources: { db: { url: tenant.dbUrl } },
  });

  tenantClients.set(tenantName, tenantClient); // Cache the client

  console.log("✅ Prisma Client Cached for:", tenantName);
  console.log("📌 Updated Cached Prisma Clients:", Array.from(tenantClients.keys())); // Log updated clients

  return tenantClient;
};

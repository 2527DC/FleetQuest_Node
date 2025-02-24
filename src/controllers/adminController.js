// import { PrismaClient } from "@prisma/client";
// import { exec } from "child_process";
// import util from "util";
// import pkg from "pg";  // ✅ Fix import
// const { Client } = pkg;  // ✅ Extract Client
//  // ✅ Use pg client for raw database operations

// const execPromise = util.promisify(exec);
// const prisma = new PrismaClient();

// /**
//  * ✅ Creates a new database using PostgreSQL `pg` client.
//  */
// const createDatabaseIfNotExists = async (dbName) => {
//   const client = new Client({
//     user: "postgres",
//     host: "localhost",
//     password: "root",
//     port: 5432,
//   });

//   try {
//     await client.connect();
//     const dbExists = await client.query(
//       `SELECT 1 FROM pg_database WHERE datname = $1`, 
//       [dbName]
//     );

//     if (dbExists.rows.length > 0) {
//       throw new Error(`Database "${dbName}" already exists.`);
//     }

//     await client.query(`CREATE DATABASE "${dbName}"`);
//     console.log(`✅ Database "${dbName}" created successfully.`);
//   } catch (error) {
//     console.error(`❌ Failed to create database: ${error.message}`);
//   } finally {
//     await client.end();
//   }
// };
// // ✅ Function to get a Prisma instance for a specific tenant
// const getPrismaClientForTenant = (dbUrl) => {
//   return new PrismaClient({ datasources: { db: { url: dbUrl } } });
// };

// /**
//  * ✅ Main function to create a new tenant
//  */
// export const createTenant = async (req, res) => {
//   try {
//     const { tenant } = req.body;
//     if (!tenant) {
//       return res.status(400).json({ error: "Tenant name is required" });
//     }

//     const dbName = `tenant_db_${tenant}`;
//     const dbUrl = `postgresql://postgres:root@localhost:5432/${dbName}`;

//     // 1️⃣ Ensure database does not already exist
//     await createDatabaseIfNotExists(dbName);

//     // 2️⃣ Store tenant details in the main database
//     await prisma.tenant.create({
//       data: {
//         name: tenant,
//         subdomain: tenant,
//         databaseUrl: dbUrl,
//       },
//     });

//     // 3️⃣ Use a tenant-specific Prisma instance
//     const tenantPrisma = getPrismaClientForTenant(dbUrl);

//     // 4️⃣ Run migrations asynchronously without blocking API
//     setImmediate(async () => {
//       try {
//         console.log(`🚀 Pushing Prisma schema for tenant: ${tenant}`);
    
//         // ✅ Push entire folder instead of a single file
//         await execPromise(`npx prisma db push --schema=prisma/tenant/`);
    
//         console.log(`✅ Schema successfully pushed for tenant: ${tenant}`);
    
//       } catch (error) {
//         console.error(`❌ Schema push failed for tenant: ${tenant}`, error);
//       }
//     });
    
    

//     res.status(201).json({ message: `✅ Tenant "${tenant}" is being set up!` });
//   } catch (error) {
//     console.error("❌ Error creating tenant:", error);
//     res.status(500).json({ error: "Failed to create tenant", details: error.message });
//   }
// };

import { PrismaClient as DefaultPrismaClient } from "../../prisma/generated/default/index.js";
import { execSync } from "child_process";
import pg from "pg"; // PostgreSQL client for creating databases
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getTenantClient } from "../utility/tenant.js";

dotenv.config();

const { Client } = pg;

const defaultPrisma = new DefaultPrismaClient();
export const tenantClients = new Map(); // Cache for tenant clients

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addTenant = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Tenant name is required" });

    const baseDbUrl = process.env.TENANT_DATABASE_URL;
    if (!baseDbUrl) return res.status(500).json({ error: "TENANT_DATABASE_URL not set in .env" });

    const dbUrl = `${baseDbUrl}${name}`;


    // ✅ Step 1: Check if tenant already exists in cache
    if (tenantClients.has(name)) {
      return res.status(400).json({ error: "Tenant already exists" });
    }

    // ✅ Step 2: Check if tenant exists in default DB
    const existingTenant = await defaultPrisma.tenant.findUnique({ where: { name } });
    if (existingTenant) {
      return res.status(400).json({ error: "Tenant already exists in DB" });
    }

    // ✅ Step 3: Create the tenant database before migration
    console.log(`📌 Creating database '${name}'...`);
    const client = new Client({
      connectionString: process.env.TENANT_DATABASE_URL + "postgres", // Connect to the main PostgreSQL DB
    });

    await client.connect();
    await client.query(`CREATE DATABASE "${name}"`); // Create tenant database
    await client.end();
    console.log(`✅ Database '${name}' created successfully.`);

    // ✅ Step 4: Store tenant info in the main database
    const tenant = await defaultPrisma.tenant.create({
      data: { name, dbUrl },
    });

    console.log(`✅ Tenant '${name}' added to main DB with URL: ${dbUrl}`);

   // ✅ Step 5: Push Schema Instead of Running Migrations
      console.log("🚀 Pushing Prisma schema for new tenant...");
      execSync(`DATABASE_URL="${dbUrl}" npx prisma db push --accept-data-loss --schema=prisma/schema/tenant.prisma`, { stdio: "inherit" });
//  execSync(`DATABASE_URL="postgresql://postgres:root@localhost:5432/${name}" npx prisma db push --accept-data-loss --schema=prisma/schema/tenant.prisma
// `, { stdio: "inherit" });

    // ✅ Step 6: Generate Prisma Client for tenant if missing
    const tenantGeneratedPath = path.join(__dirname, "../../prisma/generated/tenant/index.js");
    if (!fs.existsSync(tenantGeneratedPath)) {
      console.log("⚡ Generating Prisma Client for tenants...");
      execSync(`npx prisma generate --schema=prisma/schema/tenant.prisma`, { stdio: "inherit" });
    }

    // ✅ Step 7: Dynamically import Prisma Client for the tenant
    const { PrismaClient: TenantPrismaClient } = await import("../../prisma/generated/tenant/index.js");

    // ✅ Step 8: Cache the Prisma client for the tenant
    tenantClients.set(
      name,
      new TenantPrismaClient({
        datasources: { db: { url: dbUrl } },
      })
    );

    res.status(201).json({ message: `Tenant '${name}' created successfully`, tenant });
  } catch (error) {
    console.error("❌ Error creating tenant:", error);
    res.status(500).json({ error: "Failed to create tenant" });
  }
};





export const getTenantUsers = async (req, res) => {
  try {
    const { tenantName } = req.params;

    // Get the tenant-specific Prisma client
    const tenantPrisma = await getTenantClient(tenantName);

    // Fetch all users from the tenant database
    const users = await tenantPrisma.user.findMany();
if(!users){
  res.json({message: "no users in the tennt "});
}
    res.json({ users });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

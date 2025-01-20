import pkg from 'pg';  // Import the entire 'pg' module
import { exec } from 'child_process';  // Use exec to run Prisma migration commands
const { Client } = pkg;  // Destructure Client from 'pg'

// Function to create a database and connect to it, handling req and res for response
export async function createAndConnectDatabase(req, res) {
  const { tenantDbName } = req.body;  // Extract tenantDbName from request body

  if (!tenantDbName) {
    return res.status(400).json({ error: 'Database name is required' });
  }

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',  // Connect to the default 'postgres' database
    password: 'root',
    port: 5432,
  });

  try {
    // Step 1: Connect to PostgreSQL
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Step 2: Create a new database
    await client.query(`CREATE DATABASE ${tenantDbName}`);
    console.log('Database created successfully!');

    // Step 3: Disconnect from the default database
    await client.end();

    // Step 4: Run Prisma schema to create tables in the new database
    await applyPrismaSchema(tenantDbName, res);

  } catch (err) {
    console.error('Error:', err.stack);
    return res.status(500).json({ error: 'Error creating database or applying schema', details: err.stack });
  }
}

// Function to apply the Prisma schema to the new tenant database
async function applyPrismaSchema(tenantDbName, res) {
  const prismaCommand = `DATABASE_URL=postgresql://postgres:root@localhost:5432/${tenantDbName} npx prisma db push`;

  try {
    // Run the Prisma db push to create tables from the schema.prisma
    console.log('Applying Prisma schema...');
    await execPromise(prismaCommand);
    console.log('Schema applied successfully!');
    
    // Respond with success
    res.status(200).json({ message: `Database ${tenantDbName} created and schema applied successfully!` });

  } catch (error) {
    console.error('Error applying schema:', error);
    return res.status(500).json({ error: 'Error applying Prisma schema', details: error });
  }
}

// Utility function to handle promise-based exec
function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

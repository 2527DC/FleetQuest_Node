// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { execSync } from 'child_process';

// // Get `__dirname` equivalent in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const schemaDir = path.join(__dirname, 'prisma');  
// const outputFile = path.join(schemaDir, 'schema.prisma');

// const schemaFiles = ['drivers.prisma']; // Add more files if needed

// let mergedSchema = `
// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }
// `;

// schemaFiles.forEach(file => {
//   const filePath = path.join(schemaDir, file);
//   if (fs.existsSync(filePath)) {
//     mergedSchema += `\n\n// ${file}\n` + fs.readFileSync(filePath, 'utf8');
//   } else {
//     console.error(`File not found: ${filePath}`);
//   }
// });

// fs.writeFileSync(outputFile, mergedSchema);
// console.log('✅ Merged schema.prisma created successfully.');

// // Run Prisma migration command automatically
// try {
//   console.log('🚀 Running Prisma migration...');
//   execSync(`npx prisma migrate dev --schema=${outputFile}`, { stdio: 'inherit' });
//   console.log('✅ Migration completed successfully.');
// } catch (error) {
//   console.error('❌ Migration failed:', error.message);
// }

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaDir = path.join(__dirname, './prisma');  // Use the schema folder

try {
  console.log('🚀 Running Prisma migration using multi-file schema...');
  console.log('this is the  schemaDire',schemaDir);
  
  // Generate migration for new schema changes
  execSync(`npx prisma migrate dev --schema=${schemaDir}`, { stdio: 'inherit' });

  console.log('✅ Migration completed successfully.');
} catch (error) {
  console.error('❌ Migration failed:', error.message);
}
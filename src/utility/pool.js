import { Pool } from 'pg';

const pools = {};

// Get or create a connection pool for the given tenant database
export function getTenantPool(tenantDbName) {
  if (!pools[tenantDbName]) {
    pools[tenantDbName] = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: tenantDbName,
      password: 'root',
      port: 5432,
    });
  }
  return pools[tenantDbName];
}

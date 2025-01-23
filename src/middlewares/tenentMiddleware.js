export function tenantMiddleware(req, res, next) {
    const { tenantDbName } = req.headers;
  
    if (!tenantDbName) {
      return res.status(400).json({ error: 'Tenant database name is required in headers' });
    }
  
    req.tenantDbName = tenantDbName; // Attach tenantDbName to request object
    next();
  }
  
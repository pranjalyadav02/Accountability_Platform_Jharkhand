import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller';
import { getModels, getOverrides } from '../controllers/ai.controller';
import { getHealth, getAuditLogs, getUsers, seedDemo } from '../controllers/system.controller';
import { validateRequest, validateQuery } from '../../../packages/middleware/validate';
import { SeedDemoDataSchema, AIModelQuerySchema } from '../../../packages/validation/schemas';

const adminRouter = Router();

// Dashboard
adminRouter.get('/dashboard', getDashboardStats);

// AI Governance
adminRouter.get('/ai/models', validateQuery(AIModelQuerySchema), getModels);
adminRouter.get('/ai/overrides', getOverrides);

// System & Audit
adminRouter.get('/system/health', getHealth);
adminRouter.get('/audit', getAuditLogs);
adminRouter.get('/users', getUsers);

// Demo Utilities
adminRouter.post('/demo/seed', validateRequest(SeedDemoDataSchema), seedDemo);

export default adminRouter;

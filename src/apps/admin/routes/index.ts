import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller';
import { getModels, getOverrides, updateModel, addOverride } from '../controllers/ai.controller';
import { getHealth, getAuditLogs, getUsers, createUser, toggleUserStatus, seedDemo } from '../controllers/system.controller';

const adminRouter = Router();

// Health
adminRouter.get('/health', (req, res) => res.json({ status: 'ok', portal: 'Accountability_Platform_Jharkhand' }));

// Dashboard
adminRouter.get('/dashboard', getDashboardStats);

// AI Governance
adminRouter.get('/ai/models', getModels);
adminRouter.patch('/ai/models/:id', updateModel);
adminRouter.get('/ai/overrides', getOverrides);
adminRouter.post('/ai/overrides', addOverride);

// System & Audit
adminRouter.get('/system/health', getHealth);
adminRouter.get('/audit', getAuditLogs);

// Users
adminRouter.get('/users', getUsers);
adminRouter.post('/users', createUser);
adminRouter.patch('/users/:id/status', toggleUserStatus);

// Demo Utilities
adminRouter.post('/demo/seed', seedDemo);

export default adminRouter;

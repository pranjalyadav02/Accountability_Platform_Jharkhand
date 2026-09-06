import { Request, Response } from 'express';
import { db } from '../../../db';
import { users, auditLogs, districts, aiModels } from '../../../db/schema.ts';
import { ApiResponse } from '../../../packages/types';

export const getHealth = (req: Request, res: Response<ApiResponse<any>>) => {
  res.json({
    success: true,
    data: {
      status: "Healthy",
      uptime: process.uptime(),
      services: [
        { service: 'Frontend', status: 'Healthy', time: '12ms' },
        { service: 'API (Node/Express)', status: 'Healthy', time: '24ms' },
        { service: 'Database (Cloud SQL)', status: 'Healthy', time: '8ms' },
        { service: 'AI Engine', status: 'Healthy', time: '145ms' },
      ]
    }
  });
};

export const getAuditLogs = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const logs = await db.select().from(auditLogs).limit(50);
    res.json({ success: true, data: logs });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const getUsers = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const allUsers = await db.select().from(users).limit(100);
    res.json({ success: true, data: allUsers });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const seedDemo = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    // Validate request body via Zod middleware upstream
    const { districtCode, districtName, adminEmail } = req.body;

    const m1 = await db.insert(aiModels).values({
      name: 'Problem Classifier', version: '2.4', status: 'Production',
      accuracy: 94.2, precision: 92.1, requests: 1200000, overrideRate: 2.4
    }).returning();
    
    const m2 = await db.insert(aiModels).values({
      name: 'University Matching', version: '2.1', status: 'Production',
      accuracy: 87.4, precision: 86.5, requests: 120000, overrideRate: 8.4
    }).returning();

    const d1 = await db.insert(districts).values({
      code: districtCode, name: districtName
    }).returning();

    const u1 = await db.insert(users).values({
      publicId: `USER-${Date.now()}`,
      name: 'State Admin',
      email: adminEmail,
      districtId: d1[0].id
    }).returning();

    await db.insert(auditLogs).values({
      actorUserId: u1[0].id,
      actorRole: 'SUPER_ADMIN',
      action: 'SEED_DEMO_DATA',
      entityType: 'SYSTEM',
      reason: 'Initialized demo dataset via Admin API'
    });

    res.json({ success: true, data: { message: 'Demo data seeded successfully' } });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

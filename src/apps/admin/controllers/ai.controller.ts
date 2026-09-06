import { Request, Response } from 'express';
import { db } from '../../../db';
import { aiModels, aiOverrides } from '../../../db/schema.ts';
import { ApiResponse } from '../../../packages/types';
import { eq } from 'drizzle-orm';

export const getModels = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { status } = req.query as any;
    
    let query = db.select().from(aiModels);
    
    // Demonstrate usage of validated query params
    if (status) {
      query = query.where(eq(aiModels.status, status)) as any;
    }
    
    const models = await query;
    res.json({ success: true, data: models });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const getOverrides = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const overrides = await db.select().from(aiOverrides).limit(100);
    res.json({ success: true, data: overrides });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

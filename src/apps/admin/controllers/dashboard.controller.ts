import { Request, Response } from 'express';
import { adminStorage } from '../../../db/storage';
import { ApiResponse } from '../../../packages/types';

export const getDashboardStats = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const stats = adminStorage.getDashboardStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

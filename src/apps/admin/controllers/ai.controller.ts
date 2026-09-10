import { Request, Response } from 'express';
import { adminStorage } from '../../../db/storage';
import { ApiResponse } from '../../../packages/types';

export const getModels = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { status } = req.query as any;
    const models = adminStorage.getModels(status);
    res.json({ success: true, data: models });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const updateModel = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { id } = req.params;
    const { status, accuracy } = req.body;
    const updated = adminStorage.updateModelStatus(id, status, accuracy);
    if (!updated) return res.status(404).json({ success: false, error: "Model not found" });
    res.json({ success: true, data: updated });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const getOverrides = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const overrides = adminStorage.getOverrides();
    res.json({ success: true, data: overrides });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const addOverride = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { model, original, human, reason, reviewer } = req.body;
    const newOverride = adminStorage.addOverride({
      model,
      original,
      human,
      reason,
      reviewer: reviewer || 'Super Admin'
    });
    res.status(201).json({ success: true, data: newOverride });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

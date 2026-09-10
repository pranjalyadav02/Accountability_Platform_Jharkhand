import { Request, Response } from 'express';
import { adminStorage } from '../../../db/storage';
import { ApiResponse } from '../../../packages/types';

export const getHealth = (req: Request, res: Response<ApiResponse<any>>) => {
  res.json({
    success: true,
    data: adminStorage.getHealth()
  });
};

export const getAuditLogs = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const logs = adminStorage.getAuditLogs();
    res.json({ success: true, data: logs });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const getUsers = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const allUsers = adminStorage.getUsers();
    res.json({ success: true, data: allUsers });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const createUser = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { name, email, role, district } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: "Name and email are required" });
    }
    const user = adminStorage.createUser({ name, email, role: role || 'District Officer', district });
    res.status(201).json({ success: true, data: user });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const toggleUserStatus = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const { id } = req.params;
    const user = adminStorage.toggleUserStatus(id);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: user });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

export const seedDemo = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const result = adminStorage.seedDemoData();
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
};

import fs from 'fs';
import path from 'path';
import {
  kpiStats,
  funnelData,
  systemHealth,
  aiModels,
  aiOverrides,
  auditLogs,
  users,
} from '../data/mockData';

const SHARED_DIR = path.resolve(process.cwd(), '..', 'shared_data');
const LOCAL_DIR = path.resolve(process.cwd(), 'data');
const SHARED_FILE = path.join(SHARED_DIR, 'admin_store.json');
const LOCAL_FILE = path.join(LOCAL_DIR, 'db.json');

export interface AdminStoreData {
  kpis: any;
  funnel: any[];
  health: any[];
  aiModels: any[];
  aiOverrides: any[];
  auditLogs: any[];
  users: any[];
}

class AdminStorageEngine {
  private filePath: string;
  private data: AdminStoreData;

  constructor() {
    if (fs.existsSync(SHARED_DIR) || fs.existsSync(path.resolve(process.cwd(), '..', 'Government_Command_Jharkhand'))) {
      if (!fs.existsSync(SHARED_DIR)) {
        try { fs.mkdirSync(SHARED_DIR, { recursive: true }); } catch (e) {}
      }
      this.filePath = SHARED_FILE;
    } else {
      if (!fs.existsSync(LOCAL_DIR)) {
        try { fs.mkdirSync(LOCAL_DIR, { recursive: true }); } catch (e) {}
      }
      this.filePath = LOCAL_FILE;
    }

    this.data = this.loadData();
  }

  private loadData(): AdminStoreData {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.users)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Admin store load error:', e);
    }

    const initial: AdminStoreData = {
      kpis: kpiStats,
      funnel: funnelData,
      health: systemHealth,
      aiModels: aiModels,
      aiOverrides: aiOverrides,
      auditLogs: auditLogs,
      users: users,
    };
    this.saveData(initial);
    return initial;
  }

  public saveData(custom?: AdminStoreData): void {
    const toSave = custom || this.data;
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this.filePath, JSON.stringify(toSave, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving AdminStore:', e);
    }
  }

  // KPIs & Dashboard
  public getDashboardStats() {
    return {
      kpis: this.data.kpis,
      funnel: this.data.funnel,
      challengeCount: 12842,
      projectCount: 1284,
      userCount: this.data.users.length,
      aiModelCount: this.data.aiModels.length,
      aiOverrideCount: this.data.aiOverrides.length,
      slaCount: 184
    };
  }

  // AI Models & Overrides
  public getModels(status?: string) {
    let list = [...this.data.aiModels];
    if (status) {
      list = list.filter(m => m.status?.toLowerCase() === status.toLowerCase());
    }
    return list;
  }

  public updateModelStatus(modelId: string, status: string, accuracy?: string) {
    const target = this.data.aiModels.find(m => m.id === modelId);
    if (target) {
      target.status = status;
      if (accuracy) target.accuracy = accuracy;
      this.saveData();
    }
    return target;
  }

  public getOverrides() {
    return this.data.aiOverrides;
  }

  public addOverride(override: { model: string; original: string; human: string; reason: string; reviewer: string }) {
    const newEntry = {
      id: `o${Date.now()}`,
      time: 'Just now',
      ...override
    };
    this.data.aiOverrides.unshift(newEntry);
    this.saveData();
    return newEntry;
  }

  // System Health
  public getHealth() {
    return {
      status: "Healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: this.data.health
    };
  }

  // Audit Logs
  public getAuditLogs() {
    return this.data.auditLogs;
  }

  public logAction(user: string, role: string, action: string, entity: string, result: string = 'Success') {
    const entry = {
      id: `a${Date.now()}`,
      time: new Date().toLocaleTimeString('en-GB'),
      user,
      role,
      action,
      entity,
      result
    };
    this.data.auditLogs.unshift(entry);
    this.saveData();
    return entry;
  }

  // Users
  public getUsers() {
    return this.data.users;
  }

  public createUser(userData: { name: string; email: string; role: string; district?: string }) {
    const newUser = {
      id: `u${Date.now().toString().slice(-4)}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: 'Active',
      lastActive: 'Just now',
      district: userData.district || 'Ranchi'
    };
    this.data.users.unshift(newUser);
    this.saveData();
    return newUser;
  }

  public toggleUserStatus(userId: string) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'Active' ? 'Suspended' : 'Active';
      this.saveData();
    }
    return user;
  }

  // Reset / Demo Seed
  public seedDemoData() {
    this.data = {
      kpis: kpiStats,
      funnel: funnelData,
      health: systemHealth,
      aiModels: aiModels,
      aiOverrides: aiOverrides,
      auditLogs: auditLogs,
      users: users,
    };
    this.saveData();
    return { success: true, message: 'Platform demo data successfully restored.' };
  }
}

export const adminStorage = new AdminStorageEngine();

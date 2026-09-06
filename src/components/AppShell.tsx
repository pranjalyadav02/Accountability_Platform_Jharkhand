import React, { useState } from 'react';
import { 
  ShieldAlert, Activity, Users, Settings, Database, 
  LayoutDashboard, Server, Search, Bell, LogOut, Hexagon,
  FileText, ShieldCheck, Cpu, LocateFixed, Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CommandCenter } from './views/CommandCenter';
import { AIGovernance } from './views/AIGovernance';
import { AuditTrail } from './views/AuditTrail';
import { SystemHealth } from './views/SystemHealth';
import { UserManagement } from './views/UserManagement';

export type TabType = 'command' | 'users' | 'ai' | 'workflow' | 'geography' | 'infrastructure' | 'security' | 'audit' | 'data' | 'health';

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabType>('command');

  const renderContent = () => {
    switch (activeTab) {
      case 'command': return <CommandCenter />;
      case 'ai': return <AIGovernance />;
      case 'audit': return <AuditTrail />;
      case 'health': return <SystemHealth />;
      case 'users': return <UserManagement />;
      default: return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-slate-500">
            <Hexagon className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <h2 className="text-xl font-semibold text-slate-700">Module Coming Soon</h2>
            <p className="mt-2 text-sm">This administrative module is currently being provisioned.</p>
          </div>
        </div>
      );
    }
  };

  const navItems = [
    { id: 'command', label: 'Command Center', icon: LayoutDashboard },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'ai', label: 'AI Governance', icon: Cpu },
    { id: 'workflow', label: 'Workflow & SLAs', icon: Clock },
    { id: 'geography', label: 'Geography', icon: LocateFixed },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
    { id: 'security', label: 'Security Center', icon: ShieldAlert },
    { id: 'audit', label: 'Audit Trail', icon: FileText },
    { id: 'data', label: 'Data Governance', icon: Database },
    { id: 'health', label: 'System Health', icon: Activity },
  ] as const;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0 bg-slate-950">
          <ShieldCheck className="w-6 h-6 text-emerald-500 mr-3" />
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">JSIP</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Platform Admin</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-1 px-3">
          <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Core Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-slate-800 text-white font-medium shadow-sm" 
                    : "hover:bg-slate-800/50 hover:text-slate-100"
                )}
              >
                <Icon className={cn("w-4 h-4 mr-3", isActive ? "text-emerald-400" : "text-slate-500")} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 shrink-0 text-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              LIVE ENVIRONMENT
            </span>
            <span className="text-slate-500">v2.1.0</span>
          </div>
          <button className="w-full flex items-center justify-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center text-lg font-serif font-medium text-slate-800">
            Platform Governance Center
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Global Search (ID, User, Org)..." 
                className="pl-9 pr-4 py-1.5 w-72 text-sm bg-slate-100 border-transparent rounded-full focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100 transition-all outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-6">
              <button className="relative text-slate-500 hover:text-slate-700">
                <Bell className="w-5 h-5" />
                <span className="absolute 1 top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-medium">
                  AD
                </div>
                <div className="hidden md:block text-sm">
                  <p className="font-medium text-slate-900 leading-none">Super Admin</p>
                  <p className="text-slate-500 text-xs mt-1">State Level</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-8 max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

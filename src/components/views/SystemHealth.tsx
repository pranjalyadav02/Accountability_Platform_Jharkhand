import React from 'react';
import { systemHealth as fallbackHealth } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { Server, Activity, Database, Cloud, ShieldAlert, Cpu } from 'lucide-react';
import { useApi } from '../../lib/api';

export function SystemHealth() {
  const { data: healthData, loading } = useApi<{ services: any[] }>('system/health', { services: fallbackHealth });
  const systemHealth = healthData?.services || fallbackHealth;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-slate-900">Infrastructure & System Health</h2>
          <p className="text-slate-500 mt-1">Real-time observability across all platform microservices and dependencies.</p>
        </div>
        <div className="flex space-x-3">
          <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            All Core Systems Operational
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Service status cards */}
        {systemHealth.map((svc) => (
          <div key={svc.service} className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "p-2 rounded-md",
                  svc.status === 'Healthy' ? "bg-emerald-50 text-emerald-600" :
                  svc.status === 'Degraded' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                )}>
                  {svc.service.includes('Database') ? <Database className="w-5 h-5" /> : 
                   svc.service.includes('API') ? <Server className="w-5 h-5" /> :
                   svc.service.includes('AI') ? <Cpu className="w-5 h-5" /> :
                   <Activity className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{svc.service}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Latency: {svc.time}</p>
                </div>
              </div>
              <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                svc.status === 'Healthy' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                svc.status === 'Degraded' ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200"
              )}>
                {svc.status}
              </span>
            </div>
            
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Uptime (30d)</span>
                <span className="font-medium text-slate-700">99.9%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full", svc.status === 'Healthy' ? "bg-emerald-500" : svc.status === 'Degraded' ? "bg-amber-500" : "bg-red-500")}
                  style={{ width: svc.status === 'Healthy' ? '100%' : '80%' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mt-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Database Replication & Backups</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded border border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Primary DB</p>
            <p className="font-semibold text-slate-900">PostgreSQL 16</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Sync Active</p>
          </div>
          <div className="p-4 bg-slate-50 rounded border border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Read Replicas</p>
            <p className="font-semibold text-slate-900">3 Active</p>
            <p className="text-xs text-slate-600 mt-1">Lag: &lt; 50ms</p>
          </div>
          <div className="p-4 bg-slate-50 rounded border border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Last Backup</p>
            <p className="font-semibold text-slate-900">12 mins ago</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Verified</p>
          </div>
          <div className="p-4 bg-slate-50 rounded border border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Vector DB</p>
            <p className="font-semibold text-slate-900">Milvus Cluster</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Indexed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

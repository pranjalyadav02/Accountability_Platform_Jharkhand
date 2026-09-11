import React from 'react';
import { 
  Users, Building, Target, FileCheck, CheckCircle2, 
  Activity, ShieldAlert, Cpu
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { kpiStats as fallbackKpis, funnelData as fallbackFunnel, systemHealth as fallbackHealth } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { useApi } from '../../lib/api';

export function CommandCenter() {
  const { data, loading, error } = useApi<{ kpis: any, funnel: any[] }>('dashboard', {
    kpis: fallbackKpis,
    funnel: fallbackFunnel
  });
  const { data: healthData } = useApi<{ status: string, services: any[] }>('system/health', {
    status: 'Unknown', services: fallbackHealth
  });

  const kpis = loading ? fallbackKpis : (data?.kpis || fallbackKpis);
  const funnel = loading ? fallbackFunnel : (data?.funnel || fallbackFunnel);
  const health = healthData?.services || fallbackHealth;

  const statCards = [
    { label: 'Total Challenges', value: kpis.challenges, icon: Target, trend: '+12%' },
    { label: 'Verified', value: kpis.verified, icon: FileCheck, trend: '+8%' },
    { label: 'Active Projects', value: kpis.activeProjects, icon: Activity, trend: '+15%' },
    { label: 'Deployed Solutions', value: kpis.deployedSolutions, icon: CheckCircle2, trend: '+4%' },
    { label: 'Citizens', value: kpis.citizens, icon: Users, trend: '+22%' },
    { label: 'Gov Users', value: kpis.governmentUsers, icon: Building, trend: '+1%' },
    { label: 'AI Requests Today', value: kpis.aiRequestsToday, icon: Cpu, trend: '+18%' },
    { label: 'Security Alerts', value: kpis.securityAlerts, icon: ShieldAlert, trend: '-2%', alert: true },
  ];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-slate-900">Platform Command Center</h2>
          <p className="text-slate-500 mt-1">Statewide ecosystem health, AI performance, and operational governance.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm font-medium px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
            Uptime: {kpis.platformUptime || '99.9%'}
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <div className={cn("p-2 rounded-md", stat.alert ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600")}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
                <span className={cn(
                  "text-xs font-semibold", 
                  stat.trend.startsWith('+') ? "text-emerald-600" : "text-emerald-600",
                  stat.alert && "text-red-600"
                )}>
                  {stat.trend}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ecosystem Funnel */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Ecosystem Innovation Funnel</h3>
            <select className="text-sm border-slate-200 rounded-md bg-slate-50 text-slate-700 py-1 pl-3 pr-8 outline-none">
              <option>All Districts</option>
              <option>Ranchi</option>
              <option>Dhanbad</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={funnel} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">System Health</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {health.map((svc) => (
              <div key={svc.service} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center">
                  <div className={cn(
                    "w-2 h-2 rounded-full mr-3",
                    svc.status === 'Healthy' ? "bg-emerald-500" :
                    svc.status === 'Degraded' ? "bg-amber-500" : "bg-red-500"
                  )} />
                  <span className="text-sm font-medium text-slate-700">{svc.service}</span>
                </div>
                <div className="flex items-center text-xs text-slate-500 font-mono">
                  {svc.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

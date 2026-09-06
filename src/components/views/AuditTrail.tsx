import React from 'react';
import { auditLogs as fallbackLogs } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { FileText, Search, Filter } from 'lucide-react';
import { useApi } from '../../lib/api';

export function AuditTrail() {
  const { data: logsData, loading } = useApi<any[]>('audit', fallbackLogs);
  const auditLogs = (logsData && logsData.length > 0) ? logsData : fallbackLogs;
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-slate-900">Complete Audit Trail</h2>
          <p className="text-slate-500 mt-1">Immutable ledger of all critical platform events and data modifications.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
            Export Logs
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1 min-h-0">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search audit events (ID, User, Entity)..." 
              className="pl-9 pr-4 py-1.5 w-80 text-sm bg-white border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span>Showing last 24 hours</span>
          </div>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_#e2e8f0]">
              <tr className="text-xs uppercase tracking-wider text-slate-500 font-semibold bg-slate-50">
                <th className="px-5 py-3 whitespace-nowrap">Timestamp</th>
                <th className="px-5 py-3 whitespace-nowrap">User</th>
                <th className="px-5 py-3 whitespace-nowrap">Role Context</th>
                <th className="px-5 py-3 whitespace-nowrap">Action</th>
                <th className="px-5 py-3 whitespace-nowrap">Target Entity</th>
                <th className="px-5 py-3 whitespace-nowrap">Result</th>
                <th className="px-5 py-3 text-right whitespace-nowrap">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">
                    2026-09-06 {log.time}
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-900 whitespace-nowrap">
                    {log.user}
                  </td>
                  <td className="px-5 py-3 text-slate-600 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-800 font-medium whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-600 whitespace-nowrap">
                    {log.entity}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider",
                      log.result === 'Success' ? "text-emerald-700 bg-emerald-50" :
                      log.result === 'Blocked' ? "text-red-700 bg-red-50" : "text-amber-700 bg-amber-50"
                    )}>
                      {log.result}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">Inspect JSON</button>
                  </td>
                </tr>
              ))}
              {/* Duplicate rows for visual density in demo */}
              {[...auditLogs, ...auditLogs].map((log, i) => (
                 <tr key={`${log.id}-dup-${i}`} className="hover:bg-slate-50 transition-colors opacity-80">
                  <td className="px-5 py-3 font-mono text-xs text-slate-400 whitespace-nowrap">
                    2026-09-06 {log.time}
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-700 whitespace-nowrap">{log.user}</td>
                  <td className="px-5 py-3 text-slate-500 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-700 font-medium whitespace-nowrap">{log.action}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">{log.entity}</td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider",
                      log.result === 'Success' ? "text-emerald-700/70 bg-emerald-50" :
                      log.result === 'Blocked' ? "text-red-700/70 bg-red-50" : "text-amber-700/70 bg-amber-50"
                    )}>
                      {log.result}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <button className="text-indigo-600/70 hover:text-indigo-800 text-xs font-medium">Inspect JSON</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm text-slate-500 shrink-0">
          <span>Showing 15 of 2,491 records</span>
          <div className="flex space-x-1">
            <button className="px-2 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100">Prev</button>
            <button className="px-2 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

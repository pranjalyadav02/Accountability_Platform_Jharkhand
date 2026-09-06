import React from 'react';
import { aiModels as fallbackModels, aiOverrides as fallbackOverrides } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { Brain, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { useApi } from '../../lib/api';

export function AIGovernance() {
  const { data: modelsData, loading: modelsLoading } = useApi<any[]>('ai/models', fallbackModels);
  const { data: overridesData, loading: overridesLoading } = useApi<any[]>('ai/overrides', fallbackOverrides);

  const aiModels = (modelsData && modelsData.length > 0) ? modelsData : fallbackModels;
  const aiOverrides = (overridesData && overridesData.length > 0) ? overridesData : fallbackOverrides;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-slate-900">AI Governance Center</h2>
          <p className="text-slate-500 mt-1">Monitor, evaluate, and audit AI systems powering the platform.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
          Deploy New Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Registry */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-slate-600" />
              <h3 className="text-base font-semibold text-slate-800">Model Registry</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-5 py-3">Model</th>
                  <th className="px-5 py-3">Version</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Accuracy</th>
                  <th className="px-5 py-3">Requests</th>
                  <th className="px-5 py-3">Overrides</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-sm">
                {aiModels.map((model) => (
                  <tr key={model.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-900">{model.name}</td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-600">v{model.version}</td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                        model.status === 'Production' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      )}>
                        {model.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-700 font-medium">{model.accuracy}</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-slate-800 rounded-full" 
                            style={{ width: model.accuracy }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{model.requests}</td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className={cn(
                        parseFloat(model.overrideRate) > 5 ? "text-amber-600 font-semibold" : ""
                      )}>
                        {model.overrideRate}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">Inspect</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Explainability & Alerts */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
              Active Warnings
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                <p className="text-sm font-medium text-amber-900">⚠ High Override Rate Detected</p>
                <p className="text-xs text-amber-700 mt-1">Industry Matching (v1.5) showing 12.1% manual override in Dhanbad district.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                <p className="text-sm font-medium text-slate-700 flex items-center">
                  <Activity className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  Model Drift Watch
                </p>
                <p className="text-xs text-slate-500 mt-1">Project Risk Engine (v1.3) confidence interval widening. Evaluation recommended.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-slate-600" />
                <h3 className="text-base font-semibold text-slate-800">Recent Overrides</h3>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[300px] p-4 space-y-4">
              {aiOverrides.map(override => (
                <div key={override.id} className="text-sm border-l-2 border-indigo-500 pl-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-slate-800">{override.model}</span>
                    <span className="text-xs text-slate-400">{override.time}</span>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 mt-2 text-xs">
                    <span className="text-slate-500 text-right">AI:</span>
                    <span className="line-through text-slate-400">{override.original}</span>
                    
                    <span className="text-slate-500 text-right">Human:</span>
                    <span className="font-medium text-indigo-700">{override.human}</span>
                    
                    <span className="text-slate-500 text-right">Reason:</span>
                    <span className="text-slate-600">{override.reason}</span>
                    
                    <span className="text-slate-500 text-right">By:</span>
                    <span className="text-slate-600">{override.reviewer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 rounded-lg p-5 border border-slate-800 flex items-start space-x-4 shadow-sm">
        <div className="bg-indigo-500/20 p-2 rounded-md shrink-0">
          <Brain className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h4 className="text-white font-medium text-sm">Governance Principle Enforced</h4>
          <p className="text-slate-400 text-sm mt-1">
            "AI recommends. Humans verify. Authorized officials decide." All AI classifications on this platform serve as 
            augmentations and remain fully auditable and overrideable by authorized district or state officers.
          </p>
        </div>
      </div>
    </div>
  );
}

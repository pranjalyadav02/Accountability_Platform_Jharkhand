import React from 'react';
import { users as fallbackUsers } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { Users, Search, Filter, Shield, MoreVertical } from 'lucide-react';
import { useApi } from '../../lib/api';

export function UserManagement() {
  const { data: usersData, loading } = useApi<any[]>('users', fallbackUsers);
  const users = (usersData && usersData.length > 0) ? usersData : fallbackUsers;
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-slate-900">Users & Roles</h2>
          <p className="text-slate-500 mt-1">Manage platform access, jurisdictions, and role-based permissions.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
          Provision User
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 shrink-0">
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-md">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Users</p>
            <p className="text-xl font-bold text-slate-900">86,914</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Verified Govt</p>
            <p className="text-xl font-bold text-slate-900">2,418</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pending Verification</p>
            <p className="text-xl font-bold text-slate-900">142</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-red-50 text-red-600 rounded-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Suspended</p>
            <p className="text-xl font-bold text-slate-900">38</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1 min-h-0">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="flex space-x-4 flex-1">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search users by name, ID, or jurisdiction..." 
                className="pl-9 pr-4 py-1.5 w-full text-sm bg-white border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>
            <select className="text-sm border border-slate-300 rounded-md bg-white text-slate-700 py-1.5 pl-3 pr-8 outline-none">
              <option>All Roles</option>
              <option>Government</option>
              <option>University</option>
              <option>Industry</option>
              <option>Administrators</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_#e2e8f0]">
              <tr className="text-xs uppercase tracking-wider text-slate-500 font-semibold bg-slate-50">
                <th className="px-5 py-3 whitespace-nowrap">User</th>
                <th className="px-5 py-3 whitespace-nowrap">Role</th>
                <th className="px-5 py-3 whitespace-nowrap">Organization</th>
                <th className="px-5 py-3 whitespace-nowrap">Jurisdiction</th>
                <th className="px-5 py-3 whitespace-nowrap">Status</th>
                <th className="px-5 py-3 whitespace-nowrap">Last Login</th>
                <th className="px-5 py-3 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{user.name}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{user.org}</td>
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{user.jurisdiction}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider",
                      user.status === 'Active' ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 font-mono whitespace-nowrap">{user.lastLogin}</td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

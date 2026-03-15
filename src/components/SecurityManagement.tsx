import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Shield, 
  Plus, 
  Lock, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  ShieldAlert,
  ShieldCheck,
  Fingerprint,
  Activity
} from 'lucide-react';
import { cn } from '../utils';

interface SecurityLog {
  id: string;
  event: string;
  user: string;
  status: 'Safe' | 'Warning' | 'Threat';
  ip: string;
  location: string;
  time: string;
}

const MOCK_LOGS: SecurityLog[] = [
  {
    id: 'SEC-001',
    event: 'Admin Login',
    user: 'Admin',
    status: 'Safe',
    ip: '192.168.1.1',
    location: 'London, UK',
    time: '2m ago'
  },
  {
    id: 'SEC-002',
    event: 'Failed Login Attempt',
    user: 'Unknown',
    status: 'Warning',
    ip: '45.12.33.1',
    location: 'Moscow, RU',
    time: '15m ago'
  },
  {
    id: 'SEC-003',
    event: 'SQL Injection Blocked',
    user: 'System',
    status: 'Threat',
    ip: '102.44.12.5',
    location: 'Unknown',
    time: '1h ago'
  }
];

export function SecurityManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = MOCK_LOGS.filter(l => 
    l.event.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: SecurityLog['status']) => {
    switch (status) {
      case 'Safe': return 'text-emerald-500 bg-emerald-500/10';
      case 'Warning': return 'text-amber-500 bg-amber-500/10';
      case 'Threat': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Security <span className="text-red-600">Center</span>
          </h2>
          <p className="text-slate-500 mt-1">Monitor system threats, audit user access, and manage global security protocols.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Audit Log
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Lock className="w-4 h-4" />
            Security Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Threats Blocked', value: '1,240', change: '+15%', icon: ShieldAlert, color: 'text-red-500' },
          { label: 'Security Score', value: '98.5', change: '+0.5%', icon: ShieldCheck, color: 'text-emerald-500' },
          { label: 'Active Sessions', value: '4,250', change: '+8%', icon: Activity, color: 'text-blue-500' },
          { label: 'Auth Audits', value: '156', change: '+2%', icon: Fingerprint, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--card-bg)] p-6 rounded-3xl border border-red-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl bg-slate-100 dark:bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">{stat.change}</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold dark:text-white mt-1 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-[var(--card-bg)] rounded-[2.5rem] border border-red-500/10 overflow-hidden">
        <div className="p-6 border-b border-red-500/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search security logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Events</option>
              <option>Safe</option>
              <option>Warning</option>
              <option>Threat</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Event</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredLogs.map((log) => (
                <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-red-600">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{log.event}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{log.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm dark:text-white">{log.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(log.status))}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p>{log.ip}</p>
                      <p>{log.location} • {log.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-slate-500/10 text-slate-400 rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Code, 
  Plus, 
  Key, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Zap,
  Globe,
  Database,
  Terminal
} from 'lucide-react';
import { cn } from '../utils';

interface APIEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'Active' | 'Deprecated' | 'Maintenance';
  latency: string;
  usage: string;
  lastCalled: string;
}

const MOCK_ENDPOINTS: APIEndpoint[] = [
  {
    id: 'API-001',
    path: '/v1/users',
    method: 'GET',
    status: 'Active',
    latency: '45ms',
    usage: '1.2M/day',
    lastCalled: '2s ago'
  },
  {
    id: 'API-002',
    path: '/v1/orders',
    method: 'POST',
    status: 'Active',
    latency: '120ms',
    usage: '450K/day',
    lastCalled: '15s ago'
  },
  {
    id: 'API-003',
    path: '/v1/legacy/auth',
    method: 'GET',
    status: 'Deprecated',
    latency: '250ms',
    usage: '12K/day',
    lastCalled: '1h ago'
  }
];

export function APIManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEndpoints = MOCK_ENDPOINTS.filter(e => 
    e.path.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: APIEndpoint['status']) => {
    switch (status) {
      case 'Active': return 'text-emerald-500 bg-emerald-500/10';
      case 'Deprecated': return 'text-amber-500 bg-amber-500/10';
      case 'Maintenance': return 'text-red-500 bg-red-500/10';
    }
  };

  const getMethodColor = (method: APIEndpoint['method']) => {
    switch (method) {
      case 'GET': return 'text-blue-500';
      case 'POST': return 'text-emerald-500';
      case 'PUT': return 'text-amber-500';
      case 'DELETE': return 'text-red-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            API <span className="text-red-600">Management</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage endpoints, monitor latency, and audit global API usage.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Terminal className="w-4 h-4" />
            API Docs
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Endpoint
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Requests', value: '12.4M', change: '+15%', icon: Zap, color: 'text-blue-500' },
          { label: 'Avg. Latency', value: '84ms', change: '-5%', icon: Activity, color: 'text-emerald-500' },
          { label: 'Active Keys', value: '1,240', change: '+8%', icon: Key, color: 'text-amber-500' },
          { label: 'Uptime', value: '99.99%', change: '+0.01%', icon: Globe, color: 'text-red-500' },
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
              placeholder="Search endpoints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Methods</option>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Endpoint</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Performance</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Usage</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredEndpoints.map((endpoint) => (
                <motion.tr key={endpoint.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-red-600">
                        <Code className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">
                          <span className={cn("mr-2 font-mono", getMethodColor(endpoint.method))}>{endpoint.method}</span>
                          {endpoint.path}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">{endpoint.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(endpoint.status))}>
                      {endpoint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p className="font-bold dark:text-white">{endpoint.latency}</p>
                      <p>Last called: {endpoint.lastCalled}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm dark:text-white">
                      <Database className="w-3 h-3 text-red-600" />
                      {endpoint.usage}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Activity className="w-4 h-4" /></button>
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

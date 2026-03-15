import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  LifeBuoy, 
  Plus, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  UserCheck,
  Headphones,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../utils';

interface Ticket {
  id: string;
  subject: string;
  customer: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  agent: string;
  lastUpdate: string;
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Cannot access billing portal',
    customer: 'Alex Johnson',
    status: 'Open',
    priority: 'High',
    agent: 'Unassigned',
    lastUpdate: '2m ago'
  },
  {
    id: 'TKT-002',
    subject: 'API Integration Issue',
    customer: 'TechFlow Solutions',
    status: 'In Progress',
    priority: 'Medium',
    agent: 'Sarah Jenkins',
    lastUpdate: '1h ago'
  },
  {
    id: 'TKT-003',
    subject: 'Password Reset Request',
    customer: 'Maria Garcia',
    status: 'Resolved',
    priority: 'Low',
    agent: 'Mike Ross',
    lastUpdate: '3h ago'
  }
];

export function SupportManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = MOCK_TICKETS.filter(t => 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return 'text-red-500 bg-red-500/10';
      case 'In Progress': return 'text-amber-500 bg-amber-500/10';
      case 'Resolved': return 'text-emerald-500 bg-emerald-500/10';
      case 'Closed': return 'text-slate-500 bg-slate-500/10';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-amber-600';
      case 'Low': return 'text-emerald-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Support <span className="text-red-600">System</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage customer tickets, track agent performance, and optimize resolution times.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Tickets
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Open Tickets', value: '156', change: '+12%', icon: MessageSquare, color: 'text-red-500' },
          { label: 'Active Agents', value: '42', change: '+5%', icon: UserCheck, color: 'text-blue-500' },
          { label: 'Avg. Resolution', value: '4.2h', change: '-15%', icon: Clock, color: 'text-emerald-500' },
          { label: 'CSAT Score', value: '4.8/5', change: '+0.2%', icon: ShieldCheck, color: 'text-amber-500' },
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
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Ticket</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Agent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredTickets.map((ticket) => (
                <motion.tr key={ticket.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-red-600">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{ticket.subject}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{ticket.id} • <span className={getPriorityColor(ticket.priority)}>{ticket.priority}</span></p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm dark:text-white">{ticket.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(ticket.status))}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p className="font-bold dark:text-white">{ticket.agent}</p>
                      <p>Updated: {ticket.lastUpdate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><MessageSquare className="w-4 h-4" /></button>
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

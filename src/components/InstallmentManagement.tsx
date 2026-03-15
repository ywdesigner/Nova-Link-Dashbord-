import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  CreditCard, 
  Plus, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  DollarSign,
  PieChart,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../utils';

interface Installment {
  id: string;
  customer: string;
  totalAmount: string;
  paidAmount: string;
  remainingAmount: string;
  status: 'On Track' | 'Overdue' | 'Completed';
  nextPayment: string;
  progress: number;
}

const MOCK_INSTALLMENTS: Installment[] = [
  {
    id: 'INS-8821',
    customer: 'Alice Cooper',
    totalAmount: '$5,000.00',
    paidAmount: '$2,500.00',
    remainingAmount: '$2,500.00',
    status: 'On Track',
    nextPayment: 'Apr 15, 2026',
    progress: 50
  },
  {
    id: 'INS-8822',
    customer: 'Bob Marley',
    totalAmount: '$12,000.00',
    paidAmount: '$12,000.00',
    remainingAmount: '$0.00',
    status: 'Completed',
    nextPayment: 'N/A',
    progress: 100
  },
  {
    id: 'INS-8823',
    customer: 'Charlie Brown',
    totalAmount: '$2,500.00',
    paidAmount: '$500.00',
    remainingAmount: '$2,000.00',
    status: 'Overdue',
    nextPayment: 'Mar 10, 2026',
    progress: 20
  }
];

export function InstallmentManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInstallments = MOCK_INSTALLMENTS.filter(i => 
    i.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Installment['status']) => {
    switch (status) {
      case 'On Track': return 'text-emerald-500 bg-emerald-500/10';
      case 'Overdue': return 'text-red-500 bg-red-500/10';
      case 'Completed': return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Installment <span className="text-red-600">System</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage payment plans, track installments, and handle overdue accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Ledger
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Financed', value: '$12.8M', change: '+12%', icon: DollarSign, color: 'text-blue-500' },
          { label: 'Active Plans', value: '4,250', change: '+5%', icon: CreditCard, color: 'text-red-500' },
          { label: 'Collection Rate', value: '98.5%', change: '+0.2%', icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Overdue Amount', value: '$45,200', change: '-15%', icon: AlertCircle, color: 'text-amber-500' },
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
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Status</option>
              <option>On Track</option>
              <option>Overdue</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Plan Progress</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Next Payment</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredInstallments.map((inst) => (
                <motion.tr key={inst.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold dark:text-white text-sm">{inst.customer}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{inst.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[200px]">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold">
                        <span>{inst.paidAmount} / {inst.totalAmount}</span>
                        <span>{inst.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className={cn("h-full transition-all", inst.status === 'Overdue' ? 'bg-red-500' : 'bg-emerald-500')} style={{ width: `${inst.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(inst.status))}>
                      {inst.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Calendar className="w-3 h-3 text-red-600" />
                      {inst.nextPayment}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><ArrowUpRight className="w-4 h-4" /></button>
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

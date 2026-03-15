import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface Transaction {
  id: string;
  customer: string;
  amount: string;
  status: 'Success' | 'Pending' | 'Failed';
  type: 'Inbound' | 'Outbound';
  method: string;
  date: string;
  avatar: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-9921',
    customer: 'TechFlow Solutions',
    amount: '$12,450.00',
    status: 'Success',
    type: 'Inbound',
    method: 'Bank Transfer',
    date: 'Mar 15, 2026',
    avatar: 'https://picsum.photos/seed/tech/100/100'
  },
  {
    id: 'TXN-9920',
    customer: 'Sarah Williams',
    amount: '$450.50',
    status: 'Success',
    type: 'Inbound',
    method: 'Credit Card',
    date: 'Mar 15, 2026',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 'TXN-9919',
    customer: 'Global Logistics',
    amount: '$2,890.00',
    status: 'Pending',
    type: 'Outbound',
    method: 'PayPal',
    date: 'Mar 14, 2026',
    avatar: 'https://picsum.photos/seed/logistics/100/100'
  },
  {
    id: 'TXN-9918',
    customer: 'Michael Brown',
    amount: '$120.00',
    status: 'Failed',
    type: 'Inbound',
    method: 'Apple Pay',
    date: 'Mar 14, 2026',
    avatar: 'https://picsum.photos/seed/michael/100/100'
  },
  {
    id: 'TXN-9917',
    customer: 'EcoEnergy Systems',
    amount: '$8,500.00',
    status: 'Success',
    type: 'Inbound',
    method: 'Crypto',
    date: 'Mar 13, 2026',
    avatar: 'https://picsum.photos/seed/energy/100/100'
  }
];

export function PaymentManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredTransactions = MOCK_TRANSACTIONS.filter(txn => {
    const matchesSearch = txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || txn.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Success': return 'text-emerald-500 bg-emerald-500/10';
      case 'Pending': return 'text-amber-500 bg-amber-500/10';
      case 'Failed': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            {t('payments')} <span className="text-red-600">Gateway</span>
          </h2>
          <p className="text-slate-500 mt-1">Monitor global transactions, manage payouts, and handle financial disputes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Wallet className="w-4 h-4" />
            Initiate Payout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$12.8M', change: '+24%', icon: DollarSign, color: 'text-emerald-500' },
          { label: 'Active Payouts', value: '$1.2M', change: '+5%', icon: ArrowUpRight, color: 'text-blue-500' },
          { label: 'Failed TXNs', value: '12', change: '-8%', icon: AlertCircle, color: 'text-red-500' },
          { label: 'Security Score', value: '99.8', change: '+0.2%', icon: ShieldCheck, color: 'text-indigo-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--card-bg)] p-6 rounded-3xl border border-red-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl bg-slate-100 dark:bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold dark:text-white mt-1 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-[var(--card-bg)] rounded-[2.5rem] border border-red-500/10 overflow-hidden">
        <div className="p-6 border-b border-red-500/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by transaction ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Transaction</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Method</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredTransactions.map((txn) => (
                <motion.tr 
                  key={txn.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-red-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={txn.avatar} 
                        alt={txn.customer} 
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-500/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold dark:text-white text-sm">{txn.customer}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{txn.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {txn.type === 'Inbound' ? (
                        <ArrowDownLeft className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3 text-red-500" />
                      )}
                      <span className={cn(
                        "text-sm font-bold",
                        txn.type === 'Inbound' ? "text-emerald-500" : "text-red-500"
                      )}>
                        {txn.amount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(txn.status)
                    )}>
                      {txn.status === 'Success' ? <CheckCircle2 className="w-3 h-3" /> : 
                       txn.status === 'Pending' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <CreditCard className="w-3 h-3" />
                      <span className="text-sm">{txn.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{txn.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-500/10 text-slate-400 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-red-500/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Globe className="w-4 h-4 text-red-600" />
            Global Financial Network v4.2
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Previous</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white text-sm font-bold">1</button>
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

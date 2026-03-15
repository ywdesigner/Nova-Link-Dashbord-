import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Zap, 
  CreditCard, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Plus,
  ArrowUpRight,
  Shield,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface Subscription {
  id: string;
  customer: string;
  plan: 'Enterprise' | 'Professional' | 'Starter';
  status: 'Active' | 'Past Due' | 'Canceled';
  amount: string;
  billingCycle: 'Monthly' | 'Annual';
  nextBilling: string;
  avatar: string;
}

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'SUB-001',
    customer: 'Acme Corp',
    plan: 'Enterprise',
    status: 'Active',
    amount: '$2,499.00',
    billingCycle: 'Annual',
    nextBilling: 'Oct 12, 2026',
    avatar: 'https://picsum.photos/seed/acme/100/100'
  },
  {
    id: 'SUB-002',
    customer: 'Global Tech',
    plan: 'Professional',
    status: 'Active',
    amount: '$499.00',
    billingCycle: 'Monthly',
    nextBilling: 'Apr 05, 2026',
    avatar: 'https://picsum.photos/seed/global/100/100'
  },
  {
    id: 'SUB-003',
    customer: 'Creative Studio',
    plan: 'Starter',
    status: 'Past Due',
    amount: '$99.00',
    billingCycle: 'Monthly',
    nextBilling: 'Mar 10, 2026',
    avatar: 'https://picsum.photos/seed/creative/100/100'
  },
  {
    id: 'SUB-004',
    customer: 'Future Systems',
    plan: 'Enterprise',
    status: 'Active',
    amount: '$2,499.00',
    billingCycle: 'Annual',
    nextBilling: 'Jan 20, 2027',
    avatar: 'https://picsum.photos/seed/future/100/100'
  },
  {
    id: 'SUB-005',
    customer: 'Urban Design',
    plan: 'Professional',
    status: 'Canceled',
    amount: '$499.00',
    billingCycle: 'Monthly',
    nextBilling: 'N/A',
    avatar: 'https://picsum.photos/seed/urban/100/100'
  }
];

export function SubscriptionManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredSubscriptions = MOCK_SUBSCRIPTIONS.filter(sub => {
    const matchesSearch = sub.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         sub.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = selectedPlan === 'All' || sub.plan === selectedPlan;
    const matchesStatus = selectedStatus === 'All' || sub.status === selectedStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getStatusColor = (status: Subscription['status']) => {
    switch (status) {
      case 'Active': return 'text-emerald-500 bg-emerald-500/10';
      case 'Past Due': return 'text-amber-500 bg-amber-500/10';
      case 'Canceled': return 'text-red-500 bg-red-500/10';
    }
  };

  const getPlanColor = (plan: Subscription['plan']) => {
    switch (plan) {
      case 'Enterprise': return 'text-red-600 bg-red-600/10';
      case 'Professional': return 'text-blue-600 bg-blue-600/10';
      case 'Starter': return 'text-slate-600 bg-slate-600/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            {t('subscription')} <span className="text-red-600">Control</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage recurring billing, plans, and subscription lifecycle.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            Create Plan
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Revenue', value: '$842,100', change: '+15%', icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Active Subs', value: '12,450', change: '+8%', icon: Zap, color: 'text-red-500' },
          { label: 'Churn Rate', value: '1.2%', change: '-0.4%', icon: RefreshCw, color: 'text-blue-500' },
          { label: 'Avg. LTV', value: '$4,200', change: '+12%', icon: Users, color: 'text-amber-500' },
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
              placeholder="Search by customer or subscription ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
              >
                <option value="All">All Plans</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Professional">Professional</option>
                <option value="Starter">Starter</option>
              </select>
            </div>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Past Due">Past Due</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Plan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Next Billing</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredSubscriptions.map((sub) => (
                <motion.tr 
                  key={sub.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-red-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={sub.avatar} 
                        alt={sub.customer} 
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-500/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold dark:text-white text-sm">{sub.customer}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{sub.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                      getPlanColor(sub.plan)
                    )}>
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(sub.status)
                    )}>
                      {sub.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : 
                       sub.status === 'Past Due' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {sub.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold dark:text-white">{sub.amount}</p>
                      <p className="text-[10px] text-slate-500 uppercase">{sub.billingCycle}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{sub.nextBilling}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors" title="View Details">
                        <ArrowUpRight className="w-4 h-4" />
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
            <Shield className="w-4 h-4 text-red-600" />
            PCI-DSS Compliant Billing
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

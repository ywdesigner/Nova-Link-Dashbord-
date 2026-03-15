import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Megaphone, 
  Plus, 
  TrendingUp, 
  BarChart3, 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Eye,
  MousePointer2,
  DollarSign
} from 'lucide-react';
import { cn } from '../utils';

interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed';
  budget: string;
  spent: string;
  impressions: string;
  clicks: string;
  ctr: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'CMP-2021',
    name: 'Summer Sale 2026',
    status: 'Active',
    budget: '$50,000',
    spent: '$12,450',
    impressions: '1.2M',
    clicks: '45K',
    ctr: '3.75%'
  },
  {
    id: 'CMP-2022',
    name: 'Product Launch X',
    status: 'Paused',
    budget: '$100,000',
    spent: '$85,000',
    impressions: '2.5M',
    clicks: '120K',
    ctr: '4.8%'
  },
  {
    id: 'CMP-2023',
    name: 'Brand Awareness',
    status: 'Completed',
    budget: '$20,000',
    spent: '$20,000',
    impressions: '800K',
    clicks: '12K',
    ctr: '1.5%'
  }
];

export function AdvertisingManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = MOCK_CAMPAIGNS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'Active': return 'text-emerald-500 bg-emerald-500/10';
      case 'Paused': return 'text-amber-500 bg-amber-500/10';
      case 'Completed': return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Advertising <span className="text-red-600">System</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage ad campaigns, track performance, and optimize marketing spend.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Analytics
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            Create Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Reach', value: '12.4M', change: '+24%', icon: Eye, color: 'text-blue-500' },
          { label: 'Total Clicks', value: '842K', change: '+18%', icon: MousePointer2, color: 'text-red-500' },
          { label: 'Avg. CTR', value: '3.2%', change: '+0.5%', icon: Target, color: 'text-emerald-500' },
          { label: 'Ad Spend', value: '$1.2M', change: '+12%', icon: DollarSign, color: 'text-amber-500' },
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
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Status</option>
              <option>Active</option>
              <option>Paused</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Campaign</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Budget/Spent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Performance</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredCampaigns.map((campaign) => (
                <motion.tr key={campaign.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-red-600">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{campaign.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{campaign.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(campaign.status))}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p className="font-bold dark:text-white">{campaign.spent} / {campaign.budget}</p>
                      <div className="w-24 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-red-600" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p>{campaign.impressions} Imp • {campaign.clicks} Clicks</p>
                      <p className="font-bold text-emerald-500">{campaign.ctr} CTR</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><BarChart3 className="w-4 h-4" /></button>
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

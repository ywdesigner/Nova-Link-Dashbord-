import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Building2, 
  Plus, 
  Globe, 
  Users, 
  BarChart3, 
  MapPin, 
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MoreVertical,
  Download,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface Company {
  id: string;
  name: string;
  industry: string;
  status: 'Verified' | 'Pending' | 'Flagged';
  employees: string;
  revenue: string;
  location: string;
  website: string;
  logo: string;
}

const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    industry: 'Software',
    status: 'Verified',
    employees: '1,200+',
    revenue: '$45M',
    location: 'San Francisco, USA',
    website: 'techflow.io',
    logo: 'https://picsum.photos/seed/tech/100/100'
  },
  {
    id: '2',
    name: 'Global Logistics Co.',
    industry: 'Supply Chain',
    status: 'Verified',
    employees: '5,500+',
    revenue: '$120M',
    location: 'Rotterdam, NL',
    website: 'globallogistics.com',
    logo: 'https://picsum.photos/seed/logistics/100/100'
  },
  {
    id: '3',
    name: 'EcoEnergy Systems',
    industry: 'Renewables',
    status: 'Pending',
    employees: '450',
    revenue: '$12M',
    location: 'Berlin, Germany',
    website: 'ecoenergy.de',
    logo: 'https://picsum.photos/seed/energy/100/100'
  },
  {
    id: '4',
    name: 'Nova Retail Group',
    industry: 'E-commerce',
    status: 'Flagged',
    employees: '2,800',
    revenue: '$85M',
    location: 'London, UK',
    website: 'novaretail.co.uk',
    logo: 'https://picsum.photos/seed/retail/100/100'
  },
  {
    id: '5',
    name: 'HealthSync AI',
    industry: 'Healthcare',
    status: 'Verified',
    employees: '150',
    revenue: '$8M',
    location: 'Toronto, Canada',
    website: 'healthsync.ai',
    logo: 'https://picsum.photos/seed/health/100/100'
  }
];

export function CompanyManagement() {
  const { t, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredCompanies = MOCK_COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || company.industry === selectedIndustry;
    const matchesStatus = selectedStatus === 'All' || company.status === selectedStatus;
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const getStatusColor = (status: Company['status']) => {
    switch (status) {
      case 'Verified': return 'text-emerald-500 bg-emerald-500/10';
      case 'Pending': return 'text-amber-500 bg-amber-500/10';
      case 'Flagged': return 'text-red-500 bg-red-500/10';
    }
  };

  const getStatusIcon = (status: Company['status']) => {
    switch (status) {
      case 'Verified': return <CheckCircle2 className="w-3 h-3" />;
      case 'Pending': return <Clock className="w-3 h-3" />;
      case 'Flagged': return <AlertTriangle className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            {t('companies')} <span className="text-red-600">Directory</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage corporate partners, enterprise accounts, and business verification.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            Register Company
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Companies', value: '45,201', change: '+5.2%', icon: Building2, color: 'text-blue-500' },
          { label: 'Active Partners', value: '38,140', change: '+8.1%', icon: Briefcase, color: 'text-emerald-500' },
          { label: 'Pending Verification', value: '1,240', change: '-12%', icon: Clock, color: 'text-amber-500' },
          { label: 'Total Revenue', value: '$12.8B', change: '+24%', icon: DollarSign, color: 'text-red-500' },
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
              placeholder="Search by company name or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
              >
                <option value="All">All Industries</option>
                <option value="Software">Software</option>
                <option value="Healthcare">Healthcare</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Renewables">Renewables</option>
              </select>
            </div>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
            >
              <option value="All">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Industry</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Scale</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredCompanies.map((company) => (
                <motion.tr 
                  key={company.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-red-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-500/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold dark:text-white text-sm">{company.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Globe className="w-3 h-3" />
                          {company.website}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium dark:text-white">{company.industry}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(company.status)
                    )}>
                      {getStatusIcon(company.status)}
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Users className="w-3 h-3" />
                      <span className="text-sm">{company.employees}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                      <BarChart3 className="w-3 h-3" />
                      <span className="text-sm">{company.revenue}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors" title="View Details">
                        <ExternalLink className="w-4 h-4" />
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
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="w-4 h-4" />
            <span>Global Corporate Network v2.4</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white text-sm font-bold shadow-lg shadow-red-600/20">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-sm font-bold dark:text-white transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-sm font-bold dark:text-white transition-colors">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

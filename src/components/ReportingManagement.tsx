import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  BarChart3, 
  Plus, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  PieChart,
  LineChart,
  Calendar
} from 'lucide-react';
import { cn } from '../utils';

interface Report {
  id: string;
  name: string;
  type: 'Financial' | 'Operational' | 'User Growth';
  status: 'Ready' | 'Generating' | 'Failed';
  date: string;
  format: 'PDF' | 'CSV' | 'XLSX';
  size: string;
}

const MOCK_REPORTS: Report[] = [
  {
    id: 'REP-001',
    name: 'Q1 Financial Summary',
    type: 'Financial',
    status: 'Ready',
    date: 'Mar 15, 2026',
    format: 'PDF',
    size: '2.4 MB'
  },
  {
    id: 'REP-002',
    name: 'User Engagement Audit',
    type: 'User Growth',
    status: 'Generating',
    date: 'Mar 15, 2026',
    format: 'CSV',
    size: '0 KB'
  },
  {
    id: 'REP-003',
    name: 'System Performance Log',
    type: 'Operational',
    status: 'Ready',
    date: 'Mar 14, 2026',
    format: 'XLSX',
    size: '12.8 MB'
  }
];

export function ReportingManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = MOCK_REPORTS.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'Ready': return 'text-emerald-500 bg-emerald-500/10';
      case 'Generating': return 'text-amber-500 bg-amber-500/10';
      case 'Failed': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Reporting <span className="text-red-600">System</span>
          </h2>
          <p className="text-slate-500 mt-1">Generate analytics, export data, and monitor system-wide performance metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Bulk Export
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Reports Generated', value: '12,450', change: '+15%', icon: FileText, color: 'text-blue-500' },
          { label: 'Active Tasks', value: '12', change: '+2%', icon: Clock, color: 'text-amber-500' },
          { label: 'Data Processed', value: '12.8 TB', change: '+24%', icon: BarChart3, color: 'text-red-500' },
          { label: 'Accuracy', value: '99.9%', change: '+0.1%', icon: CheckCircle2, color: 'text-emerald-500' },
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
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Types</option>
              <option>Financial</option>
              <option>Operational</option>
              <option>User Growth</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Report Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredReports.map((report) => (
                <motion.tr key={report.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-red-600">
                        {report.type === 'Financial' ? <PieChart className="w-5 h-5" /> : report.type === 'Operational' ? <BarChart3 className="w-5 h-5" /> : <LineChart className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{report.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500">{report.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(report.status))}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p>{report.date}</p>
                      <p>{report.format} • {report.size}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
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

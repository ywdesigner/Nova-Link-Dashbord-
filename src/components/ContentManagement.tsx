import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  FileText, 
  Plus, 
  Layout, 
  Image as ImageIcon, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Eye,
  Edit2,
  Globe,
  Layers
} from 'lucide-react';
import { cn } from '../utils';

interface ContentItem {
  id: string;
  title: string;
  type: 'Article' | 'Page' | 'Media';
  status: 'Published' | 'Draft' | 'Archived';
  author: string;
  lastModified: string;
  views: string;
}

const MOCK_CONTENT: ContentItem[] = [
  {
    id: 'CNT-001',
    title: 'LinkNova System Overview',
    type: 'Article',
    status: 'Published',
    author: 'Admin',
    lastModified: 'Mar 12, 2026',
    views: '12.4K'
  },
  {
    id: 'CNT-002',
    title: 'Landing Page v2',
    type: 'Page',
    status: 'Draft',
    author: 'Design Team',
    lastModified: 'Mar 15, 2026',
    views: '0'
  },
  {
    id: 'CNT-003',
    title: 'Corporate Branding Kit',
    type: 'Media',
    status: 'Published',
    author: 'Marketing',
    lastModified: 'Mar 10, 2026',
    views: '4.2K'
  }
];

export function ContentManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = MOCK_CONTENT.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'Published': return 'text-emerald-500 bg-emerald-500/10';
      case 'Draft': return 'text-amber-500 bg-amber-500/10';
      case 'Archived': return 'text-slate-500 bg-slate-500/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Content <span className="text-red-600">Management</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage articles, pages, and media assets across the LinkNova ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Assets
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            Create Content
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Articles', value: '1,240', change: '+12%', icon: FileText, color: 'text-blue-500' },
          { label: 'Media Assets', value: '8,450', change: '+5%', icon: ImageIcon, color: 'text-emerald-500' },
          { label: 'Active Pages', value: '156', change: '+2%', icon: Layout, color: 'text-red-500' },
          { label: 'Global Reach', value: '4.2M', change: '+18%', icon: Globe, color: 'text-amber-500' },
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
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Types</option>
              <option>Article</option>
              <option>Page</option>
              <option>Media</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Content</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Modified</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredContent.map((item) => (
                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-red-600">
                        {item.type === 'Article' ? <FileText className="w-5 h-5" /> : item.type === 'Page' ? <Layout className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{item.title}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{item.id} • {item.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500">{item.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(item.status))}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p>{item.lastModified}</p>
                      <p className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
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

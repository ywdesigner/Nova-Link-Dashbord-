import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  File, 
  Plus, 
  Folder, 
  Image, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Upload,
  HardDrive,
  Trash2,
  Share2
} from 'lucide-react';
import { cn } from '../utils';

interface FileItem {
  id: string;
  name: string;
  type: 'Image' | 'Document' | 'Archive' | 'Video';
  status: 'Stored' | 'Syncing' | 'Failed';
  size: string;
  owner: string;
  lastModified: string;
}

const MOCK_FILES: FileItem[] = [
  {
    id: 'FILE-001',
    name: 'Brand_Identity_v2.pdf',
    type: 'Document',
    status: 'Stored',
    size: '12.4 MB',
    owner: 'Sarah Jenkins',
    lastModified: '2h ago'
  },
  {
    id: 'FILE-002',
    name: 'Product_Shoot_01.jpg',
    type: 'Image',
    status: 'Syncing',
    size: '4.2 MB',
    owner: 'Mike Ross',
    lastModified: '5m ago'
  },
  {
    id: 'FILE-003',
    name: 'Q1_Backup.zip',
    type: 'Archive',
    status: 'Stored',
    size: '1.2 GB',
    owner: 'System',
    lastModified: '1d ago'
  }
];

export function FileManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = MOCK_FILES.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: FileItem['status']) => {
    switch (status) {
      case 'Stored': return 'text-emerald-500 bg-emerald-500/10';
      case 'Syncing': return 'text-amber-500 bg-amber-500/10';
      case 'Failed': return 'text-red-500 bg-red-500/10';
    }
  };

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'Image': return <Image className="w-5 h-5" />;
      case 'Document': return <FileText className="w-5 h-5" />;
      case 'Archive': return <Folder className="w-5 h-5" />;
      case 'Video': return <File className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            File <span className="text-red-600">Management</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage global assets, monitor storage usage, and audit file access.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Download All
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Files', value: '45,240', change: '+12%', icon: File, color: 'text-blue-500' },
          { label: 'Storage Used', value: '1.2 TB', change: '+5%', icon: HardDrive, color: 'text-red-500' },
          { label: 'Syncing', value: '12', change: '-2%', icon: Clock, color: 'text-amber-500' },
          { label: 'Shared Files', value: '1,240', change: '+8%', icon: Share2, color: 'text-emerald-500' },
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
          <div className="relative flex-1 max-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Types</option>
              <option>Image</option>
              <option>Document</option>
              <option>Archive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">File Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredFiles.map((file) => (
                <motion.tr key={file.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-red-600">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{file.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{file.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500">{file.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(file.status))}>
                      {file.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p className="font-bold dark:text-white">{file.size}</p>
                      <p>{file.owner} • {file.lastModified}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
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

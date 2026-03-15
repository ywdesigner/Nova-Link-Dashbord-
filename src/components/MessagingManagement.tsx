import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Plus, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Send,
  User,
  Hash,
  ShieldAlert
} from 'lucide-react';
import { cn } from '../utils';

interface Conversation {
  id: string;
  user: string;
  lastMessage: string;
  status: 'Online' | 'Offline' | 'Away';
  unread: number;
  time: string;
  avatar: string;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'MSG-001',
    user: 'Alice Cooper',
    lastMessage: 'The system update is complete.',
    status: 'Online',
    unread: 2,
    time: '2m ago',
    avatar: 'https://picsum.photos/seed/alice/100/100'
  },
  {
    id: 'MSG-002',
    user: 'Bob Marley',
    lastMessage: 'Can we schedule a meeting?',
    status: 'Away',
    unread: 0,
    time: '1h ago',
    avatar: 'https://picsum.photos/seed/bob/100/100'
  },
  {
    id: 'MSG-003',
    user: 'Charlie Brown',
    lastMessage: 'I need help with the API.',
    status: 'Offline',
    unread: 5,
    time: '3h ago',
    avatar: 'https://picsum.photos/seed/charlie/100/100'
  }
];

export function MessagingManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = MOCK_CONVERSATIONS.filter(c => 
    c.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Conversation['status']) => {
    switch (status) {
      case 'Online': return 'bg-emerald-500';
      case 'Away': return 'bg-amber-500';
      case 'Offline': return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Messaging <span className="text-red-600">System</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage real-time communications, user presence, and notification channels.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Chats
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Message
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Messages', value: '1.2M', change: '+15%', icon: MessageSquare, color: 'text-blue-500' },
          { label: 'Active Users', value: '4,250', change: '+8%', icon: Users, color: 'text-emerald-500' },
          { label: 'Channels', value: '156', change: '+2%', icon: Hash, color: 'text-red-500' },
          { label: 'Security Alerts', value: '0', change: '0%', icon: ShieldAlert, color: 'text-amber-500' },
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
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Status</option>
              <option>Online</option>
              <option>Away</option>
              <option>Offline</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Last Message</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredConversations.map((conv) => (
                <motion.tr key={conv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={conv.avatar} alt={conv.user} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                        <div className={cn("absolute -bottom-1 -right-1 w-3 h-3 border-2 border-[var(--card-bg)] rounded-full", getStatusColor(conv.status))}></div>
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{conv.user}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{conv.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-slate-500 truncate max-w-[200px]">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500">{conv.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500">{conv.time}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Send className="w-4 h-4" /></button>
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

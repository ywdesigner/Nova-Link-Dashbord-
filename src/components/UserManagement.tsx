import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  Users,
  Zap,
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Trash2,
  Edit2,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
  status: 'Active' | 'Inactive' | 'Suspended';
  lastActive: string;
  avatar: string;
  location: string;
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@linknova.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 mins ago',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    location: 'London, UK'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@linknova.com',
    role: 'Manager',
    status: 'Active',
    lastActive: '15 mins ago',
    avatar: 'https://picsum.photos/seed/michael/100/100',
    location: 'Singapore'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.r@linknova.com',
    role: 'User',
    status: 'Inactive',
    lastActive: '2 days ago',
    avatar: 'https://picsum.photos/seed/elena/100/100',
    location: 'Madrid, Spain'
  },
  {
    id: '4',
    name: 'David Smith',
    email: 'd.smith@linknova.com',
    role: 'User',
    status: 'Suspended',
    lastActive: '1 month ago',
    avatar: 'https://picsum.photos/seed/david/100/100',
    location: 'New York, USA'
  },
  {
    id: '5',
    name: 'Aisha Khan',
    email: 'aisha.k@linknova.com',
    role: 'Manager',
    status: 'Active',
    lastActive: 'Now',
    avatar: 'https://picsum.photos/seed/aisha/100/100',
    location: 'Dubai, UAE'
  }
];

export function UserManagement() {
  const { t, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active': return 'text-emerald-500 bg-emerald-500/10';
      case 'Inactive': return 'text-slate-500 bg-slate-500/10';
      case 'Suspended': return 'text-red-500 bg-red-500/10';
    }
  };

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'Active': return <CheckCircle2 className="w-3 h-3" />;
      case 'Inactive': return <XCircle className="w-3 h-3" />;
      case 'Suspended': return <AlertCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            {t('users')} <span className="text-red-600">Management</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage global access, roles, and security permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <UserPlus className="w-4 h-4" />
            Add New User
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '2,452,108', change: '+12%', icon: Users, color: 'text-blue-500' },
          { label: 'Active Now', value: '45,201', change: '+5%', icon: Zap, color: 'text-emerald-500' },
          { label: 'New This Week', value: '12,840', change: '+18%', icon: UserPlus, color: 'text-red-500' },
          { label: 'Security Alerts', value: '14', change: '-24%', icon: Shield, color: 'text-amber-500' },
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

      {/* Filters & Table Section */}
      <div className="bg-[var(--card-bg)] rounded-[2.5rem] border border-red-500/10 overflow-hidden">
        <div className="p-6 border-b border-red-500/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
            </div>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Last Active</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredUsers.map((user) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-red-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-500/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold dark:text-white text-sm">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield className={cn(
                        "w-4 h-4",
                        user.role === 'Admin' ? 'text-red-500' : 
                        user.role === 'Manager' ? 'text-blue-500' : 'text-slate-400'
                      )} />
                      <span className="text-sm font-medium dark:text-white">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(user.status)
                    )}>
                      {getStatusIcon(user.status)}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{user.lastActive}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-sm">{user.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors" title="Edit User">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-amber-500/10 text-amber-500 rounded-lg transition-colors" title="Lock Account">
                        <Lock className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors" title="Delete User">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-red-500/10 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold dark:text-white">{filteredUsers.length}</span> of <span className="font-bold dark:text-white">{MOCK_USERS.length}</span> users
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors disabled:opacity-50" disabled>Previous</button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white text-sm font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-sm font-bold dark:text-white transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-sm font-bold dark:text-white transition-colors">3</button>
            </div>
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

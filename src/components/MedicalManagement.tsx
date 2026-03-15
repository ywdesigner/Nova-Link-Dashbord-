import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Activity, 
  Plus, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Heart,
  Stethoscope,
  Clipboard,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: 'Stable' | 'Critical' | 'Recovering';
  lastVisit: string;
  doctor: string;
  avatar: string;
}

const MOCK_PATIENTS: Patient[] = [
  {
    id: 'PAT-1021',
    name: 'James Wilson',
    age: 45,
    gender: 'Male',
    status: 'Stable',
    lastVisit: 'Mar 12, 2026',
    doctor: 'Dr. Sarah Smith',
    avatar: 'https://picsum.photos/seed/james/100/100'
  },
  {
    id: 'PAT-1022',
    name: 'Maria Garcia',
    age: 32,
    gender: 'Female',
    status: 'Recovering',
    lastVisit: 'Mar 14, 2026',
    doctor: 'Dr. Robert Chen',
    avatar: 'https://picsum.photos/seed/maria/100/100'
  },
  {
    id: 'PAT-1023',
    name: 'Robert Brown',
    age: 68,
    gender: 'Male',
    status: 'Critical',
    lastVisit: 'Mar 15, 2026',
    doctor: 'Dr. Emily White',
    avatar: 'https://picsum.photos/seed/robert/100/100'
  }
];

export function MedicalManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Stable': return 'text-emerald-500 bg-emerald-500/10';
      case 'Recovering': return 'text-blue-500 bg-blue-500/10';
      case 'Critical': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Medical <span className="text-red-600">System</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage patient records, appointments, and clinical operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export EMR
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Patients', value: '12,450', change: '+5%', icon: Users, color: 'text-blue-500' },
          { label: 'Active Cases', value: '842', change: '+12%', icon: Activity, color: 'text-red-500' },
          { label: 'Appointments', value: '156', change: '+8%', icon: Calendar, color: 'text-emerald-500' },
          { label: 'Health Score', value: '94%', change: '+2%', icon: Heart, color: 'text-pink-500' },
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
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Status</option>
              <option>Stable</option>
              <option>Critical</option>
              <option>Recovering</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Patient</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Doctor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredPatients.map((patient) => (
                <motion.tr key={patient.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold dark:text-white text-sm">{patient.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p>{patient.age} years • {patient.gender}</p>
                      <p>Last visit: {patient.lastVisit}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(patient.status))}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm dark:text-white">
                      <Stethoscope className="w-3 h-3 text-red-600" />
                      {patient.doctor}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Clipboard className="w-4 h-4" /></button>
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

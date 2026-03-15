import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Truck, 
  Plus, 
  Package, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Navigation,
  Box,
  Shield
} from 'lucide-react';
import { cn } from '../utils';

interface Delivery {
  id: string;
  recipient: string;
  address: string;
  status: 'In Transit' | 'Delivered' | 'Pending' | 'Failed';
  driver: string;
  eta: string;
  priority: 'High' | 'Normal' | 'Low';
}

const MOCK_DELIVERIES: Delivery[] = [
  {
    id: 'DEL-5521',
    recipient: 'John Doe',
    address: '123 Main St, New York, NY',
    status: 'In Transit',
    driver: 'Mike Ross',
    eta: '2:30 PM',
    priority: 'High'
  },
  {
    id: 'DEL-5522',
    recipient: 'Jane Smith',
    address: '456 Park Ave, London, UK',
    status: 'Delivered',
    driver: 'Sarah Jenkins',
    eta: 'Delivered',
    priority: 'Normal'
  },
  {
    id: 'DEL-5523',
    recipient: 'Global Corp',
    address: '789 Tech Blvd, Berlin, DE',
    status: 'Pending',
    driver: 'Unassigned',
    eta: 'Tomorrow',
    priority: 'High'
  }
];

export function DeliveryManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeliveries = MOCK_DELIVERIES.filter(d => 
    d.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Delivery['status']) => {
    switch (status) {
      case 'In Transit': return 'text-blue-500 bg-blue-500/10';
      case 'Delivered': return 'text-emerald-500 bg-emerald-500/10';
      case 'Pending': return 'text-amber-500 bg-amber-500/10';
      case 'Failed': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            Delivery <span className="text-red-600">System</span>
          </h2>
          <p className="text-slate-500 mt-1">Track shipments, manage logistics, and optimize delivery routes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Shipment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Shipments', value: '45,210', change: '+15%', icon: Package, color: 'text-blue-500' },
          { label: 'In Transit', value: '1,240', change: '+8%', icon: Truck, color: 'text-red-500' },
          { label: 'Delivered Today', value: '842', change: '+12%', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Efficiency', value: '98.2%', change: '+0.5%', icon: Navigation, color: 'text-indigo-500' },
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
              placeholder="Search shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20">
              <option>All Status</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Shipment</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Destination</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Logistics</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredDeliveries.map((delivery) => (
                <motion.tr key={delivery.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-red-600">
                        <Box className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{delivery.recipient}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{delivery.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 text-red-600" />
                      {delivery.address}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(delivery.status))}>
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500">
                      <p className="font-bold dark:text-white">{delivery.driver}</p>
                      <p>ETA: {delivery.eta}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"><Navigation className="w-4 h-4" /></button>
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

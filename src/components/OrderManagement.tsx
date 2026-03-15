import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Eye,
  FileText,
  CreditCard,
  MapPin,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: string;
  payment: 'Credit Card' | 'PayPal' | 'Crypto';
  items: number;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7742',
    customer: 'Alex Johnson',
    date: 'Mar 15, 2026',
    status: 'Processing',
    total: '$1,240.00',
    payment: 'Credit Card',
    items: 3
  },
  {
    id: 'ORD-7741',
    customer: 'Sarah Williams',
    date: 'Mar 14, 2026',
    status: 'Shipped',
    total: '$450.50',
    payment: 'PayPal',
    items: 1
  },
  {
    id: 'ORD-7740',
    customer: 'Tech Solutions Inc',
    date: 'Mar 14, 2026',
    status: 'Delivered',
    total: '$3,890.00',
    payment: 'Credit Card',
    items: 12
  },
  {
    id: 'ORD-7739',
    customer: 'Michael Brown',
    date: 'Mar 13, 2026',
    status: 'Cancelled',
    total: '$120.00',
    payment: 'Crypto',
    items: 2
  },
  {
    id: 'ORD-7738',
    customer: 'Emma Davis',
    date: 'Mar 13, 2026',
    status: 'Delivered',
    total: '$89.99',
    payment: 'Credit Card',
    items: 1
  }
];

export function OrderManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return 'text-amber-500 bg-amber-500/10';
      case 'Shipped': return 'text-blue-500 bg-blue-500/10';
      case 'Delivered': return 'text-emerald-500 bg-emerald-500/10';
      case 'Cancelled': return 'text-red-500 bg-red-500/10';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return <Clock className="w-3 h-3" />;
      case 'Shipped': return <Truck className="w-3 h-3" />;
      case 'Delivered': return <CheckCircle2 className="w-3 h-3" />;
      case 'Cancelled': return <AlertCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            {t('orders')} <span className="text-red-600">Fulfillment</span>
          </h2>
          <p className="text-slate-500 mt-1">Track global orders, manage logistics, and handle customer returns.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Orders
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <ShoppingCart className="w-4 h-4" />
            Create Manual Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Orders', value: '892,450', change: '+12%', icon: ShoppingCart, color: 'text-blue-500' },
          { label: 'Pending Fulfillment', value: '1,240', change: '+5%', icon: Package, color: 'text-amber-500' },
          { label: 'In Transit', value: '850', change: '+18%', icon: Truck, color: 'text-blue-400' },
          { label: 'Completed Today', value: '4,200', change: '+24%', icon: CheckCircle2, color: 'text-emerald-500' },
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
              placeholder="Search by order ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
              >
                <option value="All">All Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredOrders.map((order) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-red-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold text-red-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold dark:text-white">{order.customer}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{order.items} items</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span className="text-sm">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(order.status)
                    )}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold dark:text-white">{order.total}</span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <CreditCard className="w-3 h-3" />
                        {order.payment}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-500/10 text-slate-400 rounded-lg transition-colors" title="Print Invoice">
                        <FileText className="w-4 h-4" />
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
            <MapPin className="w-4 h-4 text-red-600" />
            Logistics Hub: Central Europe
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

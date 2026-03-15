import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Hotel, 
  Plus, 
  Bed, 
  Users, 
  Star, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Calendar,
  MapPin,
  Coffee,
  Wifi
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface Booking {
  id: string;
  guest: string;
  hotel: string;
  roomType: string;
  status: 'Confirmed' | 'Checked-in' | 'Cancelled';
  checkIn: string;
  checkOut: string;
  total: string;
  avatar: string;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BOK-4421',
    guest: 'Alice Cooper',
    hotel: 'Grand Plaza Resort',
    roomType: 'Deluxe Suite',
    status: 'Confirmed',
    checkIn: 'Mar 20, 2026',
    checkOut: 'Mar 25, 2026',
    total: '$1,250.00',
    avatar: 'https://picsum.photos/seed/alice/100/100'
  },
  {
    id: 'BOK-4420',
    guest: 'Bob Marley',
    hotel: 'Ocean View Inn',
    roomType: 'Standard Room',
    status: 'Checked-in',
    checkIn: 'Mar 15, 2026',
    checkOut: 'Mar 18, 2026',
    total: '$450.00',
    avatar: 'https://picsum.photos/seed/bob/100/100'
  },
  {
    id: 'BOK-4419',
    guest: 'Charlie Brown',
    hotel: 'Mountain Retreat',
    roomType: 'Cabin',
    status: 'Cancelled',
    checkIn: 'Apr 02, 2026',
    checkOut: 'Apr 05, 2026',
    total: '$890.00',
    avatar: 'https://picsum.photos/seed/charlie/100/100'
  },
  {
    id: 'BOK-4418',
    guest: 'Diana Prince',
    hotel: 'Metropolis Luxury',
    roomType: 'Penthouse',
    status: 'Confirmed',
    checkIn: 'May 10, 2026',
    checkOut: 'May 15, 2026',
    total: '$5,500.00',
    avatar: 'https://picsum.photos/seed/diana/100/100'
  },
  {
    id: 'BOK-4417',
    guest: 'Edward Norton',
    hotel: 'The Continental',
    roomType: 'Superior Room',
    status: 'Checked-in',
    checkIn: 'Mar 14, 2026',
    checkOut: 'Mar 16, 2026',
    total: '$600.00',
    avatar: 'https://picsum.photos/seed/edward/100/100'
  }
];

export function HotelManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredBookings = MOCK_BOOKINGS.filter(booking => {
    const matchesSearch = booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         booking.hotel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || booking.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed': return 'text-blue-500 bg-blue-500/10';
      case 'Checked-in': return 'text-emerald-500 bg-emerald-500/10';
      case 'Cancelled': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            {t('hotel')} <span className="text-red-600">Reservations</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage global hotel bookings, room inventory, and guest check-ins.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export List
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: '12,450', change: '+12%', icon: Calendar, color: 'text-blue-500' },
          { label: 'Occupancy Rate', value: '84%', change: '+5%', icon: Bed, color: 'text-emerald-500' },
          { label: 'Avg. Rating', value: '4.8', change: '+0.2%', icon: Star, color: 'text-amber-500' },
          { label: 'Total Revenue', value: '$4.2M', change: '+18%', icon: Hotel, color: 'text-red-500' },
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
              placeholder="Search by guest name or hotel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked-in">Checked-in</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Guest</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Hotel & Room</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Dates</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredBookings.map((booking) => (
                <motion.tr 
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-red-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={booking.avatar} 
                        alt={booking.guest} 
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-500/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold dark:text-white text-sm">{booking.guest}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{booking.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-sm font-bold dark:text-white">
                        <Hotel className="w-3 h-3 text-red-600" />
                        {booking.hotel}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase">
                        <Bed className="w-3 h-3" />
                        {booking.roomType}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(booking.status)
                    )}>
                      {booking.status === 'Confirmed' ? <CheckCircle2 className="w-3 h-3" /> : 
                       booking.status === 'Checked-in' ? <Users className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs text-slate-500">
                      <span>In: {booking.checkIn}</span>
                      <span>Out: {booking.checkOut}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold dark:text-white">{booking.total}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors">
                        <Star className="w-4 h-4" />
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
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-red-600" />
              Free Wifi
            </div>
            <div className="flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-red-600" />
              Breakfast Inc.
            </div>
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

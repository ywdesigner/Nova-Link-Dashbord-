import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plane, 
  Plus, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Download,
  Calendar,
  MapPin,
  Navigation,
  Wind,
  Shield
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface FlightBooking {
  id: string;
  passenger: string;
  flightNumber: string;
  route: string;
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Cancelled';
  departure: string;
  arrival: string;
  seat: string;
  avatar: string;
}

const MOCK_FLIGHTS: FlightBooking[] = [
  {
    id: 'FLT-8821',
    passenger: 'John Wick',
    flightNumber: 'LN-101',
    route: 'LHR → JFK',
    status: 'On Time',
    departure: '10:30 AM',
    arrival: '01:45 PM',
    seat: '12A',
    avatar: 'https://picsum.photos/seed/wick/100/100'
  },
  {
    id: 'FLT-8820',
    passenger: 'Sarah Connor',
    flightNumber: 'LN-205',
    route: 'LAX → TYO',
    status: 'Delayed',
    departure: '02:15 PM',
    arrival: '06:30 AM',
    seat: '04C',
    avatar: 'https://picsum.photos/seed/connor/100/100'
  },
  {
    id: 'FLT-8819',
    passenger: 'Tony Stark',
    flightNumber: 'LN-500',
    route: 'SFO → DXB',
    status: 'Boarding',
    departure: '09:00 PM',
    arrival: '11:20 PM',
    seat: '01A',
    avatar: 'https://picsum.photos/seed/stark/100/100'
  },
  {
    id: 'FLT-8818',
    passenger: 'Bruce Wayne',
    flightNumber: 'LN-007',
    route: 'GOTH → LON',
    status: 'On Time',
    departure: '06:45 AM',
    arrival: '08:15 AM',
    seat: '01B',
    avatar: 'https://picsum.photos/seed/wayne/100/100'
  },
  {
    id: 'FLT-8817',
    passenger: 'Peter Parker',
    flightNumber: 'LN-332',
    route: 'NYC → BER',
    status: 'Cancelled',
    departure: '11:55 PM',
    arrival: '12:10 PM',
    seat: '22F',
    avatar: 'https://picsum.photos/seed/parker/100/100'
  }
];

export function FlightManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredFlights = MOCK_FLIGHTS.filter(flight => {
    const matchesSearch = flight.passenger.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || flight.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: FlightBooking['status']) => {
    switch (status) {
      case 'On Time': return 'text-emerald-500 bg-emerald-500/10';
      case 'Delayed': return 'text-amber-500 bg-amber-500/10';
      case 'Boarding': return 'text-blue-500 bg-blue-500/10';
      case 'Cancelled': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            {t('flight')} <span className="text-red-600">Operations</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage global flight bookings, passenger manifests, and real-time scheduling.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Manifest
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plane className="w-4 h-4" />
            Book Flight
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Passengers', value: '452,100', change: '+15%', icon: Users, color: 'text-blue-500' },
          { label: 'Active Flights', value: '1,240', change: '+8%', icon: Plane, color: 'text-red-500' },
          { label: 'On-Time Rate', value: '94.2%', change: '+1.2%', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Fuel Efficiency', value: '98.5%', change: '+0.5%', icon: Wind, color: 'text-blue-400' },
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
              placeholder="Search by passenger or flight number..."
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
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
              <option value="Boarding">Boarding</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Passenger</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Flight & Route</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Schedule</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Seat</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredFlights.map((flight) => (
                <motion.tr 
                  key={flight.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-red-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={flight.avatar} 
                        alt={flight.passenger} 
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-500/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold dark:text-white text-sm">{flight.passenger}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{flight.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-sm font-bold dark:text-white">
                        <Plane className="w-3 h-3 text-red-600" />
                        {flight.flightNumber}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase">
                        <Navigation className="w-3 h-3" />
                        {flight.route}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(flight.status)
                    )}>
                      {flight.status === 'On Time' ? <CheckCircle2 className="w-3 h-3" /> : 
                       flight.status === 'Delayed' ? <Clock className="w-3 h-3" /> : 
                       flight.status === 'Boarding' ? <Users className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {flight.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs text-slate-500">
                      <span>Dep: {flight.departure}</span>
                      <span>Arr: {flight.arrival}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold dark:text-white">{flight.seat}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors">
                        <Calendar className="w-4 h-4" />
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
            <Shield className="w-4 h-4 text-red-600" />
            SkySafe Certified Operations
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

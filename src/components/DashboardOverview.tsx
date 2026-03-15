import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSystem } from '../context/SystemContext';
import { MOCK_STATS, REVENUE_DATA, SERVICE_DISTRIBUTION } from '../constants';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, AlertCircle, Zap, Brain, ArrowUpRight, ArrowDownRight, RefreshCw, Clock } from 'lucide-react';
import { getAIInsights } from '../services/geminiService';
import { useState, useEffect } from 'react';
import { cn } from '../utils';

export function DashboardOverview() {
  const { t } = useLanguage();
  const { state } = useSystem();
  const [aiInsight, setAiInsight] = useState<string>("Analyzing platform data...");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchAiInsight = async () => {
    setIsAiLoading(true);
    const result = await getAIInsights("Provide a very short, 1-sentence strategic insight for the LinkNova dashboard overview based on these recent events: " + state.events.slice(0, 3).map(e => e.message).join(', '));
    setAiInsight(result);
    setIsAiLoading(false);
  };

  useEffect(() => {
    fetchAiInsight();
  }, []);

  const COLORS = ['#EF4444', '#F43F5E', '#FB7185', '#FDA4AF'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight dark:text-white">
            {t('overview')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, LinkNova Command Center is operational.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-slate-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="user" referrerPolicy="no-referrer" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-red-600 flex items-center justify-center text-[10px] text-white font-bold">
              +12
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Admins</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, i) => {
          const globalStat = state.stats[stat.label];
          const displayValue = globalStat ? globalStat.value : stat.value;
          const displayChange = globalStat ? globalStat.change : stat.change;
          const displayTrend = globalStat ? globalStat.trend : stat.trend;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[var(--card-bg)] p-6 rounded-[2rem] border border-red-500/10 hover:border-red-500/30 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.05)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t(stat.label)}
                </p>
                <div className="flex items-end justify-between mt-2">
                  <h3 className="text-3xl font-black dark:text-white tracking-tighter">
                    {displayValue}
                  </h3>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                    displayTrend === 'up' ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
                  )}>
                    {displayTrend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {displayChange}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-red-500/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold dark:text-white">{t('revenueAnalytics')}</h3>
              <p className="text-sm text-slate-500">Monthly platform growth</p>
            </div>
            <select className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-xs font-bold px-4 py-2 dark:text-white focus:ring-2 focus:ring-red-500/50">
              <option>Last 7 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111', 
                    border: '1px solid #EF444420', 
                    borderRadius: '16px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#EF4444" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-red-500/10">
          <h3 className="text-xl font-bold dark:text-white mb-8">Service Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SERVICE_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {SERVICE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-4">
            {SERVICE_DISTRIBUTION.map((service, i) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm font-medium dark:text-slate-300">{service.name}</span>
                </div>
                <span className="text-sm font-bold dark:text-white">{service.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Insights */}
        <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[2.5rem] border border-red-500/20 relative overflow-hidden group shadow-[0_0_30px_rgba(239,68,68,0.05)]">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
            <Brain className="w-24 h-24 text-red-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('aiInsights')}</h3>
              </div>
              <button 
                onClick={fetchAiInsight}
                disabled={isAiLoading}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw className={cn("w-4 h-4 text-red-600", isAiLoading && "animate-spin")} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 min-h-[80px] flex items-center">
                {isAiLoading ? (
                  <div className="w-full space-y-2">
                    <div className="h-2 bg-white/10 rounded-full w-full animate-pulse" />
                    <div className="h-2 bg-white/10 rounded-full w-2/3 animate-pulse" />
                  </div>
                ) : (
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{aiInsight}"
                  </p>
                )}
              </div>
              <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                View Smart Reports
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-red-500/10">
          <h3 className="text-xl font-bold dark:text-white mb-6">{t('realTimeStats')}</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-sm font-medium dark:text-slate-300">Active Users</span>
              </div>
              <span className="text-xl font-black dark:text-white tracking-tighter">
                {state.stats.users?.value || '12,482'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-sm font-medium dark:text-slate-300">API Requests / sec</span>
              </div>
              <span className="text-xl font-black dark:text-white tracking-tighter">
                {state.stats.api?.value || '1.2K'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium dark:text-slate-300">Server Latency</span>
              </div>
              <span className="text-xl font-black dark:text-white tracking-tighter">24ms</span>
            </div>
            <div className="pt-4 border-t border-red-500/10">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest">
                <AlertCircle className="w-4 h-4" />
                System Status: Optimal
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-red-500/10">
          <h3 className="text-xl font-bold dark:text-white mb-6">{t('activityTimeline')}</h3>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-red-500/10 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {state.events.length > 0 ? (
              state.events.map((item, i) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative pl-8"
                >
                  <div className={cn(
                    "absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border-4 z-10",
                    item.type === 'success' ? 'border-emerald-500' : 
                    item.type === 'warning' ? 'border-amber-500' :
                    item.type === 'error' ? 'border-red-600' : 'border-blue-500'
                  )} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <span className="text-red-600">• {item.system}</span>
                  </p>
                  <p className="text-sm font-bold dark:text-white">{item.message}</p>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-slate-500 italic uppercase tracking-widest">Initializing timeline...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, TrendingUp, Users, ShoppingBag, Activity, Sparkles, RefreshCw, Clock } from 'lucide-react';
import { getAIInsights } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';
import { useSystem } from '../context/SystemContext';
import { cn } from '../utils';

export function AISystem() {
  const { t } = useLanguage();
  const { state } = useSystem();
  const [insight, setInsight] = useState<string>("Initializing AI Core...");
  const [isLoading, setIsLoading] = useState(false);

  const fetchInsight = async () => {
    setIsLoading(true);
    const result = await getAIInsights("Provide a strategic insight for the LinkNova platform based on these recent system events: " + state.events.slice(0, 5).map(e => `${e.system}: ${e.message}`).join('; '));
    setInsight(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInsight();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight dark:text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-red-600" />
            {t('aiSystem')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Advanced neural networks managing the LinkNova ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Neural Core Active</span>
          </div>
          <button 
            onClick={fetchInsight}
            disabled={isLoading}
            className="p-3 bg-red-600/10 hover:bg-red-600/20 rounded-2xl transition-all group"
          >
            <RefreshCw className={cn("w-5 h-5 text-red-600 transition-transform", isLoading && "animate-spin")} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main AI Insight Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[2.5rem] border border-red-500/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles className="w-40 h-40 text-red-600" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-white">Strategic Intelligence</h3>
            </div>
            
            <div className="min-h-[150px] flex items-center">
              {isLoading ? (
                <div className="space-y-3 w-full">
                  <div className="h-4 bg-white/10 rounded-full w-3/4 animate-pulse" />
                  <div className="h-4 bg-white/10 rounded-full w-1/2 animate-pulse" />
                  <div className="h-4 bg-white/10 rounded-full w-2/3 animate-pulse" />
                </div>
              ) : (
                <p className="text-lg text-slate-300 leading-relaxed italic">
                  "{insight}"
                </p>
              )}
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="px-4 py-2 bg-red-600/20 rounded-xl border border-red-600/30 text-xs font-bold text-red-500 uppercase tracking-widest">
                Confidence: 98.4%
              </div>
              <div className="px-4 py-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-xs font-bold text-emerald-500 uppercase tracking-widest">
                Real-time Sync
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Stats */}
        <div className="space-y-6">
          {[
            { label: 'Neural Nodes', value: '1,024', icon: Activity, color: 'text-blue-500' },
            { label: 'Processed Data', value: '4.2 PB', icon: TrendingUp, color: 'text-emerald-500' },
            { label: 'Active Predictions', value: '12.5K', icon: Sparkles, color: 'text-purple-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            className="bg-[var(--card-bg)] p-6 rounded-3xl border border-red-500/10 flex items-center gap-4"
            >
              <div className={cn("w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-black dark:text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Ecosystem Monitor */}
        <div className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-red-500/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold dark:text-white">Ecosystem Monitor</h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Feed</span>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {state.events.map((event) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl border border-transparent hover:border-red-500/20 transition-all flex items-start gap-4"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  event.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                  event.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                  event.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                )}>
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{event.system}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm font-medium dark:text-white">{event.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { title: 'User Behavior', desc: 'Analyzing patterns to predict churn and engagement.', icon: Users },
            { title: 'Sales Prediction', desc: 'Forecasting revenue based on seasonal data.', icon: TrendingUp },
            { title: 'Smart Inventory', desc: 'Automated stock management across all stores.', icon: ShoppingBag },
            { title: 'Fraud Detection', desc: 'Real-time monitoring of suspicious transactions.', icon: Zap },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-6 bg-[var(--card-bg)] rounded-[2rem] border border-red-500/10 hover:border-red-500/30 transition-all group"
            >
              <feature.icon className="w-8 h-8 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold dark:text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

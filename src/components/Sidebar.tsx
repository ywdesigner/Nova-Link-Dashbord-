import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { NAVIGATION_ITEMS } from '../constants';
import { cn } from '../utils';
import { ChevronRight, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export function Sidebar({ isOpen, onClose, activeTab, setActiveTab }: SidebarProps) {
  const { t, dir } = useLanguage();
  const { theme } = useTheme();

  const categories = ['core', 'management', 'services', 'marketing', 'system'];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed top-0 bottom-0 z-50 w-72 transition-transform duration-300 ease-in-out lg:translate-x-0',
          dir === 'ltr' ? (isOpen ? 'translate-x-0' : '-translate-x-full') : (isOpen ? 'translate-x-0' : 'translate-x-full'),
          dir === 'ltr' ? 'left-0 border-r' : 'right-0 border-l',
          'bg-[var(--card-bg)] border-red-500/10 flex flex-col'
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tighter dark:text-white">
              Link<span className="text-red-600">Nova</span>
            </h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-red-500/10 rounded-full transition-colors">
            <X className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
          {categories.map((cat) => (
            <div key={cat} className="mb-6">
              <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                {cat}
              </h3>
              <div className="space-y-1">
                {NAVIGATION_ITEMS.filter((item) => item.category === cat).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden',
                      activeTab === item.id
                        ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-red-500/5 hover:text-red-600'
                    )}
                  >
                    <item.icon className={cn('w-5 h-5', activeTab === item.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform')} />
                    <span className="font-medium text-sm flex-1 text-start">{t(item.label)}</span>
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                      />
                    )}
                    <ChevronRight className={cn('w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity', dir === 'rtl' && 'rotate-180')} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-red-500/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-red-500/5 hover:text-red-600 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">{t('logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

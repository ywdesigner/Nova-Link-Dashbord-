import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Bell, Moon, Sun, Languages, Menu, User, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../utils';

interface NavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function Navbar({ onMenuClick, onSearchClick }: NavbarProps) {
  const { t, language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-[var(--card-bg)]/80 backdrop-blur-xl border-b border-red-500/10 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-red-500/10 rounded-xl transition-colors text-slate-600 dark:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div 
            onClick={onSearchClick}
            className="relative max-w-md w-full hidden md:block cursor-pointer group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors" />
            <div className="w-full bg-slate-100 dark:bg-white/5 border border-transparent group-hover:border-red-500/20 rounded-2xl py-2.5 pl-11 pr-4 text-sm transition-all text-slate-500 flex items-center justify-between">
              <span>{t('search')}</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white dark:bg-zinc-800 rounded border border-slate-200 dark:border-white/10 text-[10px] font-bold">
                <Command className="w-2.5 h-2.5" />
                K
              </div>
            </div>
          </div>
          
          <button 
            onClick={onSearchClick}
            className="md:hidden p-2 hover:bg-red-500/10 rounded-xl transition-colors text-slate-600 dark:text-white"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="p-2.5 hover:bg-red-500/10 rounded-2xl transition-all text-slate-600 dark:text-white flex items-center gap-2 group"
          >
            <Languages className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold uppercase hidden sm:inline">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-red-500/10 rounded-2xl transition-all text-slate-600 dark:text-white group relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 group-hover:text-red-600 transition-colors" />
                ) : (
                  <Sun className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 hover:bg-red-500/10 rounded-2xl transition-all text-slate-600 dark:text-white relative group"
            >
              <Bell className="w-5 h-5 group-hover:animate-bounce" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white dark:border-black shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={cn(
                    "absolute top-full mt-4 w-80 bg-[var(--card-bg)] border border-red-500/10 rounded-3xl shadow-2xl p-4 z-50",
                    dir === 'ltr' ? 'right-0' : 'left-0'
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold dark:text-white">{t('notifications')}</h3>
                    <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full">3 New</span>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 hover:bg-red-500/5 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-red-500/10">
                        <p className="text-sm font-medium dark:text-white">New order received #ORD-{1000 + i}</p>
                        <p className="text-xs text-slate-500 mt-1">2 minutes ago</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-8 w-[1px] bg-red-500/10 mx-2 hidden sm:block" />

          <button className="flex items-center gap-3 p-1.5 hover:bg-red-500/10 rounded-2xl transition-all group">
            <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-rose-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden lg:block text-start">
              <p className="text-sm font-bold dark:text-white leading-none">Admin Nova</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">Super Admin</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

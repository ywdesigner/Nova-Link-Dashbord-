import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Command, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) {
          // This would be triggered from parent, but good to have logic
        }
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isOpen]);

  const filteredItems = NAVIGATION_ITEMS.filter(item => 
    t(item.label).toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-red-500/20 overflow-hidden"
          >
            <div className="p-6 border-b border-red-500/10 flex items-center gap-4">
              <Search className="w-6 h-6 text-red-600" />
              <input
                autoFocus
                type="text"
                placeholder="Search systems, users, or analytics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-lg dark:text-white placeholder:text-slate-500"
              />
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10">
                <Command className="w-3 h-3 text-slate-500" />
                <span className="text-[10px] font-bold text-slate-500">K</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-red-500/10 rounded-full transition-colors">
                <X className="w-5 h-5 dark:text-white" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {filteredItems.length > 0 ? (
                <div className="space-y-2">
                  {filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelect(item.id);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-4 hover:bg-red-500/5 rounded-2xl transition-all group border border-transparent hover:border-red-500/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors text-slate-600 dark:text-slate-400">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="text-start">
                          <p className="font-bold dark:text-white">{t(item.label)}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-widest">{item.category}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-slate-500">No results found for "{query}"</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-white/5 border-t border-red-500/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Select</span>
                  <div className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded text-[10px] text-slate-500">Enter</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Navigate</span>
                  <div className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded text-[10px] text-slate-500">↑↓</div>
                </div>
              </div>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">LinkNova Search Engine v1.0</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

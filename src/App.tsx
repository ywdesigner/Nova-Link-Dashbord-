import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { SystemProvider } from './context/SystemContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { AISystem } from './components/AISystem';
import { UserManagement } from './components/UserManagement';
import { CompanyManagement } from './components/CompanyManagement';
import { SubscriptionManagement } from './components/SubscriptionManagement';
import { EcommerceManagement } from './components/EcommerceManagement';
import { OrderManagement } from './components/OrderManagement';
import { PaymentManagement } from './components/PaymentManagement';
import { HotelManagement } from './components/HotelManagement';
import { FlightManagement } from './components/FlightManagement';
import { MedicalManagement } from './components/MedicalManagement';
import { DeliveryManagement } from './components/DeliveryManagement';
import { AdvertisingManagement } from './components/AdvertisingManagement';
import { MessagingManagement } from './components/MessagingManagement';
import { InstallmentManagement } from './components/InstallmentManagement';
import { ContentManagement } from './components/ContentManagement';
import { ReportingManagement } from './components/ReportingManagement';
import { SupportManagement } from './components/SupportManagement';
import { SecurityManagement } from './components/SecurityManagement';
import { APIManagement } from './components/APIManagement';
import { FileManagement } from './components/FileManagement';
import { SearchModal } from './components/SearchModal';
import { useLanguage } from './context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils';

function DashboardContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { dir, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'companies':
        return <CompanyManagement />;
      case 'subscription':
        return <SubscriptionManagement />;
      case 'ecommerce':
        return <EcommerceManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'hotel':
        return <HotelManagement />;
      case 'flight':
        return <FlightManagement />;
      case 'medical':
        return <MedicalManagement />;
      case 'delivery':
        return <DeliveryManagement />;
      case 'advertising':
        return <AdvertisingManagement />;
      case 'messaging':
        return <MessagingManagement />;
      case 'installment':
        return <InstallmentManagement />;
      case 'content':
        return <ContentManagement />;
      case 'reports':
        return <ReportingManagement />;
      case 'support':
        return <SupportManagement />;
      case 'security':
        return <SecurityManagement />;
      case 'api':
        return <APIManagement />;
      case 'files':
        return <FileManagement />;
      case 'ai-system':
        return <AISystem />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold dark:text-white">{t(activeTab)} System</h2>
            <p className="text-slate-500 max-w-md">
              The {t(activeTab)} module is currently initializing. This enterprise-grade system will be fully operational in the next deployment cycle.
            </p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/20 transition-all"
            >
              Back to Command Center
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className={cn(
        "transition-all duration-300 min-h-screen flex flex-col",
        dir === 'ltr' ? "lg:ml-72" : "lg:mr-72"
      )}>
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} onSearchClick={() => setIsSearchOpen(true)} />
        
        <div className="flex-1 p-4 lg:p-8 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
          onSelect={(id) => setActiveTab(id)} 
        />

        <footer className="p-8 border-t border-red-500/10 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
            &copy; 2026 LinkNova Global Ecosystem. All Rights Reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SystemProvider>
          <DashboardContent />
        </SystemProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    overview: 'Overview',
    users: 'Users',
    companies: 'Companies',
    stores: 'Stores',
    orders: 'Orders',
    bookings: 'Bookings',
    revenue: 'Revenue',
    analytics: 'Analytics',
    search: 'Search anything...',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    aiInsights: 'AI Insights',
    realTimeStats: 'Real-time Statistics',
    activityTimeline: 'Activity Timeline',
    systemAlerts: 'System Alerts',
    performance: 'Performance',
    ecommerce: 'E-commerce',
    payments: 'Payments',
    hotel: 'Hotel Booking',
    flight: 'Flight Booking',
    medical: 'Medical Booking',
    delivery: 'Delivery System',
    advertising: 'Advertising',
    messaging: 'Messaging',
    content: 'Content CMS',
    reports: 'Reports',
    coupons: 'Coupons',
    support: 'Support Center',
    security: 'Security Center',
    api: 'API Management',
    files: 'File Management',
    subscription: 'Subscriptions',
    aiSystem: 'AI System',
    installment: 'Installment System',
  },
  ar: {
    dashboard: 'لوحة القيادة',
    overview: 'نظرة عامة',
    users: 'المستخدمين',
    companies: 'الشركات',
    stores: 'المتاجر',
    orders: 'الطلبات',
    bookings: 'الحجوزات',
    revenue: 'الإيرادات',
    analytics: 'التحليلات',
    search: 'بحث عن أي شيء...',
    notifications: 'التنبيهات',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    aiInsights: 'رؤى الذكاء الاصطناعي',
    realTimeStats: 'إحصائيات مباشرة',
    activityTimeline: 'سجل النشاط',
    systemAlerts: 'تنبيهات النظام',
    performance: 'الأداء',
    ecommerce: 'التجارة الإلكترونية',
    payments: 'المدفوعات',
    hotel: 'حجز الفنادق',
    flight: 'حجز الطيران',
    medical: 'الحجز الطبي',
    delivery: 'نظام التوصيل',
    advertising: 'الإعلانات',
    messaging: 'المراسلات',
    content: 'إدارة المحتوى',
    reports: 'التقارير',
    coupons: 'القسائم',
    support: 'مركز الدعم',
    security: 'مركز الأمان',
    api: 'إدارة API',
    files: 'إدارة الملفات',
    subscription: 'الاشتراكات',
    aiSystem: 'نظام الذكاء الاصطناعي',
    installment: 'نظام التقسيط',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('linknova-lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('linknova-lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dir: language === 'ar' ? 'rtl' : 'ltr',
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

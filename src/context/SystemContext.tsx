import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// --- Types ---

export interface SystemEvent {
  id: string;
  system: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

interface SystemState {
  events: SystemEvent[];
  stats: {
    [key: string]: {
      value: string | number;
      change: string;
      trend: 'up' | 'down';
    };
  };
}

interface SystemContextType {
  state: SystemState;
  addEvent: (event: Omit<SystemEvent, 'id' | 'timestamp'>) => void;
  updateStat: (system: string, value: string | number, change: string, trend: 'up' | 'down') => void;
}

// --- Context ---

const SystemContext = createContext<SystemContextType | undefined>(undefined);

// --- Provider ---

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SystemState>({
    events: [],
    stats: {
      users: { value: '2.4M', change: '+12%', trend: 'up' },
      companies: { value: '45.2K', change: '+5%', trend: 'up' },
      orders: { value: '892K', change: '+18%', trend: 'up' },
      revenue: { value: '$12.8M', change: '+24%', trend: 'up' },
      medical: { value: '1,240', change: '+15%', trend: 'up' },
      delivery: { value: '856', change: '+12%', trend: 'up' },
      advertising: { value: '42', change: '+5%', trend: 'up' },
      security: { value: '98.5', change: '+0.5%', trend: 'up' },
      api: { value: '12.4M', change: '+15%', trend: 'up' },
    }
  });

  const addEvent = useCallback((event: Omit<SystemEvent, 'id' | 'timestamp'>) => {
    const newEvent: SystemEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setState(prev => ({
      ...prev,
      events: [newEvent, ...prev.events].slice(0, 50) // Keep last 50 events
    }));
  }, []);

  const updateStat = useCallback((system: string, value: string | number, change: string, trend: 'up' | 'down') => {
    setState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [system]: { value, change, trend }
      }
    }));
  }, []);

  // --- Background Simulation Engine ---
  useEffect(() => {
    const systems = [
      'Order', 'Payment', 'Medical', 'Delivery', 'Advertising', 
      'Messaging', 'Security', 'API', 'File', 'AI'
    ];

    const eventTypes: SystemEvent['type'][] = ['info', 'success', 'warning', 'error'];
    
    const messages = {
      Order: ['New order received', 'Order fulfilled', 'Payment confirmed'],
      Payment: ['Transaction processed', 'Payout initiated', 'Refund requested'],
      Medical: ['New appointment scheduled', 'Patient record updated', 'Clinical audit complete'],
      Delivery: ['Shipment departed', 'Delivery successful', 'Route optimized'],
      Advertising: ['Campaign launched', 'Budget threshold reached', 'Ad performance spike'],
      Messaging: ['New support ticket', 'User presence updated', 'Channel created'],
      Security: ['Threat blocked', 'Login attempt failed', 'System scan complete'],
      API: ['Endpoint latency spike', 'New API key generated', 'Rate limit reached'],
      File: ['File uploaded', 'Sync complete', 'Backup successful'],
      AI: ['Insight generated', 'Neural node optimized', 'Prediction model updated']
    };

    const interval = setInterval(() => {
      const system = systems[Math.floor(Math.random() * systems.length)];
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const systemMessages = messages[system as keyof typeof messages];
      const message = systemMessages[Math.floor(Math.random() * systemMessages.length)];

      addEvent({ system, type, message });

      // Randomly update a stat
      if (Math.random() > 0.7) {
        const statKey = system.toLowerCase();
        const currentStat = state.stats[statKey];
        if (currentStat) {
          // Simple simulation of value change
          const newValue = typeof currentStat.value === 'number' 
            ? currentStat.value + (Math.random() > 0.5 ? 1 : -1)
            : currentStat.value;
          updateStat(statKey, newValue, currentStat.change, currentStat.trend);
        }
      }
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [addEvent, updateStat, state.stats]);

  return (
    <SystemContext.Provider value={{ state, addEvent, updateStat }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}

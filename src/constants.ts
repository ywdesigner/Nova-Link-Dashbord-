import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  ShoppingBag, 
  ShoppingCart, 
  CreditCard, 
  Banknote,
  Hotel, 
  Plane, 
  Stethoscope, 
  Truck, 
  Megaphone, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Ticket, 
  LifeBuoy, 
  ShieldCheck, 
  Code2, 
  FolderOpen, 
  Zap, 
  Settings, 
  BrainCircuit 
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  category: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'dashboard', icon: LayoutDashboard, path: '/', category: 'core' },
  { id: 'users', label: 'users', icon: Users, path: '/users', category: 'management' },
  { id: 'companies', label: 'companies', icon: Building2, path: '/companies', category: 'management' },
  { id: 'ecommerce', label: 'ecommerce', icon: ShoppingBag, path: '/ecommerce', category: 'services' },
  { id: 'orders', label: 'orders', icon: ShoppingCart, path: '/orders', category: 'services' },
  { id: 'payments', label: 'payments', icon: CreditCard, path: '/payments', category: 'services' },
  { id: 'hotel', label: 'hotel', icon: Hotel, path: '/hotel', category: 'services' },
  { id: 'flight', label: 'flight', icon: Plane, path: '/flight', category: 'services' },
  { id: 'medical', label: 'medical', icon: Stethoscope, path: '/medical', category: 'services' },
  { id: 'delivery', label: 'delivery', icon: Truck, path: '/delivery', category: 'services' },
  { id: 'installment', label: 'installment', icon: Banknote, path: '/installment', category: 'services' },
  { id: 'advertising', label: 'advertising', icon: Megaphone, path: '/advertising', category: 'marketing' },
  { id: 'messaging', label: 'messaging', icon: MessageSquare, path: '/messaging', category: 'marketing' },
  { id: 'content', label: 'content', icon: FileText, path: '/content', category: 'system' },
  { id: 'reports', label: 'reports', icon: BarChart3, path: '/reports', category: 'system' },
  { id: 'coupons', label: 'coupons', icon: Ticket, path: '/coupons', category: 'marketing' },
  { id: 'support', label: 'support', icon: LifeBuoy, path: '/support', category: 'system' },
  { id: 'security', label: 'security', icon: ShieldCheck, path: '/security', category: 'system' },
  { id: 'api', label: 'api', icon: Code2, path: '/api', category: 'system' },
  { id: 'files', label: 'files', icon: FolderOpen, path: '/files', category: 'system' },
  { id: 'subscription', label: 'subscription', icon: Zap, path: '/subscription', category: 'management' },
  { id: 'ai-system', label: 'aiSystem', icon: BrainCircuit, path: '/ai', category: 'core' },
  { id: 'settings', label: 'settings', icon: Settings, path: '/settings', category: 'system' },
];

export const MOCK_STATS = [
  { label: 'totalUsers', value: '2.4M', change: '+12%', trend: 'up' },
  { label: 'totalCompanies', value: '45.2K', change: '+5%', trend: 'up' },
  { label: 'totalOrders', value: '892K', change: '+18%', trend: 'up' },
  { label: 'revenue', value: '$12.8M', change: '+24%', trend: 'up' },
];

export const REVENUE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export const SERVICE_DISTRIBUTION = [
  { name: 'E-commerce', value: 45 },
  { name: 'Travel', value: 25 },
  { name: 'Medical', value: 15 },
  { name: 'Delivery', value: 15 },
];

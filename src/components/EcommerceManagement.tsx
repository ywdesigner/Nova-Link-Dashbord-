import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Plus, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  MoreVertical,
  Download,
  DollarSign,
  Tag,
  BarChart3,
  Edit2,
  Trash2,
  Eye,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  sales: number;
  image: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'PRD-001',
    name: 'Quantum X1 Smartphone',
    category: 'Electronics',
    price: '$999.00',
    stock: 145,
    status: 'In Stock',
    sales: 1240,
    image: 'https://picsum.photos/seed/phone/100/100'
  },
  {
    id: 'PRD-002',
    name: 'Nova Pro Headphones',
    category: 'Audio',
    price: '$299.00',
    stock: 12,
    status: 'Low Stock',
    sales: 850,
    image: 'https://picsum.photos/seed/audio/100/100'
  },
  {
    id: 'PRD-003',
    name: 'Smart Home Hub v2',
    category: 'Home Automation',
    price: '$149.00',
    stock: 0,
    status: 'Out of Stock',
    sales: 420,
    image: 'https://picsum.photos/seed/home/100/100'
  },
  {
    id: 'PRD-004',
    name: 'Titan Gaming Laptop',
    category: 'Computers',
    price: '$2,499.00',
    stock: 45,
    status: 'In Stock',
    sales: 310,
    image: 'https://picsum.photos/seed/laptop/100/100'
  },
  {
    id: 'PRD-005',
    name: 'EcoWatch Series 5',
    category: 'Wearables',
    price: '$199.00',
    stock: 8,
    status: 'Low Stock',
    sales: 2100,
    image: 'https://picsum.photos/seed/watch/100/100'
  }
];

export function EcommerceManagement() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'In Stock': return 'text-emerald-500 bg-emerald-500/10';
      case 'Low Stock': return 'text-amber-500 bg-amber-500/10';
      case 'Out of Stock': return 'text-red-500 bg-red-500/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">
            {t('ecommerce')} <span className="text-red-600">Inventory</span>
          </h2>
          <p className="text-slate-500 mt-1">Manage global product catalog, stock levels, and sales performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-xl border border-red-500/10 hover:bg-red-500/5 transition-all">
            <Download className="w-4 h-4" />
            Export Catalog
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sales', value: '892,450', change: '+18%', icon: ShoppingBag, color: 'text-blue-500' },
          { label: 'Active Products', value: '12,840', change: '+5%', icon: Package, color: 'text-emerald-500' },
          { label: 'Low Stock Items', value: '42', change: '-12%', icon: AlertCircle, color: 'text-amber-500' },
          { label: 'Total Revenue', value: '$12.8M', change: '+24%', icon: DollarSign, color: 'text-red-500' },
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
              placeholder="Search by product name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-red-500/20 rounded-2xl text-sm dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Audio">Audio</option>
                <option value="Home Automation">Home Automation</option>
                <option value="Computers">Computers</option>
                <option value="Wearables">Wearables</option>
              </select>
            </div>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white focus:ring-red-500/20"
            >
              <option value="All">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/5">
              {filteredProducts.map((product) => (
                <motion.tr 
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-red-500/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-red-500/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold dark:text-white text-sm">{product.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Tag className="w-3 h-3" />
                      <span className="text-sm font-medium">{product.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold dark:text-white">{product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Layers className="w-3 h-3" />
                      <span className="text-sm">{product.stock} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(product.status)
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors" title="Edit Product">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors" title="Delete Product">
                        <Trash2 className="w-4 h-4" />
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
            <BarChart3 className="w-4 h-4 text-red-600" />
            Inventory Health: Optimal
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Previous</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-sm font-bold dark:text-white transition-colors">2</button>
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

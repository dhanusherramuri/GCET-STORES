import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  LogOut, 
  History, 
  FileText, 
  ShoppingCart, 
  Truck,
  ClipboardList,
  Send
} from 'lucide-react';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const features = [
    {
      title: 'Consumables Management',
      description: 'Manage inventory items and stock levels',
      icon: Package,
      path: '/admin/consumables',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Inventory Monitor',
      description: 'Track and monitor current inventory status',
      icon: ShoppingCart,
      path: '/admin/inventory',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Purchase Indents',
      description: 'View and manage purchase indents',
      icon: FileText,
      path: '/admin/indents',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Material Issue Requests',
      description: 'Manage material issue requests',
      icon: Send,
      path: '/admin/material-issue',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Material Issue History',
      description: 'View material issue history',
      icon: ClipboardList,
      path: '/admin/material-issue-history',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      title: 'Student MIRs',
      description: 'View student material issue requests',
      icon: ShoppingCart,
      path: '/admin/student-consumables',
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      title: 'Transaction History',
      description: 'View all inventory transactions',
      icon: History,
      path: '/admin/history',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      title: 'Gate History',
      description: 'View gate entry records',
      icon: Truck,
      path: '/GateHistory',
      color: 'bg-teal-500 hover:bg-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-indigo-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                className="cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className={`rounded-lg shadow-lg overflow-hidden ${feature.color}`}>
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-center mb-4">
                      <IconComponent size={40} />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-center opacity-90">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
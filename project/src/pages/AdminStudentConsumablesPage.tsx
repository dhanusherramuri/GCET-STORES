import React, { useState, useEffect } from 'react';
import { LogOut, Search, Calendar, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PurchaseOrder {
  _id: string;
  studentId: string;
  items: {
    itemId: string;
    quantity: number;
    priceAtPurchase: number;
    itemName: string;
  }[];
  totalAmount: number;
  createdAt: string;
}

const AdminStudentConsumablesPage = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/purchases');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPurchases(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching purchases:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch purchases');
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = 
      purchase.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.items.some(item => 
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (!matchesSearch) return false;

    const purchaseDate = new Date(purchase.createdAt);
    
    switch (dateFilter) {
      case 'today':
        const today = new Date();
        return purchaseDate.toDateString() === today.toDateString();
      
      case 'week':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return purchaseDate >= weekAgo;
      
      case 'month':
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return purchaseDate >= monthAgo;
      
      case 'custom':
        if (!startDate || !endDate) return true;
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59);
        return purchaseDate >= start && purchaseDate <= end;
      
      default:
        return true;
    }
  });

  const exportToCSV = () => {
    const headers = ['Purchase ID', 'Department', 'Item Name', 'Quantity', 'Price', 'Total', 'Date'];
    const csvData = filteredPurchases.map(purchase => {
      return purchase.items.map(item => [
        purchase._id,
        purchase.studentId,
        item.itemName,
        item.quantity,
        item.priceAtPurchase,
        (item.quantity * item.priceAtPurchase),
        new Date(purchase.createdAt).toLocaleDateString()
      ].join(','));
    }).flat().join('\n');

    const csv = [headers.join(','), csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-purchases-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Consumable Purchases</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/consumables')}
              className="hover:text-indigo-200"
            >
              Manage Consumables
            </button>
            <button
              onClick={() => navigate('/admin/indents')}
              className="hover:text-indigo-200"
            >
              View Indents
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-indigo-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by student ID or item name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Filter
              </label>
              <div className="flex items-center space-x-2">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
                {dateFilter === 'custom' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={20} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">Purchase ID</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Items</th>
                  <th className="px-4 py-2">Total Amount</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No purchases found
                    </td>
                  </tr>
                ) : (
                  filteredPurchases.map((purchase) => (
                    <tr key={purchase._id} className="border-t">
                      <td className="px-4 py-2 font-mono text-sm">{purchase._id}</td>
                      <td className="px-4 py-2">{purchase.studentId}</td>
                      <td className="px-4 py-2">
                        <details className="cursor-pointer">
                          <summary className="text-indigo-600 hover:text-indigo-700">
                            View Items ({purchase.items.length})
                          </summary>
                          <div className="mt-2">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-2 py-1">Item</th>
                                  <th className="px-2 py-1">Quantity</th>
                                  <th className="px-2 py-1">Price</th>
                                  <th className="px-2 py-1">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {purchase.items.map((item, index) => (
                                  <tr key={index} className="border-t">
                                    <td className="px-2 py-1">{item.itemName}</td>
                                    <td className="px-2 py-1">{item.quantity}</td>
                                    <td className="px-2 py-1">₹{item.priceAtPurchase.toLocaleString()}</td>
                                    <td className="px-2 py-1">₹{(item.quantity * item.priceAtPurchase).toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </details>
                      </td>
                      <td className="px-4 py-2">₹{purchase.totalAmount.toLocaleString()}</td>
                      <td className="px-4 py-2">{new Date(purchase.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentConsumablesPage;
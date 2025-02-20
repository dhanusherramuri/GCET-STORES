import React, { useState, useEffect } from 'react';
import { LogOut, Download, Filter, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HistoryItem {
  _id: string;
  date: string;
  itemName: string;
  category: string;
  department: string;
  type: 'consumable' | 'non-consumable';
  quantity: number;
  price: number;
  totalAmount: number;
}

interface ApprovedIndent {
  _id: string;
  psNo: string;
  date: string;
  department: string;
  items: {
    itemDescription: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  status: string;
}

const AdminHistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const departments = [
    { value: 'Computer Science Engineering', label: 'CSE' },
    { value: 'Cyber Security', label: 'CS' },
    { value: 'Electronics Engineering', label: 'ECE' },
    { value: 'Mechanical Engineering', label: 'MECH' },
    { value: 'Civil Engineering', label: 'CIVIL' },
    { value: 'Inventory', label: 'IV' },
    { value: 'Electrical and Electronics Engineering', label: 'EEE' }
  ];

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      setLoading(true);
      
      // Fetch regular history items (consumables)
      const historyResponse = await fetch('http://localhost:3001/history');
      if (!historyResponse.ok) {
        throw new Error('Failed to fetch history');
      }
      const historyData = await historyResponse.json();
      
      // Fetch approved indents
      const indentsResponse = await fetch('http://localhost:3001/indents');
      if (!indentsResponse.ok) {
        throw new Error('Failed to fetch indents');
      }
      const indentsData = await indentsResponse.json();
      
      // Filter only approved indents and transform them to history format
      const approvedIndents = indentsData
        .filter((indent: ApprovedIndent) => indent.status === 'approved')
        .flatMap((indent: ApprovedIndent) => 
          indent.items.map(item => ({
            _id: `${indent._id}-${item.itemDescription}`,
            date: indent.date,
            itemName: item.itemDescription,
            category: 'Non-Consumable Items',
            department: indent.department,
            type: 'non-consumable',
            quantity: item.quantity,
            price: item.unitPrice,
            totalAmount: item.totalPrice
          }))
        );

      // Transform regular history items
      const consumableItems = historyData.map((item: any) => ({
        ...item,
        type: 'consumable'
      }));

      // Combine both types of items
      const combinedHistory = [...consumableItems, ...approvedIndents];
      
      // Sort by date, most recent first
      combinedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setHistory(combinedHistory);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredHistory = history.filter(item => {
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesDepartment = departmentFilter === 'all' || item.department === departmentFilter;
    
    const itemDate = new Date(item.date);
    let matchesDate = true;

    switch (dateFilter) {
      case 'today':
        const today = new Date();
        matchesDate = itemDate.toDateString() === today.toDateString();
        break;
      case 'week':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = itemDate >= weekAgo;
        break;
      case 'month':
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        matchesDate = itemDate >= monthAgo;
        break;
      case 'custom':
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59);
          matchesDate = itemDate >= start && itemDate <= end;
        }
        break;
      default:
        matchesDate = true;
    }

    return matchesType && matchesDepartment && matchesDate;
  });

  const calculateTotalSpent = () => {
    return filteredHistory.reduce((total, item) => total + item.totalAmount, 0);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Item Name', 'Category', 'Department', 'Type', 'Quantity', 'Price', 'Total Amount'];
    const csvData = filteredHistory.map(item => [
      new Date(item.date).toLocaleDateString(),
      item.itemName,
      item.category,
      item.department,
      item.type,
      item.quantity,
      item.price,
      item.totalAmount
    ].join(','));

    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-history-${new Date().toISOString().split('T')[0]}.csv`;
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
          <h1 className="text-xl font-bold">Inventory History</h1>
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
          <div className="flex flex-wrap gap-4 items-end justify-between">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type Filter
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Types</option>
                  <option value="consumable">Consumable</option>
                  <option value="non-consumable">Non-Consumable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Filter
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.value} ({dept.label})
                    </option>
                  ))}
                </select>
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
            </div>

            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={20} />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-indigo-800">
              Total Amount Spent: ₹{calculateTotalSpent().toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No history records found
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{item.itemName}</td>
                      <td className="px-4 py-2">{item.category}</td>
                      <td className="px-4 py-2">{item.department}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${item.type === 'non-consumable' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                          {item.type === 'consumable' ? 'Consumable' : 'Non-Consumable'}
                        </span>
                      </td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">₹{item.price.toLocaleString()}</td>
                      <td className="px-4 py-2">₹{item.totalAmount.toLocaleString()}</td>
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

export default AdminHistoryPage;
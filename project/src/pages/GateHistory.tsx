

import React, { useState, useEffect } from 'react';
import { LogOut, Download, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface GateEntryItem {
  serialNo: number;
  invoiceNumber: string;
  supplierName: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  remarks: string;
  timestamp: string;
}

interface GateEntry {
  entryId: string;
  date: string;
  items: GateEntryItem[];
}

const GateHistory = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<GateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchGateEntries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const fetchGateEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching gate entries...');
      // const response = await axios.get('http://localhost:3001/gate-entries', {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/gate-entries`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Response received:', response.data);
      setEntries(response.data);
    } catch (error: any) {
      console.error('Error fetching gate entries:', error);
      setError('Failed to fetch gate entries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const flattenedEntries = entries.flatMap(entry =>
    entry.items.map(item => ({
      ...item,
      entryId: entry.entryId,
      date: entry.date
    }))
  );

  const exportToCSV = () => {
    const headers = ['Entry Id', 'Invoice Number', 'Supplier Name', 'Item Name', 'Quantity', 'Price', 'Total', 'Date'];
    
    const csvData = flattenedEntries.map(item => [
      item.entryId,
      item.invoiceNumber,
      item.supplierName,
      item.itemName,
      item.quantity,
      item.unitPrice,
      item.totalPrice,
      new Date(item.date).toLocaleDateString()
    ].join(',')).join('\n');
  
    const csv = [headers.join(','), csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `gate-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  
  const filteredEntries = flattenedEntries.filter(entry => {
    const matchesSearch = 
      entry.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.entryId.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    const entryDate = new Date(entry.timestamp);
    const now = new Date();

    switch (dateFilter) {
      case 'today':
        return entryDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return entryDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now);
        monthAgo.setDate(now.getDate() - 30);
        return entryDate >= monthAgo;
      case 'custom':
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        return entryDate >= start && entryDate <= end;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading gate entries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">
          {error}
          <button 
            onClick={fetchGateEntries}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center rounded-lg">
        <h1 className="text-xl font-bold">Gate Entry History</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-indigo-200"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-indigo-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
      
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by supplier, item, invoice, or entry ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

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
            <>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </>
          )}
          <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download size={20} />
              <span>Export CSV</span>
            </button>
          <button
            onClick={fetchGateEntries}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 overflow-x-auto">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No entries found matching your search criteria
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-4 py-2">Entry ID</th>
                <th className="border px-4 py-2">Serial No</th>
                <th className="border px-4 py-2">Date & Time</th>
                <th className="border px-4 py-2">Invoice Number</th>
                <th className="border px-4 py-2">Supplier Name</th>
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Unit Price (₹)</th>
                <th className="border px-4 py-2">Total Price (₹)</th>
                <th className="border px-4 py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr key={`${entry.entryId}-${entry.serialNo}`} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{entry.entryId}</td>
                  <td className="border px-4 py-2 text-center">{entry.serialNo}</td>
                  <td className="border px-4 py-2">{new Date(entry.timestamp).toLocaleString()}</td>
                  <td className="border px-4 py-2">{entry.invoiceNumber}</td>
                  <td className="border px-4 py-2">{entry.supplierName}</td>
                  <td className="border px-4 py-2">{entry.itemName}</td>
                  <td className="border px-4 py-2 text-center">{entry.quantity}</td>
                  <td className="border px-4 py-2">₹{entry.unitPrice.toLocaleString()}</td>
                  <td className="border px-4 py-2">₹{entry.totalPrice.toLocaleString()}</td>
                  <td className="border px-4 py-2">{entry.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GateHistory;
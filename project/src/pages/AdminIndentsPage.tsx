

import { Check, Filter, LogOut, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PurchaseIndent {
  _id: string;
  psNo: string;
  date: string;
  department: string;
  items: {
    serialNo: number;
    itemDescription: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    deliveryRequired: string;
    remarks: string;
  }[];
  status: 'pending' | 'accepted' | 'rejected';
  deliveryStatus: 'not_delivered' | 'delivered' | 'out_for_delivery';
  deliveryRemarks: {
    remark: string;
    date: string;
  }[];
}

const AdminIndentsPage = () => {
  const navigate = useNavigate();
  const [indents, setIndents] = useState<PurchaseIndent[]>([]);
  const [filteredIndents, setFilteredIndents] = useState<PurchaseIndent[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newRemark, setNewRemark] = useState<string>('');
  const [editingIndentId, setEditingIndentId] = useState<string | null>(null);

  useEffect(() => {
    fetchIndents();
  }, []);

  const fetchIndents = async () => {
    try {
      setLoading(true);
      // const response = await fetch('http://localhost:3001/indents');
      // const response = await fetch('${import.meta.env.VITE_API_URL}/indents');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/indents`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setIndents(data);
      setFilteredIndents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredIndents(indents);
    } else {
      setFilteredIndents(indents.filter(indent => indent.status === statusFilter));
    }
  }, [statusFilter, indents]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeliveryStatusChange = async (indentId: string, newStatus: 'not_delivered' | 'delivered' | 'out_for_delivery') => {
    try {
      // const response = await fetch('http://localhost:3001/indents/update-delivery', {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/indents/update-delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          indentId,
          deliveryStatus: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update delivery status');
      }

      await fetchIndents();
    } catch (error) {
      console.error('Error updating delivery status:', error);
      alert('Failed to update delivery status');
    }
  };

  const handleRemarkSubmit = async (indentId: string) => {
    if (!newRemark.trim()) return;

    try {
      // const response = await fetch('http://localhost:3001/indents/update-delivery', {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/indents/update-delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          indentId,
          remark: newRemark,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add remark');
      }

      setNewRemark('');
      setEditingIndentId(null);
      await fetchIndents();
    } catch (error) {
      console.error('Error adding remark:', error);
      alert('Failed to add remark');
    }
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
          <h1 className="text-xl font-bold">Admin Indents Management</h1>
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
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Purchase Indents</h2>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">PS Number</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Items</th>
                  <th className="px-4 py-2">Total Value</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Delivery Status</th>
                  <th className="px-4 py-2">Delivery Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredIndents.map((indent) => (
                  <tr key={indent._id} className="border-t">
                    <td className="px-4 py-2">{indent.psNo}</td>
                    <td className="px-4 py-2">{new Date(indent.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{indent.department}</td>
                    <td className="px-4 py-2">
                      <details className="cursor-pointer">
                        <summary className="text-indigo-600 hover:text-indigo-700">
                          View Items ({indent.items.length})
                        </summary>
                        <div className="mt-2">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-2 py-1">Item</th>
                                <th className="px-2 py-1">Qty</th>
                                <th className="px-2 py-1">Price</th>
                                <th className="px-2 py-1">Total</th>
                                <th className="px-2 py-1">Delivery Date</th>
                                <th className="px-2 py-1">Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {indent.items.map((item) => (
                                <tr key={item.serialNo} className="border-t">
                                  <td className="px-2 py-1">{item.itemDescription}</td>
                                  <td className="px-2 py-1">{item.quantity}</td>
                                  <td className="px-2 py-1">₹{item.unitPrice.toLocaleString()}</td>
                                  <td className="px-2 py-1">₹{item.totalPrice.toLocaleString()}</td>
                                  <td className="px-2 py-1">{new Date(item.deliveryRequired).toLocaleDateString()}</td>
                                  <td className="px-2 py-1">{item.remarks}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </details>
                    </td>
                    <td className="px-4 py-2">
                      ₹{indent.items.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${indent.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                          indent.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {indent.status.charAt(0).toUpperCase() + indent.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={indent.deliveryStatus}
                        onChange={(e) => handleDeliveryStatusChange(indent._id, e.target.value as 'not_delivered' | 'out_for_delivery')}
                        disabled={indent.deliveryStatus === 'delivered'}
                        className={`px-2 py-1 rounded-lg border ${
                          indent.deliveryStatus === 'delivered' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : indent.deliveryStatus === 'out_for_delivery'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        <option value="not_delivered">Not Delivered</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        {indent.deliveryStatus === 'delivered' && (
                          <option value="delivered">Delivered</option>
                        )}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <div className="space-y-2">
                        {indent.deliveryRemarks.map((remark, index) => (
                          <div key={index} className="text-sm">
                            <div className="text-gray-600">{remark.remark}</div>
                            <div className="text-xs text-gray-400">
                              {new Date(remark.date).toLocaleString()}
                            </div>
                          </div>
                        ))}
                        {indent.deliveryStatus !== 'delivered' && (
                          <div>
                            {editingIndentId === indent._id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={newRemark}
                                  onChange={(e) => setNewRemark(e.target.value)}
                                  className="flex-1 px-2 py-1 border rounded"
                                  placeholder="Add a remark..."
                                />
                                <button
                                  onClick={() => handleRemarkSubmit(indent._id)}
                                  className="p-1 text-green-600 hover:text-green-700"
                                >
                                  <Check size={16} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setEditingIndentId(indent._id)}
                                className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
                              >
                                <MessageSquare size={16} />
                                <span className="text-sm">Add Remark</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIndentsPage;
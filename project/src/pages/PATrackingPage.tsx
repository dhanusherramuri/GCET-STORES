


import React, { useState, useEffect } from 'react';
import { LogOut, Package, Check } from 'lucide-react';
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
  }[];
  remarks: string;
  status: string;
  deliveryStatus: 'not_delivered' | 'out_for_delivery' | 'delivered';
  deliveryRemarks: {
    remark: string;
    date: string;
  }[];
}

const PATrackingPage = () => {
  const navigate = useNavigate();
  const [indents, setIndents] = useState<PurchaseIndent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const department = localStorage.getItem('Department') || '';

  useEffect(() => {
    fetchIndents();
  }, []);

  const fetchIndents = async () => {
    try {
      setLoading(true);
      // const response = await fetch('http://localhost:3001/indents');
      const response = await fetch('${import.meta.env.VITE_API_URL}/indents');
      if (!response.ok) {
        throw new Error('Failed to fetch indents');
      }
      const data = await response.json();
      // Filter indents for the specific department
      const filteredData = data.filter((indent: PurchaseIndent) => 
        indent.department === department && 
        indent.status === 'approved' &&
        indent.deliveryStatus !== 'delivered'
      );
      setIndents(filteredData);
    } catch (error) {
      console.error('Error fetching indents:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch indents');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Department');
    navigate('/login');
  };

  const handleReceived = async (indentId: string) => {
    try {
      // const response = await fetch('http://localhost:3001/indents/update-delivery', {
      const response = await fetch('${import.meta.env.VITE_API_URL}/indents/update-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          indentId,
          deliveryStatus: 'delivered',
          remark: `Received by ${department} on ${new Date().toLocaleString()}`
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
          <h1 className="text-xl font-bold">Order Tracking - {department}</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/student/consumables')}
              className="hover:text-indigo-200"
            >
              Material Requisition
            </button>
            <button
              onClick={() => navigate('/department-issue')}
              className="hover:text-indigo-200"
            >
              Department Issues
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">PS Number</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Items</th>
                  <th className="px-4 py-2">Total Value</th>
                  <th className="px-4 py-2">Delivery Status</th>
                  <th className="px-4 py-2">Delivery Remarks</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {indents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No pending orders found
                    </td>
                  </tr>
                ) : (
                  indents.map((indent) => (
                    <tr key={indent._id} className="border-t">
                      <td className="px-4 py-2">{indent.psNo}</td>
                      <td className="px-4 py-2">{new Date(indent.date).toLocaleDateString()}</td>
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
                          ${indent.deliveryStatus === 'out_for_delivery' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'}`}
                        >
                          {indent.deliveryStatus === 'out_for_delivery' ? 'Out for Delivery' : 'Not Delivered'}
                        </span>
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
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {indent.deliveryStatus === 'out_for_delivery' && (
                          <button
                            onClick={() => handleReceived(indent._id)}
                            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            <Check size={16} />
                            <span>Received</span>
                          </button>
                        )}
                      </td>
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

export default PATrackingPage;


import React, { useState, useEffect } from 'react';
import { LogOut, Check, X } from 'lucide-react';
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
  status: 'pending' | 'hod_approved' | 'principal_approved' | 'approved' | 'rejected';
  hodApproval?: {
    approved: boolean;
    date?: string;
  };
  principalApproval?: {
    approved: boolean;
    date?: string;
  };
  secretaryApproval?: {
    approved: boolean;
    date?: string;
  };
  deliveryStatus: 'not_delivered' | 'delivered';
  deliveryRemarks: {
    remark: string;
    date: string;
  }[];
}

const AcceptorPage = () => {
  const navigate = useNavigate();
  const [indents, setIndents] = useState<PurchaseIndent[]>([]);
  const [selectedIndents, setSelectedIndents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await fetch('http://localhost:3001/indents');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/indents`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }
        setIndents(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch data');
        setIndents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleCheckboxChange = (indentId: string) => {
    setSelectedIndents(prev =>
      prev.includes(indentId)
        ? prev.filter(id => id !== indentId)
        : [...prev, indentId]
    );
  };

  const canApprove = (indent: PurchaseIndent) => {
    switch (userRole) {
      case 'hod':
        return indent.status === 'pending';
      case 'principal':
        return indent.status === 'hod_approved';
      case 'secretary':
        return indent.status === 'principal_approved';
      default:
        return false;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending HOD Approval';
      case 'hod_approved':
        return 'Approved by HOD';
      case 'principal_approved':
        return 'Approved by Principal';
      case 'approved':
        return 'Fully Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    if (selectedIndents.length === 0) return;

    try {
      // const response = await fetch('http://localhost:3001/indents/update-status', {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/indents/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          indentIds: selectedIndents,
          status,
          approverRole: userRole
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh the data
      // const updatedResponse = await fetch('http://localhost:3001/indents');
      const updatedResponse = await fetch(`${import.meta.env.VITE_API_URL}/indents`);
      const updatedData = await updatedResponse.json();
      setIndents(updatedData);
      setSelectedIndents([]);
      
      alert(`Successfully ${status} selected indents`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert(`Failed to ${status} indents`);
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

  const filteredIndents = indents.filter(indent => {
    // Show all undelivered items regardless of approval status
    if (indent.deliveryStatus === 'not_delivered'&& indent.status != 'rejected') {
      switch (userRole) {
        case 'hod':
          return true; // Show all undelivered items to HOD
        case 'principal':
          return ['hod_approved', 'principal_approved', 'approved'].includes(indent.status);
        case 'secretary':
          return ['principal_approved', 'approved'].includes(indent.status);
        default:
          return true;
      }
    }
    return false; // Don't show delivered items
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Purchase Indent Review ({userRole?.toUpperCase()})
          </h1>
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
        <div className="mb-4 flex justify-end space-x-4">
          <button
            onClick={() => handleStatusUpdate('approved')}
            disabled={selectedIndents.length === 0}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={20} />
            <span>Approve Selected</span>
          </button>
          <button
            onClick={() => handleStatusUpdate('rejected')}
            disabled={selectedIndents.length === 0}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} />
            <span>Reject Selected</span>
          </button>
        </div>

        {filteredIndents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            No purchase indents found.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2">Select</th>
                    <th className="px-4 py-2">PS Number</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Items</th>
                    <th className="px-4 py-2">Total Value</th>
                    {/* <th className="px-4 py-2">Remarks</th> */}
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Approval History</th>
                    <th className="px-4 py-2">Delivery Status</th>
                    <th className="px-4 py-2">Delivery Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIndents.map((indent) => (
                    <tr key={indent._id} className="border-t">
                      <td className="px-4 py-2 text-center">
                        {canApprove(indent) && (
                          <input
                            type="checkbox"
                            checked={selectedIndents.includes(indent._id)}
                            onChange={() => handleCheckboxChange(indent._id)}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2">{indent.psNo}</td>
                      <td className="px-4 py-2">{new Date(indent.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{indent.department}</td>
                      <td className="px-4 py-2">
                        <details className="cursor-pointer">
                          <summary className="text-indigo-600 hover:text-indigo-700">
                            View Items ({indent.items?.length || 0})
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
                                {indent.items?.map((item) => (
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
                        ₹{indent.items?.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()}
                      </td>
                      {/* <td className="px-4 py-2">{indent.remarks}</td> */}
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${indent.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            indent.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {getStatusLabel(indent.status)}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <div className="space-y-1">
                          {indent.hodApproval?.approved && (
                            <div className="text-green-600">
                              HOD Approved: {new Date(indent.hodApproval.date!).toLocaleDateString()}
                            </div>
                          )}
                          {indent.principalApproval?.approved && (
                            <div className="text-green-600">
                              Principal Approved: {new Date(indent.principalApproval.date!).toLocaleDateString()}
                            </div>
                          )}
                          {indent.secretaryApproval?.approved && (
                            <div className="text-green-600">
                              Secretary Approved: {new Date(indent.secretaryApproval.date!).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${indent.deliveryStatus === 'delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {indent.deliveryStatus === 'delivered' ? 'Delivered' : 'Not Delivered'}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptorPage;
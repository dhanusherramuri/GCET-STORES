

import React, { useState } from 'react';
import { Plus, Save, LogOut } from 'lucide-react';
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
}

const GateEntryPage = () => {
  const navigate = useNavigate();
  const [entryId] = useState(`GE${Date.now()}`);
  const [items, setItems] = useState<GateEntryItem[]>([
    {
      serialNo: 1,
      invoiceNumber: '',
      supplierName: '',
      itemName: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
      remarks: ''
    }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const addNewItem = () => {
    setItems([
      ...items,
      {
        serialNo: items.length + 1,
        invoiceNumber: '',
        supplierName: '',
        itemName: '',
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        remarks: ''
      }
    ]);
  };

  const updateItem = (index: number, field: keyof GateEntryItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].totalPrice = 
        newItems[index].quantity * newItems[index].unitPrice;
    }

    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      entryId,
      date: new Date().toISOString(),
      items: items.map(({ serialNo, invoiceNumber, supplierName, itemName, quantity, unitPrice, totalPrice, remarks }) => ({
        serialNo,
        invoiceNumber,
        supplierName,
        itemName,
        quantity,
        unitPrice,
        totalPrice,
        remarks,
        timestamp: new Date().toISOString()
      }))
    };
  
    try {
      // const response = await axios.post('http://localhost:3001/gate-entry', payload);
      const response = await axios.post('${import.meta.env.VITE_API_URL}/gate-entry', payload);
      console.log('Response:', response.data);
      alert('Gate entry recorded successfully!');
      navigate('/gate-entry');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to record gate entry.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Gate Entry Form</h1>
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
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Entry ID</label>
              <input
                type="text"
                value={entryId}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date & Time</label>
              <input
                type="text"
                value={new Date().toLocaleString()}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mb-6">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">S.No</th>
                  <th className="px-4 py-2">Invoice Number</th>
                  <th className="px-4 py-2">Supplier Name</th>
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Unit Price (₹)</th>
                  <th className="px-4 py-2">Total Price (₹)</th>
                  <th className="px-4 py-2">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.serialNo}>
                    <td className="border px-4 py-2 text-center">{item.serialNo}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={item.invoiceNumber}
                        onChange={(e) => updateItem(index, 'invoiceNumber', e.target.value)}
                        className="w-full px-2 py-1"
                        required
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={item.supplierName}
                        onChange={(e) => updateItem(index, 'supplierName', e.target.value)}
                        className="w-full px-2 py-1"
                        required
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={item.itemName}
                        onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                        className="w-full px-2 py-1"
                        required
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                        className="w-full px-2 py-1"
                        required
                        min="1"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                        className="w-full px-2 py-1"
                        required
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        value={item.totalPrice}
                        readOnly
                        className="w-full px-2 py-1 bg-gray-100"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={item.remarks}
                        onChange={(e) => updateItem(index, 'remarks', e.target.value)}
                        className="w-full px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addNewItem}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus size={20} />
              <span>Add Item</span>
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Save size={20} />
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GateEntryPage;
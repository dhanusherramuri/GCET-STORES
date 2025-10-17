import React, { useState } from 'react';
import { Plus, Save, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import ProductPage from './ProductPage';

interface IndentItem {
  serialNo: number;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryRequired: string;
  remarks: string;
}

const departments = [
  'Computer Science Engineering',
  'Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Artificial Intellience',
  'Machine Learning',
  'Data Science',
  'Cyber Security'
];

const PurchaseIndentPage = () => {
  const navigate = useNavigate();
  const [psNo] = useState(`PI${Date.now()}`);
  const [department, setDepartment] = useState('');
  const [items, setItems] = useState<IndentItem[]>([
    {
      serialNo: 1,
      itemDescription: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
      deliveryRequired: '',
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
        itemDescription: '',
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        deliveryRequired: '',
        remarks: ''
      }
    ]);
  };

  const updateItem = (index: number, field: keyof IndentItem, value: string | number) => {
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
      psNo,
      date: new Date().toISOString(),
      department,
      items: items.map(({ serialNo,itemDescription, quantity,unitPrice,totalPrice,remarks }) => ({
        serialNo,
        itemDescription,
        quantity,
        unitPrice,
        totalPrice,
        remarks,
      })),
      status: 'pending', 
    };
  
    try {
      // const response = await axios.post('http://localhost:3001/pip', payload);
      const response = await axios.post('${import.meta.env.VITE_API_URL}/pip', payload);
      console.log('Response:', response.data);

  
      // console.log('Email sent:', emailInfo.messageId);
      alert('Purchase indent submitted successfully!');
      navigate('/purchase-indent')
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit purchase indent.');
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Purchase Indent Form</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">PS Number</label>
              <input
                type="text"
                value={psNo}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full mb-6">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">S.No</th>
                  <th className="px-4 py-2">Item Description</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2">Unit Price (₹)</th>
                  <th className="px-4 py-2">Total Price (₹)</th>
                  <th className="px-4 py-2">Delivery Required</th>
                  <th className="px-4 py-2">Remarks</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.serialNo}>
                    <td className="border px-4 py-2 text-center">{item.serialNo}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={item.itemDescription}
                        onChange={(e) => updateItem(index, 'itemDescription', e.target.value)}
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
                        type="date"
                        value={item.deliveryRequired}
                        onChange={(e) => updateItem(index, 'deliveryRequired', e.target.value)}
                        className="w-full px-2 py-1"
                        required
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
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value="PENDING"
                        readOnly
                        className="w-full px-2 py-1"
                      />
                    </td>
                  </tr>
                ))
                }
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

export default PurchaseIndentPage;
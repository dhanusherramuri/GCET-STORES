import React, { useState } from 'react';
import { LogOut, Plus, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConsumableItem {
  itemName: string;
  quantity: number;
  price: number;
  description: string;
}

const AdminConsumablePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ConsumableItem[]>([{
    itemName: '',
    quantity: 0,
    price: 0,
    description: ''
  }]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addNewItem = () => {
    setItems([...items, {
      itemName: '',
      quantity: 0,
      price: 0,
      description: ''
    }]);
  };

  const updateItem = (index: number, field: keyof ConsumableItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/consumables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (response.ok) {
        alert('Items added successfully!');
        setItems([{
          itemName: '',
          quantity: 0,
          price: 0,
          description: ''
        }]);
      } else {
        throw new Error('Failed to add items');
      }
    } catch (error) {
      console.error('Error adding items:', error);
      alert('Failed to add items');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Consumables Management</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/indents')}
              className="hover:text-indigo-200"
            >
              View Indents
            </button>
            <button
              onClick={() => navigate('/admin/student-consumables')}
              className="hover:text-indigo-200"
            >
              Student Purchases
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
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Consumable Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2">Item Name</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Price (₹)</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                          required
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                          className="w-full px-2 py-1 border rounded"
                          required
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                          className="w-full px-2 py-1 border rounded"
                          required
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default AdminConsumablePage;
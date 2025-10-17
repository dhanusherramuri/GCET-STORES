

import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Save, Search, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConsumableItem {
  _id?: string;
  itemName: string;
  quantity: number;
  price: number;
  description: string;
  category: string;
}

const AdminConsumablePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ConsumableItem[]>([{
    itemName: '',
    quantity: 0,
    price: 0,
    description: '',
    category: 'electronics'
  }]);
  const [existingItems, setExistingItems] = useState<ConsumableItem[]>([]);
  const [suggestions, setSuggestions] = useState<ConsumableItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    fetchExistingItems();
  }, []);

  const fetchExistingItems = async () => {
    try {
      // const response = await fetch('http://localhost:3001/consumables');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/consumables`);
      if (response.ok) {
        const data = await response.json();
        setExistingItems(data);
      }
    } catch (error) {
      console.error('Error fetching existing items:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addNewItem = () => {
    setItems([...items, {
      itemName: '',
      quantity: 0,
      price: 0,
      description: '',
      category: 'electronics'
    }]);
  };

  const updateItem = (index: number, field: keyof ConsumableItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setItems(newItems);

    if (field === 'itemName' && typeof value === 'string') {
      const searchTerm = value.toLowerCase();
      if (searchTerm) {
        const matches = existingItems.filter(item =>
          item.itemName.toLowerCase().includes(searchTerm)
        );
        setSuggestions(matches);
      } else {
        setSuggestions([]);
      }
    }
  };

  const selectSuggestion = (index: number, suggestion: ConsumableItem) => {
    const newItems = [...items];
    newItems[index] = {
      ...suggestion,
      quantity: 0
    };
    setItems(newItems);
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const itemsToUpdate = items.map(item => {
        const existingItem = existingItems.find(
          existing => existing.itemName.toLowerCase() === item.itemName.toLowerCase()
        );
        return {
          ...item,
          existingId: existingItem?._id
        };
      });

      // const response = await fetch('http://localhost:3001/consumables', {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/consumables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: itemsToUpdate }),
      });

      if (response.ok) {
        alert('Items processed successfully!');
        setItems([{
          itemName: '',
          quantity: 0,
          price: 0,
          description: '',
          category: 'electronics'
        }]);
        await fetchExistingItems();
      } else {
        throw new Error('Failed to process items');
      }
    } catch (error) {
      console.error('Error processing items:', error);
      alert('Failed to process items');
    }
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDelete = async () => {
    if (selectedItems.length === 0) {
      alert('Please select items to delete');
      return;
    }

    try {
      // const response = await fetch('http://localhost:3001/consumables/delete', {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/consumables/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemIds: selectedItems }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete items');
      }

      const result = await response.json();
      alert(result.message);
      setSelectedItems([]);
      setShowDeleteConfirmation(false);
      await fetchExistingItems();
    } catch (error) {
      console.error('Error deleting items:', error);
      alert('Failed to delete items');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Stock Management</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="hover:text-indigo-200"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/admin/inventory')}
              className="hover:text-indigo-200"
            >
              View Inventory
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Add Consumable Items</h2>
              {selectedItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={20} />
                  <span>Delete Selected ({selectedItems.length})</span>
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2">Select</th>
                    <th className="px-4 py-2">Item Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Price (₹)</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        {item._id && (
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item._id)}
                            onChange={() => toggleItemSelection(item._id!)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <div className="relative">
                          <input
                            type="text"
                            value={item.itemName}
                            onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                            required
                          />
                          {suggestions.length > 0 && item.itemName && (
                            <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
                              {suggestions.map((suggestion, i) => (
                                <div
                                  key={i}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => selectSuggestion(index, suggestion)}
                                >
                                  {suggestion.itemName}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {existingItems.some(
                          existing => existing.itemName.toLowerCase() === item.itemName.toLowerCase()
                        ) && (
                          <div className="text-xs text-yellow-600 mt-1">
                            This item exists - quantity will be added to existing stock
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={item.category}
                          onChange={(e) => updateItem(index, 'category', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                          required
                        >
                          <option value="electronics">Electronics</option>
                          <option value="stationary">Stationary</option>
                          <option value="lab equipment">Lab Equipment</option>
                          <option value="tools">Tools</option>
                        </select>
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete {selectedItems.length} selected item(s)? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConsumablePage;
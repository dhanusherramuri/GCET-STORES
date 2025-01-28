<<<<<<< HEAD


// import React, { useState, useEffect } from 'react';
// import { LogOut, Plus, Save } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface ConsumableItem {
//   itemName: string;
//   quantity: number;
//   price: number;
//   description: string;
// }

// const AdminConsumablePage = () => {
//   const navigate = useNavigate();
//   const [items, setItems] = useState<ConsumableItem[]>([{
//     itemName: '',
//     quantity: 0,
//     price: 0,
//     description: ''
//   }]);
//   const [existingItems, setExistingItems] = useState<ConsumableItem[]>([]);

//   useEffect(() => {
//     fetchExistingItems();
//   }, []);

//   const fetchExistingItems = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/consumables');
//       if (response.ok) {
//         const data = await response.json();
//         setExistingItems(data);
//       }
//     } catch (error) {
//       console.error('Error fetching existing items:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const addNewItem = () => {
//     setItems([...items, {
//       itemName: '',
//       quantity: 0,
//       price: 0,
//       description: ''
//     }]);
//   };

//   const updateItem = (index: number, field: keyof ConsumableItem, value: string | number) => {
//     const newItems = [...items];
//     newItems[index] = {
//       ...newItems[index],
//       [field]: value
//     };
//     setItems(newItems);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       // Check for existing items and prepare data
//       const itemsToUpdate = items.map(item => {
//         const existingItem = existingItems.find(
//           existing => existing.itemName.toLowerCase() === item.itemName.toLowerCase()
//         );
//         return {
//           ...item,
//           existingId: existingItem?._id
//         };
//       });

//       const response = await fetch('http://localhost:3001/consumables', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ items: itemsToUpdate }),
//       });

//       if (response.ok) {
//         alert('Items processed successfully!');
//         setItems([{
//           itemName: '',
//           quantity: 0,
//           price: 0,
//           description: ''
//         }]);
//         await fetchExistingItems(); // Refresh the list of existing items
//       } else {
//         throw new Error('Failed to process items');
//       }
//     } catch (error) {
//       console.error('Error processing items:', error);
//       alert('Failed to process items');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-indigo-600 text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">Admin Consumables Management</h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => navigate('/admin/inventory')}
//               className="hover:text-indigo-200"
//             >
//               View Inventory
//             </button>
//             <button
//               onClick={() => navigate('/admin/indents')}
//               className="hover:text-indigo-200"
//             >
//               View Indents
//             </button>
//             <button
//               onClick={() => navigate('/admin/student-consumables')}
//               className="hover:text-indigo-200"
//             >
//               View Purchases
//             </button>
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-2 hover:text-indigo-200"
//             >
//               <LogOut size={20} />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto p-6">
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Consumable Items</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="px-4 py-2">Item Name</th>
//                     <th className="px-4 py-2">Quantity</th>
//                     <th className="px-4 py-2">Price (₹)</th>
//                     <th className="px-4 py-2">Description</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {items.map((item, index) => (
//                     <tr key={index} className="border-t">
//                       <td className="px-4 py-2">
//                         <input
//                           type="text"
//                           value={item.itemName}
//                           onChange={(e) => updateItem(index, 'itemName', e.target.value)}
//                           className="w-full px-2 py-1 border rounded"
//                           required
//                         />
//                         {existingItems.some(
//                           existing => existing.itemName.toLowerCase() === item.itemName.toLowerCase()
//                         ) && (
//                           <div className="text-xs text-yellow-600 mt-1">
//                             This item exists - quantity will be added to existing stock
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-4 py-2">
//                         <input
//                           type="number"
//                           value={item.quantity}
//                           onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
//                           className="w-full px-2 py-1 border rounded"
//                           required
//                           min="0"
//                         />
//                       </td>
//                       <td className="px-4 py-2">
//                         <input
//                           type="number"
//                           value={item.price}
//                           onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
//                           className="w-full px-2 py-1 border rounded"
//                           required
//                           min="0"
//                           step="0.01"
//                         />
//                       </td>
//                       <td className="px-4 py-2">
//                         <input
//                           type="text"
//                           value={item.description}
//                           onChange={(e) => updateItem(index, 'description', e.target.value)}
//                           className="w-full px-2 py-1 border rounded"
//                           required
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="flex justify-between items-center">
//             <button
//               type="button"
//               onClick={addNewItem}
//               className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               <Plus size={20} />
//               <span>Add Item</span>
//             </button>
//             <button
//               type="submit"
//               className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
//             >
//               <Save size={20} />
//               <span>Submit</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminConsumablePage;

import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Save, Search } from 'lucide-react';
=======
import React, { useState } from 'react';
import { LogOut, Plus, Save } from 'lucide-react';
>>>>>>> 2d05b94 (Inital Commit.)
import { useNavigate } from 'react-router-dom';

interface ConsumableItem {
  itemName: string;
  quantity: number;
  price: number;
  description: string;
<<<<<<< HEAD
  category: string;
=======
>>>>>>> 2d05b94 (Inital Commit.)
}

const AdminConsumablePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ConsumableItem[]>([{
    itemName: '',
    quantity: 0,
    price: 0,
<<<<<<< HEAD
    description: '',
    category: 'electronics'
  }]);
  const [existingItems, setExistingItems] = useState<ConsumableItem[]>([]);
  const [suggestions, setSuggestions] = useState<ConsumableItem[]>([]);

  useEffect(() => {
    fetchExistingItems();
  }, []);

  const fetchExistingItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/consumables');
      if (response.ok) {
        const data = await response.json();
        setExistingItems(data);
      }
    } catch (error) {
      console.error('Error fetching existing items:', error);
    }
  };
=======
    description: ''
  }]);
>>>>>>> 2d05b94 (Inital Commit.)

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addNewItem = () => {
    setItems([...items, {
      itemName: '',
      quantity: 0,
      price: 0,
<<<<<<< HEAD
      description: '',
      category: 'electronics'
=======
      description: ''
>>>>>>> 2d05b94 (Inital Commit.)
    }]);
  };

  const updateItem = (index: number, field: keyof ConsumableItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setItems(newItems);
<<<<<<< HEAD

    // Update suggestions when itemName changes
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
      quantity: 0 // Reset quantity for new addition
    };
    setItems(newItems);
    setSuggestions([]);
=======
>>>>>>> 2d05b94 (Inital Commit.)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    
    try {
      // Check for existing items and prepare data
      const itemsToUpdate = items.map(item => {
        const existingItem = existingItems.find(
          existing => existing.itemName.toLowerCase() === item.itemName.toLowerCase()
        );
        return {
          ...item,
          existingId: existingItem?._id
        };
      });

=======
    try {
>>>>>>> 2d05b94 (Inital Commit.)
      const response = await fetch('http://localhost:3001/consumables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< HEAD
        body: JSON.stringify({ items: itemsToUpdate }),
      });

      if (response.ok) {
        alert('Items processed successfully!');
=======
        body: JSON.stringify({ items }),
      });

      if (response.ok) {
        alert('Items added successfully!');
>>>>>>> 2d05b94 (Inital Commit.)
        setItems([{
          itemName: '',
          quantity: 0,
          price: 0,
<<<<<<< HEAD
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
=======
          description: ''
        }]);
      } else {
        throw new Error('Failed to add items');
      }
    } catch (error) {
      console.error('Error adding items:', error);
      alert('Failed to add items');
>>>>>>> 2d05b94 (Inital Commit.)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
<<<<<<< HEAD
          <h1 className="text-xl font-bold">Admin Stock Management</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/inventory')}
              className="hover:text-indigo-200"
            >
              View Inventory
            </button>
            <button
=======
          <h1 className="text-xl font-bold">Admin Consumables Management</h1>
          <div className="flex items-center space-x-4">
            <button
>>>>>>> 2d05b94 (Inital Commit.)
              onClick={() => navigate('/admin/indents')}
              className="hover:text-indigo-200"
            >
              View Indents
            </button>
            <button
              onClick={() => navigate('/admin/student-consumables')}
              className="hover:text-indigo-200"
            >
<<<<<<< HEAD
              View MIR's
            </button>
            <button
              onClick={() => navigate('/admin/history')}
              className="hover:text-indigo-200"
            >
              View History
            </button>
            <button
              onClick={() => navigate('/GateHistory')}
              className="hover:text-indigo-200"
            >
              Gate History
=======
              Student Purchases
>>>>>>> 2d05b94 (Inital Commit.)
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
<<<<<<< HEAD
                    <th className="px-4 py-2">Category</th>
=======
>>>>>>> 2d05b94 (Inital Commit.)
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Price (₹)</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
<<<<<<< HEAD
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
=======
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                          required
                        />
>>>>>>> 2d05b94 (Inital Commit.)
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
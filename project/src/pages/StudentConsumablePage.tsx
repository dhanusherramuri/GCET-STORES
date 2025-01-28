// import React, { useState, useEffect } from 'react';
// import { LogOut, ShoppingCart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface ConsumableItem {
//   _id: string;
//   itemName: string;
//   quantity: number;
//   price: number;
//   description: string;
// }

// interface PurchaseOrder {
//   itemId: string;
//   quantity: number;
// }

// const StudentConsumablePage = () => {
//   const navigate = useNavigate();
//   const [items, setItems] = useState<ConsumableItem[]>([]);
//   const [cart, setCart] = useState<PurchaseOrder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:3001/consumables');
//         if (!response.ok) {
//           throw new Error('Failed to fetch items');
//         }
//         const data = await response.json();
//         setItems(data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         setError(error instanceof Error ? error.message : 'Failed to fetch items');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const addToCart = (itemId: string) => {
//     setCart(prev => {
//       const existingItem = prev.find(item => item.itemId === itemId);
//       if (existingItem) {
//         return prev.map(item =>
//           item.itemId === itemId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { itemId, quantity: 1 }];
//     });
//   };

//   const updateCartQuantity = (itemId: string, quantity: number) => {
//     if (quantity <= 0) {
//       setCart(prev => prev.filter(item => item.itemId !== itemId));
//     } else {
//       setCart(prev =>
//         prev.map(item =>
//           item.itemId === itemId
//             ? { ...item, quantity }
//             : item
//         )
//       );
//     }
//   };

//   const handlePurchase = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/purchase', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: cart,
//           studentId: localStorage.getItem('uname'), // Assuming you store userId in localStorage
//         }),
//       });

//       if (response.ok) {
//         alert('Purchase successful!');
//         setCart([]);
//         // Refresh items list to get updated quantities
//         const updatedItems = await fetch('http://localhost:3001/consumables').then(res => res.json());
//         setItems(updatedItems);
//       } else {
//         throw new Error('Purchase failed');
//       }
//     } catch (error) {
//       console.error('Error making purchase:', error);
//       alert('Failed to complete purchase');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-lg text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-lg text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-indigo-600 text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">Student Consumables</h1>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <ShoppingCart size={24} className="text-white" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cart.reduce((sum, item) => sum + item.quantity, 0)}
//                 </span>
//               )}
//             </div>
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
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {items.map((item) => (
//             <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.itemName}</h3>
//               <p className="text-gray-600 mb-4">{item.description}</p>
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-bold text-indigo-600">₹{item.price}</span>
//                 <span className="text-sm text-gray-500">Available: {item.quantity}</span>
//               </div>
//               {cart.find(cartItem => cartItem.itemId === item._id) ? (
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => updateCartQuantity(item._id, (cart.find(i => i.itemId === item._id)?.quantity || 1) - 1)}
//                     className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
//                   >
//                     -
//                   </button>
//                   <span className="mx-4">
//                     {cart.find(i => i.itemId === item._id)?.quantity || 0}
//                   </span>
//                   <button
//                     onClick={() => updateCartQuantity(item._id, (cart.find(i => i.itemId === item._id)?.quantity || 0) + 1)}
//                     className="px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
//                     disabled={item.quantity <= (cart.find(i => i.itemId === item._id)?.quantity || 0)}
//                   >
//                     +
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => addToCart(item._id)}
//                   className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//                   disabled={item.quantity === 0}
//                 >
//                   {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {cart.length > 0 && (
//           <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
//             <div className="container mx-auto flex justify-between items-center">
//               <div className="text-lg">
//                 Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
//               </div>
//               <button
//                 onClick={handlePurchase}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Complete Purchase
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentConsumablePage;

<<<<<<< HEAD
// import  { useState, useEffect } from 'react';
// import { LogOut, ShoppingCart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface ConsumableItem {
//   _id: string;
//   itemName: string;
//   quantity: number;
//   price: number;
//   description: string;
// }

// interface CartItem {
//   itemId: string;
//   itemName: string;
//   quantity: number;
//   price: number;
// }

// const StudentConsumablePage = () => {
//   const navigate = useNavigate();
//   const [items, setItems] = useState<ConsumableItem[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:3001/consumables');
//         if (!response.ok) {
//           throw new Error('Failed to fetch items');
//         }
//         const data = await response.json();
//         setItems(data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         setError(error instanceof Error ? error.message : 'Failed to fetch items');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const addToCart = (item: ConsumableItem) => {
//     setCart(prev => {
//       const existingItem = prev.find(cartItem => cartItem.itemId === item._id);
//       if (existingItem) {
//         return prev.map(cartItem =>
//           cartItem.itemId === item._id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prev, {
//         itemId: item._id,
//         itemName: item.itemName,
//         quantity: 1,
//         price: item.price
//       }];
//     });
//   };

//   const updateCartQuantity = (itemId: string, quantity: number) => {
//     if (quantity <= 0) {
//       setCart(prev => prev.filter(item => item.itemId !== itemId));
//     } else {
//       setCart(prev =>
//         prev.map(item =>
//           item.itemId === itemId
//             ? { ...item, quantity }
//             : item
//         )
//       );
//     }
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const handlePurchase = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/purchase', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: cart.map(item => ({
//             itemId: item.itemId,
//             quantity: item.quantity,
//             itemName: item.itemName
//           })),
//           studentId: localStorage.getItem('uname'),
//         }),
//       });

//       if (response.ok) {
//         alert('Purchase successful!');
//         setCart([]);
//         // Refresh items list to get updated quantities
//         const updatedItems = await fetch('http://localhost:3001/consumables').then(res => res.json());
//         setItems(updatedItems);
//       } else {
//         throw new Error('Purchase failed');
//       }
//     } catch (error) {
//       console.error('Error making purchase:', error);
//       alert('Failed to complete purchase');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-lg text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-lg text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-indigo-600 text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">Student Consumables</h1>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <ShoppingCart size={24} className="text-white" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cart.reduce((sum, item) => sum + item.quantity, 0)}
//                 </span>
//               )}
//             </div>
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
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {items.map((item) => (
//             <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.itemName}</h3>
//               <p className="text-gray-600 mb-4">{item.description}</p>
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-bold text-indigo-600">₹{item.price}</span>
//                 <span className="text-sm text-gray-500">Available: {item.quantity}</span>
//               </div>
//               {cart.find(cartItem => cartItem.itemId === item._id) ? (
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => updateCartQuantity(item._id, (cart.find(i => i.itemId === item._id)?.quantity || 1) - 1)}
//                     className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
//                   >
//                     -
//                   </button>
//                   <span className="mx-4">
//                     {cart.find(i => i.itemId === item._id)?.quantity || 0}
//                   </span>
//                   <button
//                     onClick={() => updateCartQuantity(item._id, (cart.find(i => i.itemId === item._id)?.quantity || 0) + 1)}
//                     className="px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
//                     disabled={item.quantity <= (cart.find(i => i.itemId === item._id)?.quantity || 0)}
//                   >
//                     +
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => addToCart(item)}
//                   className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//                   disabled={item.quantity === 0}
//                 >
//                   {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {cart.length > 0 && (
//           <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
//             <div className="container mx-auto flex justify-between items-center">
//               <div className="flex items-center space-x-8">
//                 <div className="text-lg">
//                   Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
//                 </div>
//                 <div className="text-lg font-semibold text-indigo-600">
//                   Total Amount: ₹{calculateTotal().toLocaleString()}
//                 </div>
//               </div>
//               <button
//                 onClick={handlePurchase}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Complete Purchase
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentConsumablePage;


// import React, { useState, useEffect } from 'react';
// import { LogOut, ShoppingCart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface ConsumableItem {
//   _id: string;
//   itemName: string;
//   quantity: number;
//   price: number;
//   description: string;
// }

// interface CartItem {
//   itemId: string;
//   itemName: string;
//   quantity: number;
//   price: number;
// }

// const StudentConsumablePage = () => {
//   const navigate = useNavigate();
//   const [items, setItems] = useState<ConsumableItem[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const userRole = localStorage.getItem('userRole');

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:3001/consumables');
//         if (!response.ok) {
//           throw new Error('Failed to fetch items');
//         }
//         const data = await response.json();
//         setItems(data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         setError(error instanceof Error ? error.message : 'Failed to fetch items');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const addToCart = (item: ConsumableItem) => {
//     setCart(prev => {
//       const existingItem = prev.find(cartItem => cartItem.itemId === item._id);
//       if (existingItem) {
//         return prev.map(cartItem =>
//           cartItem.itemId === item._id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prev, {
//         itemId: item._id,
//         itemName: item.itemName,
//         quantity: 1,
//         price: item.price
//       }];
//     });
//   };

//   const updateCartQuantity = (itemId: string, quantity: number) => {
//     if (quantity <= 0) {
//       setCart(prev => prev.filter(item => item.itemId !== itemId));
//     } else {
//       setCart(prev =>
//         prev.map(item =>
//           item.itemId === itemId
//             ? { ...item, quantity }
//             : item
//         )
//       );
//     }
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const handlePurchase = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/purchase', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: cart.map(item => ({
//             itemId: item.itemId,
//             quantity: item.quantity,
//             itemName: item.itemName
//           })),
//           studentId: localStorage.getItem('uname'),
//         }),
//       });

//       if (response.ok) {
//         alert('Purchase successful!');
//         setCart([]);
//         // Refresh items list to get updated quantities
//         const updatedItems = await fetch('http://localhost:3001/consumables').then(res => res.json());
//         setItems(updatedItems);
//       } else {
//         throw new Error('Purchase failed');
//       }
//     } catch (error) {
//       console.error('Error making purchase:', error);
//       alert('Failed to complete purchase');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-lg text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-lg text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-indigo-600 text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold"> Consumables</h1>
//           <div className="flex items-center space-x-4">
//             {userRole === 'pa' && (
//               <button
//                 onClick={() => navigate('/pa/tracking')}
//                 className="hover:text-indigo-200"
//               >
//                 Track Orders
//               </button>
//             )}
//             <div className="relative">
//               <ShoppingCart size={24} className="text-white" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cart.reduce((sum, item) => sum + item.quantity, 0)}
//                 </span>
//               )}
//             </div>
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
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {items.map((item) => (
//             <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.itemName}</h3>
//               <p className="text-gray-600 mb-4">{item.description}</p>
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-bold text-indigo-600">₹{item.price}</span>
//                 <span className="text-sm text-gray-500">Available: {item.quantity}</span>
//               </div>
//               {cart.find(cartItem => cartItem.itemId === item._id) ? (
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => updateCartQuantity(item._id, (cart.find(i => i.itemId === item._id)?.quantity || 1) - 1)}
//                     className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
//                   >
//                     -
//                   </button>
//                   <span className="mx-4">
//                     {cart.find(i => i.itemId === item._id)?.quantity || 0}
//                   </span>
//                   <button
//                     onClick={() => updateCartQuantity(item._id, (cart.find(i => i.itemId === item._id)?.quantity || 0) + 1)}
//                     className="px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
//                     disabled={item.quantity <= (cart.find(i => i.itemId === item._id)?.quantity || 0)}
//                   >
//                     +
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => addToCart(item)}
//                   className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//                   disabled={item.quantity === 0}
//                 >
//                   {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {cart.length > 0 && (
//           <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
//             <div className="container mx-auto flex justify-between items-center">
//               <div className="flex items-center space-x-8">
//                 <div className="text-lg">
//                   Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
//                 </div>
//                 <div className="text-lg font-semibold text-indigo-600">
//                   Total Amount: ₹{calculateTotal().toLocaleString()}
//                 </div>
//               </div>
//               <button
//                 onClick={handlePurchase}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Complete Purchase
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentConsumablePage;

import React, { useState, useEffect } from 'react';
import { LogOut, ShoppingCart, Search, X } from 'lucide-react';
=======
import React, { useState, useEffect } from 'react';
import { LogOut, ShoppingCart } from 'lucide-react';
>>>>>>> 2d05b94 (Inital Commit.)
import { useNavigate } from 'react-router-dom';

interface ConsumableItem {
  _id: string;
  itemName: string;
  quantity: number;
  price: number;
  description: string;
<<<<<<< HEAD
  category: string;
=======
>>>>>>> 2d05b94 (Inital Commit.)
}

interface CartItem {
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
}

const StudentConsumablePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ConsumableItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
<<<<<<< HEAD
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userRole = localStorage.getItem('userRole');

  const categories = ['all', 'electronics', 'stationary', 'lab equipment', 'tools','sanitary'];
=======
>>>>>>> 2d05b94 (Inital Commit.)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/consumables');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

<<<<<<< HEAD
  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

=======
>>>>>>> 2d05b94 (Inital Commit.)
  const addToCart = (item: ConsumableItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.itemId === item._id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.itemId === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, {
        itemId: item._id,
        itemName: item.itemName,
        quantity: 1,
        price: item.price
      }];
    });
<<<<<<< HEAD
    setShowCart(true);
=======
>>>>>>> 2d05b94 (Inital Commit.)
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.itemId !== itemId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.itemId === itemId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePurchase = async () => {
<<<<<<< HEAD
    setShowConfirmation(true);
  };

  const confirmPurchase = async () => {
=======
>>>>>>> 2d05b94 (Inital Commit.)
    try {
      const response = await fetch('http://localhost:3001/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            itemId: item.itemId,
            quantity: item.quantity,
            itemName: item.itemName
          })),
          studentId: localStorage.getItem('uname'),
        }),
      });

      if (response.ok) {
        alert('Purchase successful!');
        setCart([]);
<<<<<<< HEAD
        setShowCart(false);
        setShowConfirmation(false);
=======
        // Refresh items list to get updated quantities
>>>>>>> 2d05b94 (Inital Commit.)
        const updatedItems = await fetch('http://localhost:3001/consumables').then(res => res.json());
        setItems(updatedItems);
      } else {
        throw new Error('Purchase failed');
      }
    } catch (error) {
      console.error('Error making purchase:', error);
      alert('Failed to complete purchase');
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
<<<<<<< HEAD
          <h1 className="text-xl font-bold">Material Issue Requisition</h1>
          <div className="flex items-center space-x-4">
            {userRole === 'pa' && (
              <button
                onClick={() => navigate('/pa/tracking')}
                className="hover:text-indigo-200"
              >
                Track Orders
              </button>
            )}
            <button
              onClick={() => setShowCart(true)}
              className="relative hover:text-indigo-200"
            >
              <ShoppingCart size={24} />
=======
          <h1 className="text-xl font-bold">Student Consumables</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart size={24} className="text-white" />
>>>>>>> 2d05b94 (Inital Commit.)
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
<<<<<<< HEAD
            </button>
=======
            </div>
>>>>>>> 2d05b94 (Inital Commit.)
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
<<<<<<< HEAD
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
=======
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
>>>>>>> 2d05b94 (Inital Commit.)
            <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.itemName}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-indigo-600">₹{item.price}</span>
                <span className="text-sm text-gray-500">Available: {item.quantity}</span>
              </div>
<<<<<<< HEAD
              <button
                onClick={() => addToCart(item)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                disabled={item.quantity === 0}
              >
                {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 flex flex-col h-[calc(100vh-180px)] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.itemId} className="flex justify-between items-center mb-4 p-2 border rounded">
                  <div>
                    <h3 className="font-semibold">{item.itemName}</h3>
                    <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateCartQuantity(item.itemId, item.quantity - 1)}
                      className="px-2 py-1 bg-red-100 text-red-600 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.itemId, item.quantity + 1)}
                      className="px-2 py-1 bg-green-100 text-green-600 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-indigo-600">₹{calculateTotal()}</span>
              </div>
              <button
                onClick={handlePurchase}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                disabled={cart.length === 0}
              >
                Proceed to Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to purchase these items? Total amount: ₹{calculateTotal()}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
=======
              {cart.find(cartItem => cartItem.itemId === item._id) ? (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => updateCartQuantity(item._id, (cart.find(i => i.itemId === item._id)?.quantity || 1) - 1)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    -
                  </button>
                  <span className="mx-4">
                    {cart.find(i => i.itemId === item._id)?.quantity || 0}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item._id, (cart.find(i => i.itemId === item._id)?.quantity || 0) + 1)}
                    className="px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                    disabled={item.quantity <= (cart.find(i => i.itemId === item._id)?.quantity || 0)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  disabled={item.quantity === 0}
                >
                  {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              )}
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-8">
                <div className="text-lg">
                  Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div className="text-lg font-semibold text-indigo-600">
                  Total Amount: ₹{calculateTotal().toLocaleString()}
                </div>
              </div>
              <button
                onClick={handlePurchase}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        )}
      </div>
>>>>>>> 2d05b94 (Inital Commit.)
    </div>
  );
};

export default StudentConsumablePage;
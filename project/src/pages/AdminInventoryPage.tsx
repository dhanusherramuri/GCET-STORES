// import React, { useState, useEffect } from 'react';
// import { Package, LogOut,Search, Plus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // interface ConsumableItem {
// //   _id: string;
// //   itemName: string;
// //   quantity: number;
// //   price: number;
// //   description: string;
// //   category: string;
// // }
// interface Product {
//   _id: string;
//   itemName: string;
//   quantity: number;
//   description: string;
//   price: number;
// }

// const AdminInventoryPage = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   // const [items, setItems] = useState<ConsumableItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
//   const [quantityToAdd, setQuantityToAdd] = useState<number>(0);
//   const [cost, setcost] = useState<number>(0);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:3001/consumables');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       setProducts(data);
//       // setItems(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError(error instanceof Error ? error.message : 'Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const filteredItems = products.filter(product => {
//     const matchesSearch = product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
//     return matchesSearch;
//   }); 

//   const handleUpdateQuantity = async () => {
//     if (!selectedProduct || quantityToAdd <= 0|| cost <=0) return;

//     try {
//       const response = await fetch('http://localhost:3001/consumables/update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           itemId: selectedProduct,
//           quantityToAdd: quantityToAdd,
//           cost : cost
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update quantity');
//       }

//       await fetchProducts();
//       setShowUpdateModal(false);
//       setSelectedProduct(null);
//       setQuantityToAdd(0);
//       setcost(0)
//       alert('Quantity updated successfully!');
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//       alert('Failed to update quantity');
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
//           <h1 className="text-xl font-bold">Inventory Monitor</h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => navigate('/admin/consumables')}
//               className="hover:text-indigo-200"
//             >
//               Manage Consumables
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
//               View MIR's
//             </button>
//             <button
//               onClick={() => navigate('/admin/history')}
//               className="hover:text-indigo-200"
//             >
//               <button
//               onClick={() => navigate('/material-issue')}
//               className="hover:text-indigo-200"
//             >
//               ISSUE
//             </button>
//             <button
//               onClick={() => navigate('/material-issue-history')}
//               className="hover:text-indigo-200"
//             >
//               Issue History
//             </button>
//               View History
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
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventory Status</h2>
//         <div className="mb-6 flex flex-wrap gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search items..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//           </div>
//         </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredItems.map((product) => (
//             <div
//             key={product._id}
//             className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
//               product.quantity < 20 
//                 ? 'shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]' 
//                 : 'shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]'
//             }`}
//           >
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold text-gray-800">{product.itemName}</h3>
//                 <Package 
//                   className={product.quantity < 20 ? 'text-red-500' : 'text-green-500'} 
//                   size={24} 
//                 />
//               </div>
//               <p className="text-gray-600 mb-4">{product.description}</p>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">Available Stock:</span>
//                 <span className={`text-lg font-semibold ${
//                   product.quantity < 20 ? 'text-red-600' : 'text-green-600'
//                 }`}>
//                   {product.quantity}
//                 </span>
//               </div>
//               <div className="mt-2 flex items-center justify-between">
//                 <span className="text-sm text-gray-500">Unit Price:</span>
//                 <span className="text-lg font-semibold text-indigo-600">
//                   ₹{product.price.toLocaleString()}
//                 </span>
//               </div>
//               {product.quantity < 20 && (
//                 <div className="mt-4 bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm">
//                   Low stock alert! Consider restocking soon.
//                 </div>
//               )}
//               <button
//                 onClick={() => {
//                   setSelectedProduct(product._id);
//                   setShowUpdateModal(true);
//                 }}
//                 className="mt-4 w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//               >
//                 <Plus size={20} />
//                 <span>Add Stock</span>
//               </button>
//             </div>
//             <div 
//               className={`h-2 w-full ${
//                 product.quantity < 20 ? 'bg-red-500' : 'bg-green-500'
//               }`}
//             />
//           </div>
            
//           ))}
//         </div>
//         {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
//                 product.quantity < 20 
//                   ? 'shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]' 
//                   : 'shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]'
//               }`}
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-xl font-semibold text-gray-800">{product.itemName}</h3>
//                   <Package 
//                     className={product.quantity < 20 ? 'text-red-500' : 'text-green-500'} 
//                     size={24} 
//                   />
//                 </div>
//                 <p className="text-gray-600 mb-4">{product.description}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Available Stock:</span>
//                   <span className={`text-lg font-semibold ${
//                     product.quantity < 20 ? 'text-red-600' : 'text-green-600'
//                   }`}>
//                     {product.quantity}
//                   </span>
//                 </div>
//                 <div className="mt-2 flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Unit Price:</span>
//                   <span className="text-lg font-semibold text-indigo-600">
//                     ₹{product.price.toLocaleString()}
//                   </span>
//                 </div>
//                 {product.quantity < 20 && (
//                   <div className="mt-4 bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm">
//                     Low stock alert! Consider restocking soon.
//                   </div>
//                 )}
//                 <button
//                   onClick={() => {
//                     setSelectedProduct(product._id);
//                     setShowUpdateModal(true);
//                   }}
//                   className="mt-4 w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//                 >
//                   <Plus size={20} />
//                   <span>Add Stock</span>
//                 </button>
//               </div>
//               <div 
//                 className={`h-2 w-full ${
//                   product.quantity < 20 ? 'bg-red-500' : 'bg-green-500'
//                 }`}
//               />
//             </div>
//           ))}
//         </div> */}
//       </div>

//       {/* Update Quantity Modal */}
//       {showUpdateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-96">
//             <h3 className="text-xl font-semibold mb-4">Update Stock Quantity</h3>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Quantity to Add
//               </label>
//               <input
//                 type="number"
//                 value={quantityToAdd}
//                 onChange={(e) => setQuantityToAdd(parseInt(e.target.value))}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 min="1"
//               />
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Cost
//               </label>
//               <input
//                 type="number"
//                 value={cost}
//                 onChange={(e) => setcost(parseInt(e.target.value))}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 min="1"
//               />
//             </div>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => {
//                   setShowUpdateModal(false);
//                   setSelectedProduct(null);
//                   setQuantityToAdd(0);
//                 }}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdateQuantity}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminInventoryPage;

import React, { useState, useEffect } from 'react';
import { Package, LogOut, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  itemName: string;
  quantity: number;
  description: string;
  price: number;
}

const AdminInventoryPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState<number>(0);
  const [cost, setcost] = useState<number>(0);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/consumables');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredItems = products.filter(product => {
    const matchesSearch = product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  }); 

  const handleUpdateQuantity = async () => {
    if (!selectedProduct || quantityToAdd <= 0|| cost <=0) return;

    try {
      const response = await fetch('http://localhost:3001/consumables/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: selectedProduct,
          quantityToAdd: quantityToAdd,
          cost : cost
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      await fetchProducts();
      setShowUpdateModal(false);
      setSelectedProduct(null);
      setQuantityToAdd(0);
      setcost(0)
      alert('Quantity updated successfully!');
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
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
          <h1 className="text-xl font-bold">Inventory Monitor</h1>
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventory Status</h2>
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
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((product) => (
            <div
            key={product._id}
            className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
              product.quantity < 20 
                ? 'shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]' 
                : 'shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.itemName}</h3>
                <Package 
                  className={product.quantity < 20 ? 'text-red-500' : 'text-green-500'} 
                  size={24} 
                />
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Available Stock:</span>
                <span className={`text-lg font-semibold ${
                  product.quantity < 20 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {product.quantity}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">Unit Price:</span>
                <span className="text-lg font-semibold text-indigo-600">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
              {product.quantity < 20 && (
                <div className="mt-4 bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm">
                  Low stock alert! Consider restocking soon.
                </div>
              )}
              <button
                onClick={() => {
                  setSelectedProduct(product._id);
                  setShowUpdateModal(true);
                }}
                className="mt-4 w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                <Plus size={20} />
                <span>Add Stock</span>
              </button>
            </div>
            <div 
              className={`h-2 w-full ${
                product.quantity < 20 ? 'bg-red-500' : 'bg-green-500'
              }`}
            />
          </div>
            
          ))}
        </div>
      </div>

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Update Stock Quantity</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity to Add
              </label>
              <input
                type="number"
                value={quantityToAdd}
                onChange={(e) => setQuantityToAdd(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setcost(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedProduct(null);
                  setQuantityToAdd(0);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateQuantity}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventoryPage;
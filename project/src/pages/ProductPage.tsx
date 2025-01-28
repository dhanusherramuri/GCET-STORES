<<<<<<< HEAD
// import React from 'react';
// import { Package, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface Product {
//   id: string;
//   name: string;
//   quantity: number;
//   description: string;
//   image: string;
// }

// const ProductPage = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const products: Product[] = [
//     {
//       id: '1',
//       name: 'Laboratory Equipment',
//       quantity: 50,
//       description: 'High-quality microscopes for biology lab',
//       image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400',
//     },
//     {
//       id: '2',
//       name: 'Computer Hardware',
//       quantity: 100,
//       description: 'Desktop computers for computer lab',
//       image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=400',
//     },
//     {
//       id: '3',
//       name: 'Sports Equipment',
//       quantity: 75,
//       description: 'Various sports equipment for physical education',
//       image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=400',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-indigo-600 text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">College Inventory</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center space-x-2 hover:text-indigo-200"
//           >
//             <LogOut size={20} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </nav>

//       <div className="container mx-auto p-6">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Items</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
//                   <Package className="text-indigo-600" size={24} />
//                 </div>
//                 <p className="text-gray-600 mb-2">{product.description}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Available Quantity:</span>
//                   <span className="text-lg font-semibold text-indigo-600">{product.quantity}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

=======
>>>>>>> 2d05b94 (Inital Commit.)
import React from 'react';
import { Package, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  quantity: number;
  description: string;
  image: string;
}

const ProductPage = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const userRole = localStorage.getItem('userRole');
=======
>>>>>>> 2d05b94 (Inital Commit.)

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Laboratory Equipment',
      quantity: 50,
      description: 'High-quality microscopes for biology lab',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '2',
      name: 'Computer Hardware',
      quantity: 100,
      description: 'Desktop computers for computer lab',
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '3',
      name: 'Sports Equipment',
      quantity: 75,
      description: 'Various sports equipment for physical education',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">College Inventory</h1>
<<<<<<< HEAD
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
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-indigo-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
=======
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-indigo-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
>>>>>>> 2d05b94 (Inital Commit.)
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <Package className="text-indigo-600" size={24} />
                </div>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Available Quantity:</span>
                  <span className="text-lg font-semibold text-indigo-600">{product.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
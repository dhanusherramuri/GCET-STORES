

import React, { useState, useEffect } from 'react';
import { Package, LogOut, Search, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  itemName: string;
  quantity: number;
  description: string;
  price: number;
}

const MaterialIssuePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantityToIssue, setQuantityToIssue] = useState<number>(0);
  const [department, setDepartment] = useState<string>('');
  const [issuerName, setIssuerName] = useState<string>('');
  const [requiredQty, setRequiredQty] = useState<number>(0);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueId] = useState(`MIR${Date.now()}`);

  const departments = [
    { value: 'Computer Science Engineering', label: 'CSE' },
    { value: 'Cyber Security', label: 'CS' },
    { value: 'Electronics Engineering', label: 'ECE' },
    { value: 'Mechanical Engineering', label: 'MECH' },
    { value: 'Civil Engineering', label: 'CIVIL' },
    { value: 'Electrical and Electronics Engineering', label: 'EEE' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // const response = await fetch('http://localhost:3001/consumables');
      const response = await fetch('${import.meta.env.VITE_API_URL}/consumables');
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

  const handleIssueItem = async () => {
    if (!selectedProduct || quantityToIssue <= 0 || !department || !issuerName) return;

    try {
      // const response = await fetch('http://localhost:3001/material-issue', {
      const response = await fetch('${import.meta.env.VITE_API_URL}/material-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueId,
          itemId: selectedProduct,
          issuedQty: quantityToIssue,
          requiredQty,
          department,
          issuerName,
          date: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to issue material');
      }

      await fetchProducts();
      setShowIssueModal(false);
      setSelectedProduct(null);
      setQuantityToIssue(0);
      setRequiredQty(0);
      setDepartment('');
      setIssuerName('');
      alert('Material issued successfully!');
    } catch (error) {
      console.error('Error issuing material:', error);
      alert('Failed to issue material');
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
          <h1 className="text-xl font-bold">Material Issue</h1>
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Material Issue</h2>
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
                    setShowIssueModal(true);
                  }}
                  className="mt-4 w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  disabled={product.quantity <= 0}
                >
                  <Send size={20} />
                  <span>Issue</span>
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

      {showIssueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Issue Material</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue ID
              </label>
              <input
                type="text"
                value={issueId}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>{dept.value}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuer Name
              </label>
              <input
                type="text"
                value={issuerName}
                onChange={(e) => setIssuerName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Quantity
              </label>
              <input
                type="number"
                value={requiredQty}
                onChange={(e) => setRequiredQty(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity to Issue
              </label>
              <input
                type="number"
                value={quantityToIssue}
                onChange={(e) => setQuantityToIssue(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowIssueModal(false);
                  setSelectedProduct(null);
                  setQuantityToIssue(0);
                  setRequiredQty(0);
                  setDepartment('');
                  setIssuerName('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleIssueItem}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialIssuePage;
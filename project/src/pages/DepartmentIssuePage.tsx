
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X, LogOut, Search } from 'lucide-react';

interface MaterialIssue {
  _id: string;
  issueId: string;
  itemId: string;
  itemName: string;
  requiredQty: number;
  issuedQty: number;
  remainingQty: number;
  department: string;
  issuerName: string;
  date: string;
  status: 'pending' | 'issued' | 'partially distributed' | 'fully distributed';
  issueDetails?: {
    subDepartment: string;
    facultyName: string;
    issuedQty: number;
    remainingQty: number;
    issueDate: string;
  }[];
}

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: MaterialIssue;
  onIssue: (facultyName: string, quantity: number) => void;
}

const IssueModal: React.FC<IssueModalProps> = ({ 
  isOpen, 
  onClose, 
  issue, 
  onIssue 
}) => {
  const [facultyName, setFacultyName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = () => {
    if (!facultyName.trim()) {
      alert('Please enter faculty name');
      return;
    }

    if (quantity < 1 || quantity > issue.issuedQty) {
      alert(`Please enter a quantity between 1 and ${issue.remainingQty}`);
      return;
    }

    onIssue(facultyName, quantity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Issue Material</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Item Name
          </label>
          <input 
            type="text" 
            value={issue.itemName} 
            disabled 
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Faculty Name
          </label>
          <input 
            type="text" 
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            placeholder="Enter faculty name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Quantity to Issue
          </label>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            max={issue.remainingQty}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />
          {/* <p className="text-sm text-gray-500 mt-1">
            Available: {issue.remainingQty} items
          </p> */}
        </div>

        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
          >
            <Send size={16} className="mr-2" />
            Issue
          </button>
        </div>
      </div>
    </div>
  );
};

const DepartmentIssuePage = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<MaterialIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<MaterialIssue | null>(null);
  const department = localStorage.getItem('Department') || '';

  useEffect(() => {
    fetchIssues();
  }, [department]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      // const response = await fetch(`http://localhost:3001/material-issues/${department}`);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/material-issues/${department}`);
      if (!response.ok) {
        throw new Error('Failed to fetch material issues');
      }
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching material issues:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch material issues');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Department');
    navigate('/login');
  };

  const handleIssueToFaculty = async (facultyName: string, quantity: number) => {
    try {
      // const response = await fetch('http://localhost:3001/distribute-material', {
      const response = await fetch('${import.meta.env.VITE_API_URL}/distribute-material', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueId: selectedIssue?.issueId,
          subDepartment: department,
          facultyName,
          issuedQty: quantity
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to distribute material');
      }

      await fetchIssues();
      alert('Material distributed successfully!');
    } catch (error) {
      console.error('Error distributing material:', error);
      alert('Failed to distribute material');
    } finally {
      setSelectedIssue(null);
    }
  };

  const filteredIssues = issues.filter(issue => 
    issue.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.issueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.issuerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-xl font-bold">Department Material Issues - {department}</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/pa/tracking')}
              className="hover:text-indigo-200"
            >
              Track Orders
            </button>
            <button
              onClick={() => navigate('/student/consumables')}
              className="hover:text-indigo-200"
            >
              Material Requisition
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
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by item name, issue ID, or issuer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            onClick={fetchIssues}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Refresh
          </button>
        </div>

        {/* Modal for issuing to faculty */}
        {selectedIssue && (
          <IssueModal 
            isOpen={!!selectedIssue}
            onClose={() => setSelectedIssue(null)}
            issue={selectedIssue}
            onIssue={handleIssueToFaculty}
          />
        )}

        {filteredIssues.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            No material issues found for your department.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2">Issue ID</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Item Name</th>
                    <th className="px-4 py-2">Required Qty</th>
                    <th className="px-4 py-2">Issued Qty</th>
                    <th className="px-4 py-2">Remaining Qty</th>
                    <th className="px-4 py-2">Issuer</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr key={issue._id} className="border-t">
                      <td className="px-4 py-2">{issue.issueId}</td>
                      <td className="px-4 py-2">{new Date(issue.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{issue.itemName}</td>
                      <td className="px-4 py-2">{issue.requiredQty}</td>
                      <td className="px-4 py-2">{issue.issuedQty}</td>
                      <td className="px-4 py-2">{issue.remainingQty}</td>
                      <td className="px-4 py-2">{issue.issuerName}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${issue.status === 'issued' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {issue.remainingQty > 0 && (
                          <button
                            onClick={() => setSelectedIssue(issue)}
                            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            <Send size={16} />
                            <span>Distribute</span>
                          </button>
                        )}
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

export default DepartmentIssuePage;
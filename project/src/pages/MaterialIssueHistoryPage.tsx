// import React, { useState, useEffect } from 'react';
// import { LogOut, Download, Filter, Search } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface MaterialIssue {
//   _id: string;
//   issueId: string;
//   itemId: string;
//   itemName: string;
//   requiredQty: number;
//   issuedQty: number;
//   remainingQty: number;
//   department: string;
//   issuerName: string;
//   date: string;
//   status: 'pending' | 'issued';
//   departmentIssueDate?: string;
// }

// const MaterialIssueHistoryPage = () => {
//   const navigate = useNavigate();
//   const [issues, setIssues] = useState<MaterialIssue[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [departmentFilter, setDepartmentFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('all');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const departments = [
//     { value: 'Computer Science Engineering', label: 'CSE' },
//     { value: 'Cyber Security', label: 'CS' },
//     { value: 'Electronics Engineering', label: 'ECE' },
//     { value: 'Mechanical Engineering', label: 'MECH' },
//     { value: 'Civil Engineering', label: 'CIVIL' },
//     { value: 'Electrical and Electronics Engineering', label: 'EEE' }
//   ];

//   useEffect(() => {
//     fetchIssues();
//   }, []);

//   const fetchIssues = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:3001/material-issues');
//       if (!response.ok) {
//         throw new Error('Failed to fetch material issues');
//       }
//       const data = await response.json();
//       setIssues(data);
//     } catch (error) {
//       console.error('Error fetching material issues:', error);
//       setError(error instanceof Error ? error.message : 'Failed to fetch material issues');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const filteredIssues = issues.filter(issue => {
//     const matchesSearch = 
//       issue.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       issue.issueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       issue.issuerName.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesDepartment = departmentFilter === 'all' || issue.department === departmentFilter;
//     const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    
//     const issueDate = new Date(issue.date);
//     let matchesDate = true;

//     switch (dateFilter) {
//       case 'today':
//         const today = new Date();
//         matchesDate = issueDate.toDateString() === today.toDateString();
//         break;
//       case 'week':
//         const weekAgo = new Date();
//         weekAgo.setDate(weekAgo.getDate() - 7);
//         matchesDate = issueDate >= weekAgo;
//         break;
//       case 'month':
//         const monthAgo = new Date();
//         monthAgo.setMonth(monthAgo.getMonth() - 1);
//         matchesDate = issueDate >= monthAgo;
//         break;
//       case 'custom':
//         if (startDate && endDate) {
//           const start = new Date(startDate);
//           const end = new Date(endDate);
//           end.setHours(23, 59, 59);
//           matchesDate = issueDate >= start && issueDate <= end;
//         }
//         break;
//       default:
//         matchesDate = true;
//     }

//     return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
//   });

//   const exportToCSV = () => {
//     const headers = ['Issue ID', 'Date', 'Item Name', 'Department', 'Issuer', 'Required Qty', 'Issued Qty', 'Remaining Qty', 'Status', 'Department Issue Date'];
//     const csvData = filteredIssues.map(issue => [
//       issue.issueId,
//       new Date(issue.date).toLocaleDateString(),
//       issue.itemName,
//       issue.department,
//       issue.issuerName,
//       issue.requiredQty,
//       issue.issuedQty,
//       issue.remainingQty,
//       issue.status,
//       issue.departmentIssueDate ? new Date(issue.departmentIssueDate).toLocaleDateString() : 'N/A'
//     ].join(','));

//     const csv = [headers.join(','), ...csvData].join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `material-issues-${new Date().toISOString().split('T')[0]}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
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
//           <h1 className="text-xl font-bold">Material Issue History</h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => navigate('/admin/inventory')}
//               className="hover:text-indigo-200"
//             >
//               View Inventory
//             </button>
//             <button
//               onClick={() => navigate('/admin/consumables')}
//               className="hover:text-indigo-200"
//             >
//               Manage Consumables
//             </button>
//             <button
//               onClick={() => navigate('/material-issue')}
//               className="hover:text-indigo-200"
//             >
//               Material Issue
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
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex flex-wrap gap-4 items-end justify-between">
//             <div className="flex flex-wrap gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Search
//                 </label>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//                   <input
//                     type="text"
//                     placeholder="Search by item, ID, or issuer..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Department
//                 </label>
//                 <select
//                   value={departmentFilter}
//                   onChange={(e) => setDepartmentFilter(e.target.value)}
//                   className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="all">All Departments</option>
//                   {departments.map(dept => (
//                     <option key={dept.value} value={dept.value}>
//                       {dept.value} ({dept.label})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="issued">Issued</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date Filter
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <select
//                     value={dateFilter}
//                     onChange={(e) => setDateFilter(e.target.value)}
//                     className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     <option value="all">All Time</option>
//                     <option value="today">Today</option>
//                     <option value="week">Last 7 Days</option>
//                     <option value="month">Last 30 Days</option>
//                     <option value="custom">Custom Range</option>
//                   </select>
//                   {dateFilter === 'custom' && (
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                       <span>to</span>
//                       <input
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={exportToCSV}
//               className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               <Download size={20} />
//               <span>Export CSV</span>
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="px-4 py-2">Issue ID</th>
//                   <th className="px-4 py-2">Date</th>
//                   <th className="px-4 py-2">Item Name</th>
//                   <th className="px-4 py-2">Department</th>
//                   <th className="px-4 py-2">Issuer</th>
//                   <th className="px-4 py-2">Required Qty</th>
//                   <th className="px-4 py-2">Issued Qty</th>
//                   <th className="px-4 py-2">Remaining Qty</th>
//                   <th className="px-4 py-2">Status</th>
//                   {/* <th className="px-4 py-2">Department Issue Date</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredIssues.length === 0 ? (
//                   <tr>
//                     <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
//                       No material issues found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredIssues.map((issue) => (
//                     <tr key={issue._id} className="border-t">
//                       <td className="px-4 py-2">{issue.issueId}</td>
//                       <td className="px-4 py-2">{new Date(issue.date).toLocaleDateString()}</td>
//                       <td className="px-4 py-2">{issue.itemName}</td>
//                       <td className="px-4 py-2">{issue.department}</td>
//                       <td className="px-4 py-2">{issue.issuerName}</td>
//                       <td className="px-4 py-2">{issue.requiredQty}</td>
//                       <td className="px-4 py-2">{issue.issuedQty}</td>
//                       <td className="px-4 py-2">{issue.remainingQty}</td>
//                       <td className="px-4 py-2">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//                           ${issue.status === 'issued' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                           {issue.status === 'issued' ? 'Issued' : 'Pending'}
//                         </span>
//                       </td>
//                       {/* <td className="px-4 py-2">
//                         {issue.departmentIssueDate 
//                           ? new Date(issue.departmentIssueDate).toLocaleDateString() 
//                           : 'N/A'}
//                       </td> */}
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaterialIssueHistoryPage;

import React, { useState, useEffect } from 'react';
import { LogOut, Download, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  status: 'pending' | 'issued';
  departmentIssueDate?: string;
}

const MaterialIssueHistoryPage = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<MaterialIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const departments = [
    { value: 'Computer Science Engineering', label: 'CSE' },
    { value: 'Cyber Security', label: 'CS' },
    { value: 'Electronics Engineering', label: 'ECE' },
    { value: 'Mechanical Engineering', label: 'MECH' },
    { value: 'Civil Engineering', label: 'CIVIL' },
    { value: 'Electrical and Electronics Engineering', label: 'EEE' }
  ];

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/material-issues');
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
    navigate('/login');
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.issueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.issuerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || issue.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    
    const issueDate = new Date(issue.date);
    let matchesDate = true;

    switch (dateFilter) {
      case 'today':
        const today = new Date();
        matchesDate = issueDate.toDateString() === today.toDateString();
        break;
      case 'week':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = issueDate >= weekAgo;
        break;
      case 'month':
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        matchesDate = issueDate >= monthAgo;
        break;
      case 'custom':
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59);
          matchesDate = issueDate >= start && issueDate <= end;
        }
        break;
      default:
        matchesDate = true;
    }

    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  const exportToCSV = () => {
    const headers = ['Issue ID', 'Date', 'Item Name', 'Department', 'Issuer', 'Required Qty', 'Issued Qty', 'Remaining Qty', 'Status', 'Department Issue Date'];
    const csvData = filteredIssues.map(issue => [
      issue.issueId,
      new Date(issue.date).toLocaleDateString(),
      issue.itemName,
      issue.department,
      issue.issuerName,
      issue.requiredQty,
      issue.issuedQty,
      issue.remainingQty,
      issue.status,
      issue.departmentIssueDate ? new Date(issue.departmentIssueDate).toLocaleDateString() : 'N/A'
    ].join(','));

    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `material-issues-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
          <h1 className="text-xl font-bold">Material Issue History</h1>
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-end justify-between">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by item, ID, or issuer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.value} ({dept.label})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="issued">Issued</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Filter
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  {dateFilter === 'custom' && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <span>to</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={20} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">Issue ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Issuer</th>
                  <th className="px-4 py-2">Required Qty</th>
                  <th className="px-4 py-2">Issued Qty</th>
                  <th className="px-4 py-2">Remaining Qty</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Department Issue Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                      No material issues found
                    </td>
                  </tr>
                ) : (
                  filteredIssues.map((issue) => (
                    <tr key={issue._id} className="border-t">
                      <td className="px-4 py-2">{issue.issueId}</td>
                      <td className="px-4 py-2">{new Date(issue.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{issue.itemName}</td>
                      <td className="px-4 py-2">{issue.department}</td>
                      <td className="px-4 py-2">{issue.issuerName}</td>
                      <td className="px-4 py-2">{issue.requiredQty}</td>
                      <td className="px-4 py-2">{issue.issuedQty}</td>
                      <td className="px-4 py-2">{issue.remainingQty}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${issue.status === 'issued' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {issue.status === 'issued' ? 'Issued' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {issue.departmentIssueDate 
                          ? new Date(issue.departmentIssueDate).toLocaleDateString() 
                          : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialIssueHistoryPage;
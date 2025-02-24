// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import ProductPage from './pages/ProductPage';
// import PurchaseIndentPage from './pages/PurchaseIndentPage';
// import Success from './pages/Success';

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = !!localStorage.getItem('token');
//   const userRole =localStorage.getItem('userRole');
  
//   if (!isAuthenticated) {
//     console.log('FAILURE');
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Login page route */}
//         <Route path="/login" element={<LoginPage />} />
        
//         {/* Products page route - protected */}
//         <Route
//           path="/products"
//           element={
//             <PrivateRoute>
//               <ProductPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/success" element={<Success/>} />
//         {/* Purchase indent page route - protected */}
//         <Route
//           path="/purchase-indent"
//           element={
//             <PrivateRoute>
//               <PurchaseIndentPage />
//             </PrivateRoute>
//           }
//         />

//         {/* Default route redirects to login */}
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import ProductPage from './pages/ProductPage';
// import PurchaseIndentPage from './pages/PurchaseIndentPage';
// import AcceptorPage from './pages/AcceptorPage';

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = !!localStorage.getItem('token');
//   const userRole = localStorage.getItem('userRole');
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// function App() {
//   const userRole = localStorage.getItem('userRole');

//   const getRedirectPath = (role: string | null) => {
//     switch (role) {
//       case 'faculty':
//         return '/purchase-indent';
//       case 'acceptor':
//         return '/acceptor';
//       case 'student':
//         return '/products';
//       default:
//         return '/login';
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/products"
//           element={
//             <PrivateRoute>
//               <ProductPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/purchase-indent"
//           element={
//             <PrivateRoute>
//               <PurchaseIndentPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/acceptor"
//           element={
//             <PrivateRoute>
//               <AcceptorPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/" element={<Navigate to={getRedirectPath(userRole)} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import PurchaseIndentPage from './pages/PurchaseIndentPage';
// import AcceptorPage from './pages/AcceptorPage';
// import AdminConsumablePage from './pages/AdminConsumablePage';
// import AdminIndentsPage from './pages/AdminIndentsPage';
// import StudentConsumablePage from './pages/StudentConsumablePage';

// const PrivateRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
//   const isAuthenticated = !!localStorage.getItem('token');
//   const userRole = localStorage.getItem('userRole');
  
//   if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// function App() {
//   const userRole = localStorage.getItem('userRole');

//   const getRedirectPath = (role: string | null) => {
//     switch (role) {
//       case 'faculty':
//         return '/purchase-indent';
//       case 'acceptor':
//         return '/acceptor';
//       case 'admin':
//         return '/admin/consumables';
//       case 'student':
//         return '/student/consumables';
//       default:
//         return '/login';
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/student/consumables"
//           element={
//             <PrivateRoute allowedRoles={['student']}>
//               <StudentConsumablePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/purchase-indent"
//           element={
//             <PrivateRoute allowedRoles={['faculty']}>
//               <PurchaseIndentPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/acceptor"
//           element={
//             <PrivateRoute allowedRoles={['acceptor']}>
//               <AcceptorPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/consumables"
//           element={
//             <PrivateRoute allowedRoles={['admin']}>
//               <AdminConsumablePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/indents"
//           element={
//             <PrivateRoute allowedRoles={['admin']}>
//               <AdminIndentsPage />
//             </PrivateRoute>
//           }
//         />
//         {/* Redirect /products to /student/consumables for backward compatibility */}
//         <Route
//           path="/products"
//           element={<Navigate to="/student/consumables" replace />}
//         />
//         <Route path="/" element={<Navigate to={getRedirectPath(userRole)} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import PurchaseIndentPage from './pages/PurchaseIndentPage';
// import AcceptorPage from './pages/AcceptorPage';
// import AdminConsumablePage from './pages/AdminConsumablePage';
// import AdminIndentsPage from './pages/AdminIndentsPage';
// import AdminStudentConsumablesPage from './pages/AdminStudentConsumablesPage';
// import StudentConsumablePage from './pages/StudentConsumablePage';
// import AdminInventoryPage from './pages/AdminInventoryPage';

// const PrivateRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
//   const isAuthenticated = !!localStorage.getItem('token');
//   const userRole = localStorage.getItem('userRole');
  
//   if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// function App() {
//   const userRole = localStorage.getItem('userRole');

//   const getRedirectPath = (role: string | null) => {
//     switch (role) {
//       case 'faculty':
//         return '/purchase-indent';
//       case 'hod':
//         return '/acceptor';
//         case 'principal':
//           return '/acceptor';
//         case 'secretary':
//           return '/acceptor';
//       case 'admin':
//         return '/admin/consumables';
//       case 'student':
//         return '/student/consumables';
//       default:
//         return '/login';
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/student/consumables"
//           element={
//             <PrivateRoute allowedRoles={['pa']}>
//               <StudentConsumablePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/purchase-indent"
//           element={
//             <PrivateRoute allowedRoles={['faculty']}>
//               <PurchaseIndentPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/acceptor"
//           element={
//             <PrivateRoute allowedRoles={['hod','principal','secretary']}>
//               <AcceptorPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/consumables"
//           element={
//             <PrivateRoute allowedRoles={['admin']}>
//               <AdminConsumablePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/indents"
//           element={
//             <PrivateRoute allowedRoles={['admin']}>
//               <AdminIndentsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/student-consumables"
//           element={
//             <PrivateRoute allowedRoles={['admin']}>
//               <AdminStudentConsumablesPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/inventory"
//           element={
//             <PrivateRoute allowedRoles={['admin']}>
//               <AdminInventoryPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/" element={<Navigate to={getRedirectPath(userRole)} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PurchaseIndentPage from './pages/PurchaseIndentPage';
import AcceptorPage from './pages/AcceptorPage';
import AdminConsumablePage from './pages/AdminConsumablePage';
import AdminIndentsPage from './pages/AdminIndentsPage';
import AdminInventoryPage from './pages/AdminInventoryPage';
import AdminStudentConsumablesPage from './pages/AdminStudentConsumablesPage';
import StudentConsumablePage from './pages/StudentConsumablePage';
import PATrackingPage from './pages/PATrackingPage';
import AdminHistoryPage from './pages/AdminHistoryPage';
import GateEntryPage from './pages/GateEntryPage';
import GateHistory from './pages/GateHistory';

const PrivateRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  const userRole = localStorage.getItem('userRole');

  const getRedirectPath = (role: string | null) => {
    switch (role) {
      case 'faculty':
        return '/purchase-indent';
      case 'acceptor':
        return '/acceptor';
      case 'admin':
        return '/admin/consumables';
      case 'student':
        return '/student/consumables';
      case 'security' :
        return '/gate-entry';
      default:
        return '/login';
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/student/consumables"
          element={
            <PrivateRoute allowedRoles={['pa']}>
              <StudentConsumablePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/purchase-indent"
          element={
            <PrivateRoute allowedRoles={['faculty']}>
              <PurchaseIndentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/acceptor"
          element={
            <PrivateRoute allowedRoles={['hod','principal','secretary']}>
              <AcceptorPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/consumables"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminConsumablePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/indents"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminIndentsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminInventoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/student-consumables"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminStudentConsumablesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/history"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminHistoryPage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/gate-entry"
          element={
            <PrivateRoute allowedRoles={['security']}>
              <GateEntryPage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/GateHistory"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <GateHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/pa/tracking"
          element={
            <PrivateRoute allowedRoles={['pa']}>
              <PATrackingPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to={getRedirectPath(userRole)} />} />
      </Routes>
    </Router>
  );
}

export default App;
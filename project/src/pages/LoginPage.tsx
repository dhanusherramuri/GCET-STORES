import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, User } from 'lucide-react';
import axios from 'axios';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('student');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     axios.post('mongodb://localhost:3001/login', { username,password,role})
//     .then(result=>{console.log(result)
//     if(result.data==="Success"){
//       navigate('/products')
//     }})


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('SELECT A ROLE');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const result = await axios.post('http://localhost:3001/login', {
      const result = await axios.post('${import.meta.env.VITE_API_URL}/login', {
        username,
        password,
        role
      });

      if (result.data === "Success") {
        setError("ACCEPTED");
        console.log(result.data);
        localStorage.setItem('uname', username);
        localStorage.setItem('token', 'demo-token');
      localStorage.setItem('userRole', role);
      // console.log(localStorage.getItem('uname'));
      // console.log(localStorage.getItem('userRole'));
      // console.log(localStorage.getItem('token'));
        // navigate('/products');
        const departmentMapping = {
          'cse': 'Computer Science Engineering',
          'ece': 'Electronics Engineering',
          'mech': 'Mechanical Engineering',
          'civil': 'Civil Engineering',
          'eee': 'Electrical Engineering',
          'ai': 'Artificial Intelligence',
          'ml': 'Machine Learning',
          'ds': 'Data Science',
          'cs': 'Cyber Security'
      } as const;
        if (username && password) {
          // For demo purposes, we're using local storage
          localStorage.setItem('token', 'demo-token');
          localStorage.setItem('userRole', role);
          
          if (role === 'faculty') {
            navigate('/purchase-indent');
          } else if (role === 'hod'||role === 'principal'||role === 'secretary') {
            navigate('/acceptor');
          }else if(role === 'admin'){
            navigate('/admin/dashboard');
          } 
          else if (role === 'pa') {
            const dept =username.split('.');
            localStorage.setItem('Department', departmentMapping[dept[1] as keyof typeof departmentMapping]);
            console.log(localStorage.getItem('Department'));
            navigate('/student/consumables');
          }
          else if(role === 'security'){
            navigate('/gate-entry');
          }
          else{
            navigate('/');
          }
        }
      }
      else {
       setError(result.data);
       alert(result.data);
       console.log("Error : "+result.data);
       navigate('/')
    } }catch (err) {
      console.error("Error during login:", err);
      setError("Server error. Please try again later.");
    }
    // navigate('/')
    // if (username && password) {
    //   // For demo purposes, we're using local storage
    //   localStorage.setItem('token', 'demo-token');
    //   localStorage.setItem('userRole', role);
      
    //   if (role === 'faculty') {
    //     navigate('/purchase-indent');
    //   } else if(role === 'student') {
    //     navigate('/products');
    //   }
    //   else{
    //     alert("WRONG ROLE");
    //   }
    // } else {
    //   setError('Please fill in all fields');
    // }
  };
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          GCET Stores Login
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="SELECT A ROLE" hidden>select A Role</option>
              <option value="security">Security</option>
              <option value="pa">PA</option>
              <option value="faculty">Faculty</option>
              <option value="hod">HOD</option>
              <option value="principal">Principal</option>
              <option value="secretary">Secretary</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


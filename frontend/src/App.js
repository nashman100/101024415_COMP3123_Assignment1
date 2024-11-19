import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import EmployeeList from './Pages/EmployeeList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<ProtectedRoute><EmployeeList/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;

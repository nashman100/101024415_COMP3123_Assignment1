import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import EmployeeList from './Pages/EmployeeList';
import DeleteEmployee from './Pages/DeleteEmployee';
import EditEmployee from './Pages/EditEmployee';
import AddEmployee from './Pages/AddEmployee';
import EmployeeDetails from './Pages/EmployeeDetails';
import Header from './Components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<ProtectedRoute><EmployeeList/></ProtectedRoute>}/>
          <Route path='/edit/:id' element={<ProtectedRoute><EditEmployee /></ProtectedRoute>}/>
          <Route path='/delete/:id' element={<ProtectedRoute><DeleteEmployee /></ProtectedRoute>}/>
          <Route path='/add-employee' element={<ProtectedRoute><AddEmployee/></ProtectedRoute>}/>
          <Route path='/details/:id' element={<ProtectedRoute><EmployeeDetails/></ProtectedRoute>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

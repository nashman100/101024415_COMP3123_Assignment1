import React, {useState} from "react";
import {Link} from "react-router-dom";
import API from './services/api';

function Login(){
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    
    const handleInputChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await API.post('/user/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Login Successful!');
            window.location.href = '/';
        } catch(err){
            setError(err.response?.data?.message || 'Something went wrong!');
        }
    };

    return(
        <div className="container mt-5">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="mt-3">
                <p>Don't have an account? <Link to="/signup">Signup Here</Link></p>
            </div>
        </div>
    );
}

export default Login;
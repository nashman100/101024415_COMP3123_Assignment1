import React, {useState} from "react";
import API from '../Services/api';
import { Helmet } from "react-helmet";

function Signup(){
    const [formData, setFormData] = useState({username: '', email:'', password: ''});
    const [error, setError] = useState('');

    const handleInputChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(formData.password.length < 8){
            setError('Password must be at least 8 characters long.');
            return;
        }

        try{
            await API.post('/user/signup', formData);
            alert('Signup was successful! Please login.');
            window.location.href = '/login';
        } catch(err){
            setError(err.response?.data?.message || 'Somthing went wrong!');
        }
    }

    return(
        <div className="container mt-5">
            <Helmet><title>Signup - Employee Management App</title></Helmet>
            <h2>Signup</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" value={formData.username} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
import React, {useEffect, useState} from "react";
import API from "../Services/api";
import {useParams, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet";

function EditEmployee() {
  const {id} = useParams();
  const [formData, setFormData] = useState({first_name: "", last_name: "", email: "", position: "", department: "", date_of_joining: ""});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Your session has expired. Please log in again.");
          navigate("/login");
          return;
        }

        const response = await API.get(`/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const employee = response.data;
        if (employee.date_of_joining) {
          employee.date_of_joining = employee.date_of_joining.split("T")[0];
        }

        setFormData(employee);
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Failed to fetch employee details.");
        }
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
        return;
      }

      await API.put(`/emp/employees/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee updated successfully!");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to update employee.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <Helmet><title>Edit Employee - Employee Management App</title></Helmet>
      <h2>Edit Employee</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" name="first_name" className="form-control" value={formData.first_name} onChange={handleInputChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" name="last_name" className="form-control" value={formData.last_name} onChange={handleInputChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Position</label>
          <input type="text" name="position" className="form-control" value={formData.position} onChange={handleInputChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input type="text" name="department" className="form-control" value={formData.department} onChange={handleInputChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Joining</label>
          <input type="date" name="date_of_joining" className="form-control" value={formData.date_of_joining} onChange={handleInputChange} required/>
        </div>
        <button type="submit" className="btn btn-primary me-2">Update</button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditEmployee;



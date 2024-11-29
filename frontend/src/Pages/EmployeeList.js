import React, { useEffect, useState } from "react";
import API from "../Services/api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get("/emp/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
        setFilteredEmployees(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Failed to fetch employees.");
        }
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [navigate]);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await API.get("/emp/employees/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          department: searchDepartment,
          position: searchPosition,
        },
      });
      setFilteredEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch employees.");
    }
  };

  const resetFilters = () => {
    setFilteredEmployees(employees);
    setSearchDepartment("");
    setSearchPosition("");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <Helmet><title>Employee List - Employee Management App</title></Helmet>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee List</h2>
        <button className="btn btn-success" onClick={() => navigate("/add-employee")}>Add Employee</button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Department"
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Position"
            value={searchPosition}
            onChange={(e) => setSearchPosition(e.target.value)}
          />
        </div>
        <div className="col-12 text-end">
          <button className="btn btn-primary me-2" onClick={handleSearch}>Search</button>
          <button className="btn btn-secondary" onClick={resetFilters}>Reset</button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => navigate(`/details/${employee._id}`)}>Details</button>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/edit/${employee._id}`)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => navigate(`/delete/${employee._id}`)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;





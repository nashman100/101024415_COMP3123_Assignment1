import React, { useEffect, useState } from "react";
import API from "../Services/api";
import { useParams, useNavigate } from "react-router-dom";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch employee details.");
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <div
        className="card shadow-lg"
        style={{ width: "25rem"}} 
      >
        <div className="card-body">
          <h5 className="card-title text-center">Employee Details</h5>
          <hr />
          <div className="mb-2">
            <strong>ID:</strong> {employee._id}
          </div>
          <div className="mb-2">
            <strong>First Name:</strong> {employee.first_name}
          </div>
          <div className="mb-2">
            <strong>Last Name:</strong> {employee.last_name}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {employee.email}
          </div>
          <div className="mb-2">
            <strong>Position:</strong> {employee.position}
          </div>
          <div className="mb-2">
            <strong>Department:</strong> {employee.department}
          </div>
          <div className="mb-2">
            <strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}
          </div>
          <button className="btn btn-secondary mt-3 w-100" onClick={() => navigate("/")}>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;



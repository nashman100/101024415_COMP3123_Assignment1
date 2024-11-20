import React from "react";
import API from "../Services/api";
import { useParams, useNavigate } from "react-router-dom";

function DeleteEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
        return;
      }

      await API.delete(`/emp/employees/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { eid: id },
      });

      alert("Employee deleted successfully!");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Failed to delete employee.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg" style={{ width: "25rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Delete Confirmation</h5>
          <hr />
          <p className="text-center">Are you sure you want to delete this employee?</p>
          <div className="d-flex justify-content-around">
            <button className="btn btn-danger" onClick={handleDelete}>
              Yes, Delete
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteEmployee;



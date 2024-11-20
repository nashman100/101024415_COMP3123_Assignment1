import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      <div className="logo">
        <img
          src="/logo.png"
          alt="Employee Management App"
          style={{ height: "100px" }}
        />
      </div>
      <button className="btn btn-outline-light" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;

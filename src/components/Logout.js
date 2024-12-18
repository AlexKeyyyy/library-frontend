import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Выйти
    </button>
  );
};

export default Logout;

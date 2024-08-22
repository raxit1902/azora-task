import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-md mb-8">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-700">Azora Group</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-400 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300 shadow-lg px-4 py-2 rounded-full shadow-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

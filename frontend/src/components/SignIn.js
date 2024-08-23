import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiHelper from "../utils/apiHelper";
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
} from "../actions/authActions";
import { API_BASE_URL } from "../constants";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUserRequest());
    const { data, error } = await apiHelper(
      "post",
      `${API_BASE_URL}/auth/login`,
      formData
    );
    if (data) {
      localStorage.setItem("jwtToken", data.token);
      dispatch(loginUserSuccess(data));
      navigate("/contacts");
    } else {
      dispatch(loginUserFailure(error));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-900">
          Login
        </h2>
        <form
          className="mt-8 space-y-4 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-auto min-w-40 h-[50px] py-2 mt-4 bg-[#bd59d4] text-white font-semibold rounded-full hover:bg-[#4b2354] transition duration-300 shadow-[0_10px_30px_0_rgba(189,89,212,.5)]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        <p className="mt-6 text-center text-purple-900">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

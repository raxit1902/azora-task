import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHelper from "../utils/apiHelper";

const CreateContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const { data, error } = await apiHelper(
      "post",
      "http://localhost:5000/api/contacts",
      formData
    );
    setLoading(false);

    if (data) {
      navigate("/contacts");
    } else {
      setError(error || "Failed to create contact");
    }
  };

  const handleCancel = () => {
    navigate("/contacts"); // Redirect to contact list page when cancel button is clicked
  };

  return (
    <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Create New Contact
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-auto min-w-40 h-[50px] py-2 mr-2 mt-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-800 transition duration-300 shadow-lg"
          >
            {loading ? "Creating..." : "Create Contact"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-auto min-w-40 h-[50px] py-2 mt-4 bg-gray-400 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300 shadow-lg"
          >
            Cancel
          </button>
        </div>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default CreateContact;

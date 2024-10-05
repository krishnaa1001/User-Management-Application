import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: { street: "", city: "" },
    company: { name: "" },
    website: "",
  });

  const [errors, setErrors] = useState({});

  // Effect to set form data when user prop changes (for editing)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        address: user.address,
        company: user.company,
        website: user.website,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested objects for address and company
    if (name.includes("address")) {
      const field = name.split(".")[1]; // Get the field name (street or city)
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.includes("company")) {
      const field = name.split(".")[1]; // Get the field name (name)
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name is required and must be at least 3 characters.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required.";
    }
    if (!formData.username || formData.username.length < 3) {
      newErrors.username =
        "Username is required and must be at least 3 characters.";
    }
    if (!formData.address.street || !formData.address.city) {
      newErrors.address = "Address (street and city) is required.";
    }
    if (formData.company.name && formData.company.name.length < 3) {
      newErrors.company =
        "Company name must be at least 3 characters if provided.";
    }
    if (formData.website && !isValidURL(formData.website)) {
      newErrors.website = "Valid website URL is required if provided.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidURL = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {user ? "Edit User" : "Add New User"}
        </h2>

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full px-2 py-1"
            required
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full px-2 py-1"
            required
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full px-2 py-1"
            required
          />
          {errors.phone && <p className="text-red-600">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full px-2 py-1"
            required
            readOnly={!!user} // Make username read-only when editing
          />
          {errors.username && <p className="text-red-600">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Street Address</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full px-2 py-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">City</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full px-2 py-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Company Name</label>
          <input
            type="text"
            name="company.name"
            value={formData.company.name}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full px-2 py-1"
          />
          {errors.company && <p className="text-red-600">{errors.company}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full px-2 py-1"
          />
          {errors.website && <p className="text-red-600">{errors.website}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

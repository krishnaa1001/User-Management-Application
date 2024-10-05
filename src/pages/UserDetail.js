import React from "react";

const UserDetails = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>
          Address: {user.address.street}, {user.address.city}
        </p>
        <p>Company: {user.company}</p>
        <p>Website: {user.website}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetails;

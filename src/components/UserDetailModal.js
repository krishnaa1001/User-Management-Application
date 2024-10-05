import React from "react";

const UserDetailModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <div className="mb-4">
          <strong>Name:</strong> <span>{user.name}</span>
        </div>
        <div className="mb-4">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="mb-4">
          <strong>Phone:</strong> <span>{user.phone}</span>
        </div>
        <div className="mb-4">
          <strong>Username:</strong> <span>{user.username}</span>
        </div>
        <div className="mb-4">
          <strong>Address:</strong>
          <div>
            {user.address.street}, {user.address.city}
          </div>
        </div>
        <div className="mb-4">
          <strong>Company:</strong> <span>{user.company.name}</span>
        </div>
        <div className="mb-4">
          <strong>Website:</strong> <span>{user.website}</span>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;

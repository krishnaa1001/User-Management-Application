import React, { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import ConfirmModal from "./components/ConfirmModal";
import UserDetailModal from "./components/UserDetailModal"; // Import the UserDetailModal
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user detail modal

  useEffect(() => {
    fetchUsers()
      .then((response) => setUsers(response.data))
      .catch((err) => notify("Failed to fetch users. Please try again later."));
  }, []);

  const notify = (message) => toast.error(message);

  const handleCreateUser = (userData) => {
    createUser(userData)
      .then((response) => {
        setUsers([...users, response.data]);
        notify("User created successfully!");
      })
      .catch(() => notify("Failed to create user."))
      .finally(() => setIsCreating(false));
  };

  const handleUpdateUser = (userData) => {
    updateUser(editingUser.id, userData)
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...userData } : user
          )
        );
        notify("User updated successfully!");
      })
      .catch(() => notify("Failed to update user."))
      .finally(() => {
        setEditingUser(null);
      });
  };

  const handleDeleteUser = () => {
    deleteUser(userIdToDelete)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userIdToDelete));
        notify("User deleted successfully!");
      })
      .catch(() => notify("Failed to delete user."))
      .finally(() => {
        setIsDeleting(false);
        setUserIdToDelete(null);
      });
  };

  return (
    <div className="app container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <button
        onClick={() => setIsCreating(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New User
      </button>
      <UserTable
        users={users}
        onEdit={setEditingUser}
        onDelete={(id) => {
          setIsDeleting(true);
          setUserIdToDelete(id);
        }}
        onShowDetails={(user) => {
          setSelectedUser(user); // Set the selected user to display details
        }}
      />
      {isCreating && (
        <UserForm
          onSave={handleCreateUser}
          onCancel={() => setIsCreating(false)}
        />
      )}
      {editingUser && (
        <UserForm
          user={editingUser}
          onSave={handleUpdateUser}
          onCancel={() => setEditingUser(null)}
        />
      )}
      {isDeleting && (
        <ConfirmModal
          onConfirm={handleDeleteUser}
          onCancel={() => setIsDeleting(false)}
        />
      )}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)} // Close detail modal
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;

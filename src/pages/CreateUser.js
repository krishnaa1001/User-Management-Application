import React from "react";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

function CreateUser() {
  const navigate = useNavigate();

  const handleCreate = (newUserData) => {
    createUser(newUserData)
      .then(() => navigate("/"))
      .catch(() => alert("Error creating user"));
  };

  return (
    <div>
      <h1>Create New User</h1>
      <UserForm onSave={handleCreate} onCancel={() => navigate("/")} />
    </div>
  );
}

export default CreateUser;

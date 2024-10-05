import React, { useState, useEffect } from "react";
import { fetchUsers } from "../api";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, []);

  const handleEdit = (user) => {
    navigate(`/user/${user.id}`);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Users List</h1>
      <button onClick={() => navigate("/create")}>Add New User</button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Home;

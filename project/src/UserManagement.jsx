import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // Import CSS

const currentUser = { id: 0, name: "Admin User", role: "Admin" };

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Employee", status: "Active" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    setUsers([
      { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active", lastActivity: new Date().toISOString() },
      { id: 2, name: "Manager User", email: "manager@example.com", role: "Manager", status: "Active", lastActivity: new Date().toISOString() },
      { id: 3, name: "Employee User", email: "employee@example.com", role: "Employee", status: "Inactive", lastActivity: new Date().toISOString() },
    ]);
  }, []);

  useEffect(() => {
    const wsSimulator = setInterval(() => {
      toast.info(`🔔 Real-time update at ${new Date().toLocaleTimeString()}`);
    }, 10000);
    return () => clearInterval(wsSimulator);
  }, []);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isAdmin = currentUser.role === "Admin";

  const handleCreate = () => {
    if (!isAdmin) return toast.error("❌ Only admins can add users!");
    if (!newUser.name || !newUser.email) return toast.error("Enter both name and email!");
    if (!isValidEmail(newUser.email)) return toast.error("Invalid email format!");
    const userToAdd = { ...newUser, id: Date.now(), lastActivity: new Date().toISOString() };
    setUsers([...users, userToAdd]);
    setNewUser({ name: "", email: "", role: "Employee", status: "Active" });
    toast.success("✅ User added successfully!");
  };

  const handleUpdate = () => {
    if (!isAdmin) return toast.error("❌ Only admins can update users!");
    if (!editingUser.name || !editingUser.email) return toast.error("Name and email cannot be empty!");
    if (!isValidEmail(editingUser.email)) return toast.error("Invalid email format!");
    setUsers(users.map((u) => (u.id === editingUser.id ? { ...editingUser, lastActivity: new Date().toISOString() } : u)));
    setEditingUser(null);
    toast.info("✏️ User updated successfully!");
  };

  const handleDelete = (id) => {
    if (!isAdmin) return toast.error("❌ Only admins can delete users!");
    setUsers(users.filter((u) => u.id !== id));
    toast.warn("🗑️ User deleted!");
  };

  const toggleStatus = (id) => {
    if (!isAdmin) return toast.error("❌ Only admins can toggle status!");
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u)));
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      {isAdmin && (
        <div className="user-form">
          <h3>Add New User</h3>
          <input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option>Employee</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>
          <select value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="add-btn" onClick={handleCreate}>Add User</button>
        </div>
      )}

      {editingUser && isAdmin && (
        <div className="user-form">
          <h3>Edit User</h3>
          <input value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
          <input value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
          <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
            <option>Employee</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>
          <select value={editingUser.status} onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="update-btn" onClick={handleUpdate}>Update</button>
          <button className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Activity</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.status}
                {isAdmin && <button className="toggle-btn" onClick={() => toggleStatus(u.id)}>Change</button>}
              </td>
              <td>{new Date(u.lastActivity).toLocaleString()}</td>
              {isAdmin && (
                <td>
                  <button className="edit-btn" onClick={() => setEditingUser(u)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserManagement;

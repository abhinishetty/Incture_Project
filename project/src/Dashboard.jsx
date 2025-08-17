import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaChartBar, FaCog, FaTasks } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import KanbanBoard from "./KanbanBoard";
import UserManagement from "./UserManagement";
import Settings from "./Settings";
import Reports from "./Reports";
import TaskList from "./TaskList";
import "./index.css"; // import CSS

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user)
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;

  const tabs = [
    { name: "Dashboard", icon: <FaTasks />, key: "dashboard" },
    ...(user.role === "Admin"
      ? [
          { name: "Users", icon: <FaUsers />, key: "users" },
          { name: "Reports", icon: <FaChartBar />, key: "reports" },
          { name: "Settings", icon: <FaCog />, key: "settings" },
        ]
      : user.role === "Manager"
      ? [
          { name: "Team Tasks", icon: <FaTasks />, key: "tasks" },
          { name: "Reports", icon: <FaChartBar />, key: "reports" },
        ]
      : [{ name: "My Tasks", icon: <FaTasks />, key: "tasks" }]),
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      case "tasks":
        return <TaskList />;
      case "dashboard":
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>
            Welcome, <strong>{user.username}</strong> ({user.role})
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      <main className="main-content">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="card"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './SignUp';
import Dashboard from './Dashboard';
import ProjectList from './ProjectList';
import TaskList from './TaskList';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Notifications from './Notifications'; // Toast container
import Settings from './Settings';
import KanbanBoard from './KanbanBoard';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <Router>
      {/* ✅ Toasts available everywhere */}
      <Notifications />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute roles={['Admin']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        {/* ❌ Remove notifications as a page */}
        {/* <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} /> */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <KanbanBoard />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

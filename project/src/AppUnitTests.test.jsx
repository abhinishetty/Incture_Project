import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import Dashboard from "./Dashboard";

test("renders dashboard welcome message", () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});

test("App renders login route", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import UserManagement from "./UserManagement";
import TaskList from "./TaskList";
import Reports from "./Reports";
import Dashboard from "./Dashboard";
import KanbanBoard from "./KanbanBoard";
import { ToastContainer } from "react-toastify";

// Wrap components needing Redux
const ReduxWrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("Unit Tests for Components", () => {

  // 1. UserManagement
  test("UserManagement renders and can add user", () => {
    render(<ReduxWrapper><UserManagement /><ToastContainer /></ReduxWrapper>);
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: "Test User" }});
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "test@example.com" }});
    fireEvent.click(screen.getByText(/Add User/i));
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  });

  // 2. TaskList
  test("TaskList renders and can add task", () => {
    render(<TaskList />);
    expect(screen.getByText(/Tasks/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "New Task" }});
    fireEvent.click(screen.getByText(/Add Task/i));
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });

  // 3. Reports
  test("Reports renders mock report list", () => {
    render(<Reports />);
    expect(screen.getByText(/Reports/i)).toBeInTheDocument();
    expect(screen.getByText(/Project A/i)).toBeInTheDocument();
  });

  // 4. Dashboard
  test("Dashboard renders welcome message", () => {
    render(<ReduxWrapper><Dashboard /></ReduxWrapper>);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  // 5. KanbanBoard
  test("KanbanBoard renders correctly", () => {
    render(<KanbanBoard />);
    expect(screen.getByText(/Kanban/i)).toBeInTheDocument();
  });

});

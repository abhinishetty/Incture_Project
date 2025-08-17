import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./Dashboard";
import { login } from "./authSlice";
import { ToastContainer } from "react-toastify";

beforeEach(() => {
  // Mock admin login
  store.dispatch(login({ username: "admin", role: "Admin" }));
});

test("Integration: Admin creates user and adds task", () => {
  render(
    <Provider store={store}>
      <Dashboard />
      <ToastContainer />
    </Provider>
  );

  // Add a new user
  fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: "Employee1" }});
  fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "emp1@test.com" }});
  fireEvent.click(screen.getByText(/Add User/i));
  expect(screen.getByText(/Employee1/i)).toBeInTheDocument();

  // Add a task in TaskList
  fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: "Setup DB" }});
  fireEvent.click(screen.getByText(/Add Task/i));
  expect(screen.getByText(/Setup DB/i)).toBeInTheDocument();
});

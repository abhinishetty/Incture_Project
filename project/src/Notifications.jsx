import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  return <ToastContainer position="top-right" autoClose={3000} />;
};

// Example helper to show toasts
export const notifySuccess = (msg) => toast.success(msg);
export const notifyError = (msg) => toast.error(msg);

export default Notifications;

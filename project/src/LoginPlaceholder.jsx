// LoginPlaceholder.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";

export default function LoginPlaceholder() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);

  async function handleLogin(e) {
    e.preventDefault();
    // Use demo credentials; authSlice will return a mock token if no API available
    await dispatch(login({ username: "demo", password: "password" }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Sign in</h3>
        <div className="mb-3">
          <label className="block text-sm">Username</label>
          <input name="username" className="mt-1 w-full p-2 border rounded" defaultValue="demo" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Password</label>
          <input name="password" type="password" className="mt-1 w-full p-2 border rounded" defaultValue="password" />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Sign in</button>

        {auth.status === "loading" && <div className="mt-2 text-sm text-gray-500">Signing in...</div>}
        {auth.error && <div className="mt-2 text-sm text-red-500">{auth.error}</div>}
      </form>
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./index.css"; // Import the CSS

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
}).required();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(loginAsync(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") navigate("/dashboard");
    });
  };

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-card">
        <h2 className="login-title">Enterprise Work Management System</h2>

        <div>
          <label>Username</label>
          <input {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        {status === "failed" && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

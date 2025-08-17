import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from './authSlice';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().required('Role is required')
});

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input {...register('name')} placeholder="Name" className="border p-2 rounded" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input {...register('email')} placeholder="Email" className="border p-2 rounded" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input type="password" {...register('password')} placeholder="Password" className="border p-2 rounded" />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <select {...register('role')} className="border p-2 rounded">
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <p className="text-red-500 text-sm">{errors.role?.message}</p>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/authSlice'; // adjust path if needed

export default function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
        headers: {
          'Content-Type': "application/json",
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user)); // set user in redux store
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Log in to your account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              value={input.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={input.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-gray-900 underline dark:text-gray-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

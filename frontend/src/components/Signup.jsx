import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export default function Signup() {
  const [input, setInput] = useState({
    fullname: "", // ✅ changed from "name" to "fullname"
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    if (e.target.name === "password" && confirmPassword) {
      setPasswordsMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(input.password === e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Server response:", res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h1>
        </div>
        <div className="w-full flex justify-center mb-5">
          <Logo />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              required
              type="text"
              id="fullname"
              name="fullname" // ✅ updated
              placeholder="John Doe"
              value={input.fullname} // ✅ updated
              onChange={handleChange}
            />
          </div>

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

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              required
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={
                !passwordsMatch
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {!passwordsMatch && (
              <p className="text-xs text-red-600 mt-1">
                Passwords do not match.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-10 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
          >
            Create an account
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-gray-900 underline dark:text-gray-200"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

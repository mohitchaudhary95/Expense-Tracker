import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './shared/logo'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' })
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post('http://localhost:8000/api/v1/user/login', input,{
      headers:{
        "Content-Type":'application/json'
      },
      withCredentials:true
    });
    console.log(res)
    if(res.data.success){
        dispatch(setAuthUser(res.data.user))
        toast.success(res.data.message)
        navigate("/")
    }
 }
    catch(error){
        console.log(error);
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-down transition-all duration-700"
      >
        <Logo />

        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Login to Your Account</h2>

        <div className="space-y-1">
          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <Button type="submit" className="w-full font-bold">
          Login
        </Button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline dark:text-blue-400">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login

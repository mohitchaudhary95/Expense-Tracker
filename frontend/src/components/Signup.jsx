import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './shared/logo'
import axios from 'axios'
import { toast } from 'sonner'

const Signup = () => {
  const [input, setInput] = useState({ fullname: '', email: '', password: '' })

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post('http://localhost:8000/api/v1/user/register', input,{
      headers:{
        "Content-Type":'application/json'
      },
      withCredentials:true
    });
    console.log(res)
    if(res.data.success){
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

        <h2 className="text-3xl font-bold text-center text-white-900">Create an Account</h2>

        <div className="space-y-1">
          <Label className="text-sm font-semibold text-gray-700">Full Name</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-semibold text-gray-700">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-semibold text-gray-700">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            placeholder="Create a password"
          />
        </div>

        <Button type="submit" className="w-full text-white font-bold">
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup

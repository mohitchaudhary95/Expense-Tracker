import React from 'react'
import Logo from './shared/Logo'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouthandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  }

  return (
    <div className='border-b border-gray-300'>
      <div className='flex items-center justify-between max-w-7xl mx-auto px-4 py-2'>
        <Logo />
        {
          user ? (
            <Popover>
              <PopoverTrigger aria-label="User menu">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <Button variant='link' onClick={logouthandler}>Logout</Button>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-4">
              <Link to='/login'>
                <Button>Login</Button>
              </Link>
              <Link to='/signup'>
                <Button className="bg-green-500 hover:bg-green-600 text-white">Sign Up</Button>
              </Link>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Navbar

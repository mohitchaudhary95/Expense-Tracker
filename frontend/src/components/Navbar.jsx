import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import Logo from "./shared/logo";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const user = true; // Replace with actual auth logic
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Logo />

      {user ? (
        <Popover>
          <PopoverTrigger className="outline-none">
            <Avatar className="cursor-pointer border-2 border-gray-300 hover:shadow-md transition">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-36 p-2">
            <Button
              variant="destructive"
              className="w-full text-sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="outline" className="text-sm px-4 py-2">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="text-sm px-4 py-2">Signup</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

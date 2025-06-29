import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import { Moon, Sun } from 'lucide-react';
import useTheme from "@/hooks/useTheme";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
    <nav className="sticky top-0 z-50 w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-950 backdrop-blur-lg shadow transition-colors">
      <Logo />

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>

      {user ? (
        <Popover>
          <PopoverTrigger className="outline-none">
            <Avatar className="cursor-pointer border-2 border-gray-300 hover:shadow-lg transition">
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
            <Button variant="outline" className="text-sm">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="text-sm">Signup</Button>
          </Link>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;

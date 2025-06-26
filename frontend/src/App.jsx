import './App.css'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { Toaster } from "@/components/ui/sonner"

const approuter=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
    {
    path:"/login",
    element:<Login/>
  },
    {
    path:"/signup",
    element:<Signup/>
  }
]);

function App() {
  return (
    <div>
      <RouterProvider const router={approuter} />
      <Toaster />
    </div>
  )
} 
export default App
  
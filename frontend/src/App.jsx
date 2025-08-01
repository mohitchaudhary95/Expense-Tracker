// import './App.css'
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import Home from './components/Home';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import {Toaster} from './components/ui/sonner';

// const appRouter = createBrowserRouter ([
// {
// path:"/",
// element:<Home/>
// },
// {
// path:"/login",
// element:<Login/>
// },
// {
// path: "/signup",
// element:<Signup/>
// },
// ])

// function App() {
//   return (
//     <div >
//       <RouterProvider router={appRouter}/>
//       <Toaster/>
//     </div>
//   )
// }

// export default App


import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster as SonnerToaster } from './components/ui/sonner';
import { Toaster as HotToaster } from 'react-hot-toast';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <SonnerToaster />
      <HotToaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;

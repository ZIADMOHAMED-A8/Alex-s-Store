import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Herosection from './pages/Herosection'
import Featpacks from './pages/Featpacks'
import Ratings from './pages/Rattings'
import Packages from './pages/Packages'
import Checkout from './pages/Checkout'
import Homepage from './pages/Homepage'
import ScrollToTop from "./ScrollToTop";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
export const router=createBrowserRouter([
  {
    path:'/',
    element:<Header></Header>,
    children:[
      {
        index:true,
        element:<Homepage></Homepage>
      },
      {
        path:'checkout/:gameIndex/:packIndex',
        element:<Checkout></Checkout>
      }
    ]  
  }
])
function App() {
  
  return (
    <>
     <ScrollToTop />
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  )
}

export default App

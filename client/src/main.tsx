import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/Login.tsx'
import RecordPage from './pages/Record.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RegisterPage from './pages/Register.tsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RecordPage/>,
  },
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>,
  },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer/>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

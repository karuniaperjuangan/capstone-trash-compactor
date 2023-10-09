import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/Login.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RegisterPage from './pages/Register.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>,
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
    <RouterProvider router={router}/>
  </React.StrictMode>
)

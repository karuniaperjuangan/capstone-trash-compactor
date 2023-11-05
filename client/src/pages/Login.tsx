import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate()

  if(localStorage.getItem('token')){
    navigate('/dashboard')
  }

  const onLogin = () => {
    axios.post(import.meta.env.VITE_BACKEND_URL + '/user/login', form)
    .then((res) => {
      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.token)
        toast.success('Login success')
        navigate('/')
      } else {
        alert(res.data.message)
      }
    })
    .catch((err) => {
      if(err.response.data.message){
        toast.error(err.response.data.message)
      }
      else if(err.response.data.errors[0].msg){
        toast.error(err.response.data.errors[0].msg)
      }
      else{
        toast.error('Login failed')
      }
    })
  }
  return (
    <div className=' min-h-screen w-screen flex-col flex'>
    <div className='text-black text-center rounded-md max-w-4xl mx-auto my-auto'>
      <h1>Login</h1>
      <div className='flex flex-col my-4'>
        <label>Username</label>
        <input type='text' className='bg-white outline outline-1 rounded-sm'
        onChange={
          (e) => {
            setForm({
              ...form,
              username: e.target.value
            })
          }
        }
        ></input>
      </div>
      <div className='flex flex-col my-4'>
        <label>Password</label>
        <input type='password' className='bg-white outline outline-1 rounded-sm'
        onChange={
          (e) => {
            setForm({
              ...form,
              password: e.target.value
            })
          }
        }
        ></input>
      </div>
      <div className='w-full text-start'>
      <Link to='/register'>Belum punya akun?</Link>
      </div>
      <button onClick={onLogin} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Login
      </button>
    </div>
  </div>  
  )
}


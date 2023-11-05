import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const onRegister = () => {
    if(form.password !== form.confirmPassword){
      toast.error('Password does not match')
      return
    }
    axios.post(import.meta.env.VITE_BACKEND_URL + '/user/signup', form)
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        toast.success('Register success')
        navigate('/')
      } else {
        console.log(res)
      }
    })
    .catch((err) => {
      if(err.response.data.msg){
        toast.error(err.response.data.msg)
      }
      else if(err.response.data.errors){
        toast.error(err.response.data.errors[0].msg)
      }
      else{
        toast.error('Register failed')
      }
    })
  }

  return (
    <div className=' min-h-screen w-screen flex-col flex'>
    <div className='text-black text-center rounded-md max-w-4xl mx-auto my-auto'>
      <h1>Register</h1>
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
      <div className='flex flex-col my-4'>
        <label>Confirm Password</label>
        <input type='password' className='bg-white outline outline-1 rounded-sm'
        onChange={
          (e) => {
            setForm({
              ...form,
              confirmPassword: e.target.value
            })
          }
        }
        ></input>
      </div>
      <div className='w-full text-start'>
      <a href='' className='text-blue-500'>Not yet registered?</a>
      </div>
      <button onClick={onRegister} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Register
      </button>
    </div>
  </div>  
  )
}


import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export default function LoginPage() {

  return (
    <div className=' min-h-screen w-screen flex-col flex'>
    <div className='text-black text-center rounded-md max-w-4xl mx-auto my-auto'>
      <h1>Login</h1>
      <div className='flex flex-col my-4'>
        <label>Username</label>
        <input type='text' className='bg-white outline outline-1 rounded-sm'></input>
      </div>
      <div className='flex flex-col my-4'>
        <label>Password</label>
        <input type='password' className='bg-white outline outline-1 rounded-sm'></input>
      </div>
      <div className='w-full text-start'>
      <a href='' className='text-blue-500'>Not yet registered?</a>
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Login
      </button>
    </div>
  </div>  
  )
}

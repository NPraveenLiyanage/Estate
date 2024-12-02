import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUP() {
  const [formData, setFormData] = useState({})//create formData object and change object using setFormData function
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlechange = (e) => {
    setFormData({
      ...formData,//spread operator
      [e.target.id]:e.target.value,
    });
  };

  const handleSubmit = async (e) => {//prevent reloading the page
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('/backend/auth/signup',//need Proxy when we we call another port that not specified(eg:call 5173 not 3000)
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      }
      );
      const data = await res.json();
      if(data.success == false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/Signin');//if there no error navigate to signin page
    }catch(error){
      setLoading(false);
      setError(error.message);
    }
  };//look vite.config.js for proxy

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign UP</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handlechange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handlechange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handlechange}/>
        <button disabled = {loading} className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign up'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/Signin"}>
          <span className='text-blue-600'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

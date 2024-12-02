"use client"
import React from 'react'
import "@/styles/Signin.css";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signin, setSignin] = useState('');
  const SendReq = async () => {
    const data = {
        email: email,
        password: password
    }
    const response = await axios.post("/api/signin", data, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'signin',
        },
    });
    const result = await response.data.message;
    if (result === "0") {
        setSignin("Login successfully....");
        router.push('/page_s/account/dashboard');
    } else if (result === "1") {
        setSignin("incorrect password");
    } else if (result === "2") {
        setSignin("User not found");
    } else {
        setSignin("Error while signing in: " + result);
    }
  }
  
  return (
    <div>
      <div className='Main'>
        <h1>Sign in</h1>
        <p>{signin}</p>
        <input className='SigninInput' onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' />
        <input className='SigninInput' onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' />
        <button onClick={SendReq} className='SigninButton'>Sign in</button>
      </div>
    </div>
  )
}

export default Page; 

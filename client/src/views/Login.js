import React,{useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import RegistrationForm from '../components/RegistrationForm';


export default function Login(){
  const[email,setEmail] =useState('');
  const[password,setPassword] = useState('');
  const[err,setErr] = useState("");


function handleSubmit(e){
  e.preventDefault();
  setErr('');
  axios.post('http://localhost:8000/api/users/login',{
    email,
    password
  },{withCredentials:true})
    .then(()=>navigate('/pirates'))
    .catch(()=>setErr('pls check your credentials'))
    
}


  return (
    <>
    <h1>Login page</h1>
    {err && (
                <p style = {{color: 'red'}}>{err}</p>
            )}
    <form onSubmit={handleSubmit}>
      <div>
        <label >Email</label>
        <input 
        name="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        />
      </div>
      <div>
        <label >Password</label>
        <input 
        name="password"
        type="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
    <RegistrationForm />
    </>
  )
}
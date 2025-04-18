import React, { useState } from 'react';
import { Button } from '@mui/material';
import AuthForm from '../components/AuthForm';
import InputField from '../components/InputField';
import { useDispatch } from 'react-redux';
import { supabase } from '../../SupabaseClient';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{  
    const { data,error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if(error){
      throw new Error("Sign up failed",error);
    }

    navigate("/signin")

    }catch(error){
      console.error('Sign Up Error:', error);
    }

  };

  return (
    <AuthForm title="Sign Up" onSubmit={handleSubmit}>
      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </AuthForm>
  );
};

export default SignUp;
import React, { useState } from 'react';
import { Button } from '@mui/material';
import AuthForm from '../components/AuthForm';
import InputField from '../components/InputField';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('SignUp Data:', { username, email, password });

    try{ 
      const res = await fetch('https://apex.oracle.com/pls/apex/maternal_health_dashboard/user/register/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
    
      const data =  res.json();
      console.log('Sign Up Data:', data);
    }catch(error){
      console.error('Sign Up Error:', error);
    }
    // Add your sign-up logic here
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
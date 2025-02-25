import React, { useState } from 'react';
import { Button } from '@mui/material';
import AuthForm from '../components/AuthForm';
import InputField from '../components/InputField';
import { useDispatch } from 'react-redux';
import { saveId,saveEmail } from '../slices/userInfoSlice';
import { supabase } from '../../SupabaseClient';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{  
    const { data, error } = await supabase.from('USERS').insert([
      { EMAIL: email, PASSWORD_HASH: password },
    ]).select()

    dispatch(saveId(data[0]['USER_ID']));
    dispatch(saveEmail(data[0]['EMAIL']));

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
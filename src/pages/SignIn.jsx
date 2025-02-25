import React, { useState } from 'react';
import { Button } from '@mui/material';
import AuthForm from '../components/AuthForm';
import InputField from '../components/InputField';
import { supabase } from '../../SupabaseClient';
import { useDispatch } from 'react-redux';
import { saveId } from '../slices/userInfoSlice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('SignIn Data:', { email, password });
    // Add your sign-in logic here
    try{
      const { data, error } = await supabase.from('USERS').select()
      .eq('EMAIL', email)
      .eq('PASSWORD_HASH', password);

    dispatch(saveId(data[0]['USER_ID']));

    }catch(error){
      console.error(error)
    }
  };

  return (
    <AuthForm title="Sign In" onSubmit={handleSubmit}>
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
        Sign In
      </Button>
    </AuthForm>
  );
};

export default SignIn;
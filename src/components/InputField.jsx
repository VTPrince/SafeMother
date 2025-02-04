import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ label, type, value, onChange, required }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
};

export default InputField;
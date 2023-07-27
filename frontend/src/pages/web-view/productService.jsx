import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const initialValues = {
  firstName: '',
  email: '',
  phonenumber: '',
};

const Form = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const validateOnChange = true

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('firstName' in fieldValues) temp.fullName = fieldValues.fullName ? '' : 'This field is required.';
    if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';
    if ('phonenumber' in fieldValues) temp.phonenumber = fieldValues.phonenumber.length > 9 ? '' : 'Minimum 10 numbers required.';
    // if ('departmentId' in fieldValues)
    //   temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }

    return false
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // if (validateOnChange) validate({ [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault()
    if (validate()) {
     alert('gone')
   }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <TextField
            variant="outlined"
            label="firstName"
            fullWidth
            autoComplete="firstName"
            onChange={handleInputChange}
            error={errors.firstName}
            autoFocus
          />

          {/* <TextField variant="outlined" label="lastName" fullWidth autoComplete="lastName" autoFocus />
          <br />
          <br />
          <TextField variant="outlined" label="email" fullWidth autoComplete="email" autoFocus /> */}
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login In / Sign Up
        </Button>
      </form>
    </>
  );
};

export default Form;

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputAdornment, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { USER_LOGIN_RESET } from '../../constants/auth.constant';

// components
import Iconify from '../form-input/iconify';

import { userLoginAction } from '../../actions/auth.action';
import Header from '../../pages/web-view/header/header.component';

// TODO remove, this demo shouldn't need to reset the theme.

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {  loading, userInfo } = userLogin;

  const loginField = {
    email: '',
    password: '',
  };

  const [formField, setFormField] = useState(loginField);

  const { email, password } = formField;

  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormField({ ...formField, [name]: value });
  };

  const handleValidation = () => {
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      setemailError('email is required');
    }

    if (email && !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      formIsValid = false;
      setemailError('email not valid');
    }

    if (!password) {
      formIsValid = false;
      setpasswordError('password is required');
    }
    return formIsValid;
  };

  const handleClick = () => {
    if (handleValidation()) {
      dispatch(userLoginAction(email, password));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo?.success) {
      toast.success(`${userInfo?.message}`);
      navigate('/GroceryShop/home', { replace: true });
    }

    if (userInfo && !userInfo?.success) {
      toast.error(`${userInfo?.message}`);
      dispatch({
        type: USER_LOGIN_RESET,
      });
      localStorage.removeItem('userInfo');
    }
  }, [navigate, userInfo, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Header />
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 4,
          padding: '1rem',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box spacing={3} component="form">
          <TextField
            sx={{ my: 3 }}
            type="email"
            required
            fullWidth
            value={email}
            onChange={handleChange}
            error={emailError}
            helperText={emailError}
            name="email"
            label="Email address"
          />

          <TextField
            sx={{ mb: 3 }}
            name="password"
            label="Password"
            fullWidth
            value={password}
            onChange={handleChange}
            required
            error={passwordError}
            helperText={passwordError}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          {loading && <>.....</>} Login
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default LoginForm;

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputAdornment, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_LOGIN_RESET } from '../../constants/auth.constant';



// components
import Iconify from '../form-input/iconify';

import { userLoginAction } from '../../actions/auth.action';
import Header from "../../pages/web-view/header/header.component"

// TODO remove, this demo shouldn't need to reset the theme.

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success, loading, msg } = userLogin;

  const loginField = {
    email: '',
    password: '',
  };

    // const [error, setError] = useState(null);
    // const [required, setRequired] = useState(false);
    // const [helperText, setHelperText] = useState('');

  const [formField, setFormField] = useState(loginField);

  const { email, password } = formField;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormField({ ...formField, [name]: value });

    // if (email !== "") {
    //   setError(false)
    //   setHelpedText('')
    // } else {
    //    setError(true)
    //   setHelpedText('')
    // }
  };

  // const handleValidation = (e) => {
  //   let formIsValid = true;

  //   if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
  //     formIsValid = false;
  //     setemailError('Email Not Valid');
  //     return false;
  //   }

  //   if (!password.match(/^[a-zA-Z]{6,22}$/)) {
  //     formIsValid = false;
  //     setpasswordError('length must be min 6 Chracters');
  //     return false;
  //   } 

  //   return formIsValid;
  // };

  const handleClick = () => {
    if(!email && !password){
      toast.error("email and password are required")
    } 

    dispatch(userLoginAction(email, password));
    // handleValidation()
  };

  // useEffect(() => {
  //   if (userInfo?.success === false) {
  //     toast.error(userInfo?.msg);
  //     dispatch({
  //     type: USER_LOGIN_RESET
  //     })
  //   }else 
  //   if (userInfo?.user) {
  //     toast.success('user Loggin successfully');
  //     navigate('/GroceryShop/home')
  //   }
  // }, [dispatch, navigate, userInfo]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Header />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 2,
          padding: '1rem'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleClick} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={email}
            error={email !== '' && !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)}
            helperText={email !== '' && !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) ? "email is not valid" : " "}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={password}
            error={password !== '' && !password.match(/^[a-zA-Z]{6,22}$/)}
            helperText={
              password !== '' && !password.match(/^[a-zA-Z]{6,22}$/) ? 'password length must be min 6 Chracters' : ' '
            }
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
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link style={{ color: 'black', textDecoration: 'none' }} to={'/register-user'}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link style={{ color: 'black', textDecoration: 'none' }} to={'/register-user'}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;

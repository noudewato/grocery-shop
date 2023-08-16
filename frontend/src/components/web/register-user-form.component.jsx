import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button"
import { InputAdornment, IconButton, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { USER_LOGIN_RESET, USER_REGISTER_RESET } from '../../constants/auth.constant';

// components
import Iconify from '../form-input/iconify';

import { userRegisterAction } from '../../actions/auth.action';
import Header from '../../pages/web-view/header/header.component';

// TODO remove, this demo shouldn't need to reset the theme.

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading: registerLoading } = userRegister;

  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(userRegisterAction(username, phonenumber, email, password, image));
    }
  };

  const [usernameError, setusernameError] = useState('');
  const [phonenumberError, setphonenumberError] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleValidation = () => {
    let formIsValid = true;
    if (!username) {
      formIsValid = false;
      setusernameError('username is required');
    }
    if (!phonenumber) {
      formIsValid = false;
      setphonenumberError('email is required');
    }

    if (email && email.length > 10) {
      formIsValid = false;
      setemailError('number is too long');
    }

    if (email && !email.match(/^[0-9]+$/)) {
      formIsValid = false;
      setemailError('only letter is required');
    }

    if (phonenumber && !phonenumber.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      formIsValid = false;
      setphonenumberError('email not valid');
    }

    if (!email) {
      formIsValid = false;
      setemailError('phone is required');
    }

    if (!password) {
      formIsValid = false;
      setpasswordError('password is required');
    }
    return formIsValid;
  };

  const uploadingHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload/upload-images', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo?.success) {
      toast.success(`${userInfo?.message}`);
      navigate('/GroceryShop/home', { replace: true });
      dispatch({
        type: USER_REGISTER_RESET,
      });
      localStorage.removeItem('userInfo');
    }

    if (userInfo && !userInfo?.success) {
      toast.error(`${userInfo?.message}`);
      dispatch({
        type: USER_REGISTER_RESET,
      });
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
        <Typography component="h1" variant="h5" sx={{ my: 1 }}>
          Sign in
        </Typography>
        <Box spacing={3} component="form">
          <Grid container>
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  margin: 'auto',
                  position: 'relative',
                  mb: 2
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={image}
                  sx={{
                    width: 150,
                    height: 150,
                    margin: 'auto',
                    position: 'relative',
                  }}
                />
                <label
                  htmlFor="image"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    textAlign: 'center',
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    borderRadius: '50%',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <input style={{ display: 'none' }} id="image" name="image" onChange={uploadingHandler} type="file" />

                  <Button color="secondary" variant="contained" component="span">
                    {uploading && <>.......</>} pic
                  </Button>
                </label>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField
                sx={{ mr: '5px', my: 1 }}
                type="text"
                required
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                helperText={usernameError}
                name="username"
                label="Username"
              />
            </Grid>

            <Grid xs={12} sm={12} md={6}>
              <TextField
                sx={{ ml: '5px', my: 1 }}
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError}
                name="email"
                label="Phone"
              />
            </Grid>
            <Grid xs={12} sm={12} md={12}>
              <TextField
                sx={{ my: 3 }}
                type="text"
                required
                fullWidth
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                error={phonenumberError}
                helperText={phonenumberError}
                name="phonenumber"
                label="Email"
              />
            </Grid>

            <Grid xs={12} sm={12} md={12}>
              <TextField
                sx={{ mb: 3 }}
                name="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            </Grid>
          </Grid>
        </Box>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={submitHandler}>
          {registerLoading && <>.....</>} Register
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default LoginForm;

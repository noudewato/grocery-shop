import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputAdornment, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

// components
import Iconify from '../form-input/iconify';

import { userRegisterAction } from '../../actions/auth.action';

// TODO remove, this demo shouldn't need to reset the theme.

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { success, loading, userInfo } = userLogin;

  const loginField = {
    username: '',
    email: '',
    password: '',
    phonenumber: '',
  };

  const [formField, setFormField] = useState(loginField);

  const { email, password, username, phonenumber } = formField;

  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState('')

  const [usernameError, setusernameError] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [phonenumberError, setphonenumberError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormField({ ...formField, [name]: value });
  };

  const handleValidation = () => {
    let formIsValid = true;
    if (!username) {
      formIsValid = false;
      setusernameError('username is required');
    }
    if (!email) {
      formIsValid = false;
      setemailError('email is required');
    }
    if (!password) {
      formIsValid = false;
      setpasswordError('password is required');
    }
    if (!phonenumber) {
      formIsValid = false;
      setphonenumberError('phonenumber is required');
    }
    return formIsValid;
  };

  const handleClick = () => {
    if (handleValidation()) {
      dispatch(userRegisterAction(username, email, password, phonenumber, image));
    }
  };

  useEffect(() => {
    if (success) {
      toast.success('success');
      navigate('/GroceryShop/home', { replace: true });
    }
  }, [success, navigate, userInfo]);

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


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
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
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Box
            sx={{
              width: 150,
              height: 150,
              margin: 'auto',
              position: 'relative',
              mb: 3,
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
                {uploading && <>...</>} Up
              </Button>
            </label>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="username"
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={username}
                onChange={handleChange}
                error={username}
                helperText={username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phonenumber"
                label="phonenumber"
                name="phonenumber"
                autoComplete="number"
                value={phonenumber}
                onChange={handleChange}
                error={phonenumber}
                helperText={phonenumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                error={email}
                helperText={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                error={password}
                helperText={password}
                onChange={handleChange}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 4, mb: 3 }}
            onClick={handleClick}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/GroceryShop/login-user" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;

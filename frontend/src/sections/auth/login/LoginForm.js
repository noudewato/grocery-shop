import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

// components
import Iconify from '../../../components/form-input/iconify';

import { userLoginAction } from '../../../actions/auth.action';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { success, loading, userInfo } = userLogin;

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
    if (success) {
      toast.success('success');
      navigate('/dashboard/app', { replace: true });
    } 
  }, [success, navigate, userInfo]);

  return (
    <>
      <Stack spacing={3} component="form">
        <TextField
          type="email"
          required
          value={email}
          onChange={handleChange}
          error={emailError}
          helperText={emailError}
          name="email"
          label="Email address"
        />

        <TextField
          name="password"
          label="Password"
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        {loading && <>.....</>} Login
      </LoadingButton>
    </>
  );
}

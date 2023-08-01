import { Container, Stack, Typography, Button, Box, FormControlLabel, Switch, Grid, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/spinner/spinner.component';
import { USER_UPDATE_RESET } from '../constants/auth.constant';
import { userDetailsAction, userUpdateAction } from '../actions/auth.action';
import FormInput from '../components/form-input/form-input.component';

const EditUserPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdate;

  const [username, setUsername] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setemailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [phonenumberError, setphonenumberError] = useState('');
  const [isAdmin, setisAdmin] = useState(true);
  const [isadminError, setisadminError] = useState(false);
  const [image, setImage] = useState('');
  const [imageError, setimageError] = useState('');

  useEffect(() => {
    dispatch(userDetailsAction(id));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, id, error]);

  useEffect(() => {
    if (successUpdate) {
      toast.success('updated successfully');
      setUsername('');
      setEmail('');
      setPassword('');
      setImage('');
      setPhonenumber('');
      navigate('/dashboard/user');
      dispatch({
        type: USER_UPDATE_RESET,
      });
    } else {
      toast.error(errorUpdate);
    }
  }, [successUpdate, error]);

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
    if (!phonenumber) {
      formIsValid = false;
      setphonenumberError('phone is required');
    }

    return formIsValid;
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.password);
      setPhonenumber(user.phonenumber);
      setImage(user.image);
      setisAdmin(user.isAdmin);
    }
  },[user])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const setTimmer = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
        }
      }, 2500);

      return () => clearTimeout(setTimmer);
    }, []);

    const handleEditProductClick = (e) => {
      e.preventDefault();
      if (handleValidation()) {
        dispatch(
          userUpdateAction({
            _id: id,
            username,
            email,
            password,
            phonenumber,
            isAdmin,
          })
        );
      }
    };

    return (
      <div className="new-pr">
        <Helmet>
          <title>Dashboard | Edit User</title>
        </Helmet>
        {isLoading ? (
          <Spinner />
        ) : (
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Edit User
              </Typography>
            </Stack>

            <Box
              component="form"
              sx={{
                p: 5,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                boxShadow: 1,
                borderRadius: 4,
              }}
            >
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: 300,
                      height: 300,
                      margin: 'auto',
                      position: 'relative',
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={image}
                      sx={{
                        width: 300,
                        height: 300,
                        margin: 'auto',
                        position: 'relative',
                      }}
                    />
                    {/* <label
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
                    <input
                      style={{ display: 'none' }}
                      id="image"
                      name="image"
                      onChange={uploadingHandler}
                      type="file"
                    />

                    <Button color="secondary" variant="contained" component="span">
                      {uploading && <>.......</>} Upload Image
                    </Button> 
                  </label> */}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={3}>
                    <FormInput
                      text="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                      name="username"
                      label="Username"
                      error={usernameError}
                      helperText={usernameError}
                    />
                    <FormInput
                      text="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      name="email"
                      label="Email"
                      error={emailError}
                      helperText={emailError}
                    />

                    <FormInput
                      text="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      name="password"
                      label="Password"
                    />

                    <FormInput
                      text="text"
                      value={phonenumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                      fullWidth
                      name="phonenumber"
                      label="Phone"
                      error={phonenumberError}
                      helperText={phonenumberError}
                    />

                    <FormControlLabel
                      checked={isAdmin}
                      onChange={(e) => setisAdmin(e.target.checked)}
                      label="isActive?"
                      control={<Switch />}
                    />

                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={handleEditProductClick}
                    >
                      {loadingUpdate && <>...</>}   Edit User
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Container>
        )}
      </div>
    );
  };

export default EditUserPage;

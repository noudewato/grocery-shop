import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Grid, Button, Container, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import { userProfileUpdateAction } from '../../actions/auth.action';
import { orderListMyAction } from '../../actions/order.action';
import FormInput from '../../components/form-input/form-input.component';
import Header from './header/header.component';
import Label from '../../components/label/Label';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { loading } = userProfileUpdate;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders } = orderListMy;

  const [username, setUsername] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setemailError] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [phonenumberError, setphonenumberError] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  // useEffect(() => {
  //   if (successUpdate) {
  //     toast.success('updated successfully');
  //     setUsername('');
  //     setEmail('');
  //     setPassword('');
  //     setImage('');
  //     setPhonenumber('');
  //   }
  // }, [successUpdate]);

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

  const handleEditProfileClick = () => {
    if (handleValidation()) {
      dispatch(
        userProfileUpdateAction({
          username,
          email,
          password,
          phonenumber,
          image,
        })
      );
    }
  };

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo?.user?.username);
      setEmail(userInfo?.user?.email);
      setPassword(userInfo?.user?.password);
      setPhonenumber(userInfo?.user?.phonenumber);
      setImage(userInfo?.user?.image);
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(orderListMyAction());
  }, [dispatch]);

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
    <>
      <Header />
      <Container sx={{ mt: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography variant="h6">User Profile</Typography>
            <Box component="form" sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3, p: 3 }}>
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
                    {uploading && <>.......</>} Upload Image
                  </Button>
                </label>
              </Box>
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

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleEditProfileClick}
                >
                  {loading && <>...</>} Edit Profile
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Typography variant="h6">Orders</Typography>
            {orders?.map((o) => (
              <Box
                key={o._id}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: 3,
                  p: 3,
                  mb: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="body1" sx={{ color: 'grey', mb: 1 }}>
                    {moment(o.createdAt).format('DD/MM/YYYY hh:mm: A')}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>Order No.{o._id.slice(0, 7)}</Typography>

                  <Typography sx={{ mb: 1 }}>
                    {o.paymentMethod === 'Cash On Delivery' || o.paymentMethod === 'Mobile Money' ? (
                      <Label color="success">Paid</Label>
                    ) : (
                      ''
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ my: 1 }}>
                    {o.status === 'pending' ? (
                      <Label color="success">Pending</Label>
                    ) : o.status === 'cancel' ? (
                      <Label color="error">Cancel</Label>
                    ) : o.status === 'approved' ? (
                      <Label color="secondary">Approved</Label>
                    ) : (
                      <Label color="primary">Approved</Label>
                    )}
                  </Typography>

                  <Typography sx={{ my: 1 }}>{o.totalPrice}</Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;

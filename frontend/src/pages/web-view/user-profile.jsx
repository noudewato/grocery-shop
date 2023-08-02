import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfileUpdateAction } from '../../actions/auth.action';
import { Box, Grid } from '@mui/material';
import FormInput from '../../components/form-input/form-input.component';

const UserProfile = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
  const [username, setUsername] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setemailError] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [phonenumberError, setphonenumberError] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false)

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
    
    const handleEditProfileClick = () => {
        if (handleValidation()) {
            dispatch(
              userProfileUpdateAction({
                username,
                email,
                password,
                phonenumber,
                image
              })
            );
        }
    }

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo?.user?.username);
      setEmail(userInfo?.user?.email);
      setPassword(userInfo?.user?.password);
      setPhonenumber(userInfo?.user?.phonenumber);
      setImage(userInfo?.user?.image);
    }
  }, [user]);

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
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box component="form">
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

              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleEditProfileClick}>
                {loadingUpdate && <>...</>} Edit Profile
              </LoadingButton>
            </Box>
            <FormInput />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          hi
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;

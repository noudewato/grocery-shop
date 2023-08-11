import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/auth.action';

// mocks_
import account from '../../../_mock/account';
import Spinner from '../../../components/spinner/spinner.component';

// import {us}

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Register',
//     icon: 'eva:home-fill',
//   }
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // const [isLoading, setIsLaoding] = useState(false)

  const logoutHandler = () => {
    dispatch(logout());
    //  setIsLaoding(true)
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={userInfo && userInfo?.user?.image} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {userInfo && userInfo?.user?.isAdmin === false ? (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {userInfo?.user?.email}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {userInfo?.user?.email}
              </Typography>
            </Box>
            <MenuItem>
              <Link style={{ color: 'black', textDecoration: 'none' }} to={'/GroceryShop/user-profile'}>
                User Profile
              </Link>
            </MenuItem>
          </>
        ) : userInfo && userInfo?.user?.isAdmin ? (
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {userInfo?.user?.email}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {userInfo?.user?.email}
              </Typography>
            </Box>
        ) : (
          <MenuItem>User</MenuItem>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {userInfo && userInfo?.user ? (
          <MenuItem sx={{ display: 'none' }}>
            <Link style={{ color: 'black', textDecoration: 'none', display: 'none' }} to={'/login-user'}>
              Login
            </Link>
          </MenuItem>
        ) : (
          <MenuItem>
            <Link style={{ color: 'black', textDecoration: 'none' }} to={'/register-user'}>
              Register
            </Link>
          </MenuItem>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {userInfo && userInfo.user ? (
          <MenuItem onClick={logoutHandler} sx={{ m: 1 }}>
            Logout
          </MenuItem>
        ) : (
          <MenuItem>
            <Link style={{ color: 'black', textDecoration: 'none' }} to={'/login-user'}>
              Login
            </Link>
          </MenuItem>
        )}
      </Popover>
    </>
  );
}

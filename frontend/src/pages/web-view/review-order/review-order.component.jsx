import React from 'react';
import { Typography, Stack, Box, Button, Grid, ListItem, ListItemText, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../../actions/order.action';

const ReviewOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, deliverAddress, paymentMethod } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, success, createdOrder } = orderCreate;

  const addRoundedNumber = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

   cartItems.itemsPrice = addRoundedNumber(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0));

  cartItems.taxPrice = addRoundedNumber(0.12 * cartItems.itemsPrice);

  cartItems.deliveryPrice =
    cartItems.itemsPrice > 100 ? addRoundedNumber(0.2 * cartItems.itemsPrice) : addRoundedNumber(0);
  
  cartItems.totalPrice = addRoundedNumber(
    cartItems.itemsPrice + cartItems.taxPrice
  );

  const placeOrder = () => {
    dispatch(
      addOrder({
        orderItems: cartItems,
        paymentMethod,
        deliverAddress,
        itemsPrice: cartItems.itemsPrice,
        deliverPrice: cartItems.deliveryPrice,
        taxPrice: cartItems.taxPrice,
        totalPrice: cartItems.totalPrice,
        isPaid: true,
      })
    );
  }

  const orthers = [{name: 'SubTotal', price: cartItems.itemsPrice}, {name: 'TaxPrice', price: cartItems.taxPrice }, {name:'DeliveryPrice', price: cartItems.deliveryPrice  === 0 ? 'Free' : cartItems.deliveryPrice}];
  return (
    <Stack sx={{ margin: '1rem' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <Box
            sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3, padding: '1rem', marginBottom: '2rem' }}
            component="form"
          >
            <Typography variant="h6">Customer Info</Typography>
            <Stack>
              <Box sx={{ display: 'flex' }}>
                <p>Name:</p>
                <span>{userInfo.username}</span>
              </Box>

              <Box sx={{ display: 'flex' }}>
                <p>Email:</p>
                <span>{userInfo?.user?.email}</span>
              </Box>

              <Box sx={{ display: 'flex' }}>
                <p>Number:</p>
                <span>{userInfo?.user?.phonenumber}</span>
              </Box>

              <Typography variant="h6">Address & Payment Method</Typography>

              <Box sx={{ display: 'flex' }}>
                <p>address:</p>
                <span>
                  {deliverAddress?.city},{deliverAddress?.location}
                </span>
              </Box>

              <Box sx={{ display: 'flex' }}>
                <p>Payment:</p>
                <span>{paymentMethod}</span>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3, padding: '1rem' }}>
            <Typography variant="h6" marginBottom="1rem">
              Cart
            </Typography>
            {cartItems.map((item) => (
              <ListItem key={item._id} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={item.name} secondary={<Avatar src={item.image} alt={item.name} />} />
                <ListItemText primary={item.qty} secondary={item.desc} />
                <ListItemText primary={item.price} secondary={item.desc} />
                <Typography variant="body2">{item.qty * item.price}</Typography>
              </ListItem>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3, marginBottom: '1.5rem' }}>
            <Stack direction="row" alignItems="center" sx={{ padding: '1rem' }}>
              <Typography variant="h6">OrderSummary</Typography>
            </Stack>

            <Stack sx={{ padding: '1rem' }}>
              {orthers.map((orther, index) => (
                <ListItem key={index} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={orther.name} />
                  <Typography variant="body2">{orther.price}</Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {cartItems.totalPrice}
                </Typography>
              </ListItem>
            </Stack>
          </Box>

          <Button variant="contained" color="success" fullWidth sx={{ color: 'white' }} onClick={placeOrder}>
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ReviewOrder;

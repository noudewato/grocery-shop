import React, { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Stack,
  Typography,
  Grid,
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
  IconButton,
  ListItem,
  Link,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, reduceItemFromCart, removeFromCart } from '../../../actions/cart.action';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [countCartItem, setCountCartItem] = useState(0);
  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0);
    setCountCartItem(count);
  }, [dispatch, cartItems]);

  const addRoundedNumber = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cartItems.itemsPrice = addRoundedNumber(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0));

  cartItems.taxPrice = addRoundedNumber(0.12 * cartItems.itemsPrice);

  cartItems.deliveryPrice =
    cartItems.itemsPrice > 100 ? addRoundedNumber(0.2 * cartItems.itemsPrice) : addRoundedNumber(0);

  cartItems.totalPrice = addRoundedNumber(cartItems.itemsPrice + cartItems.taxPrice);

  const orthers = [
    { name: 'SubTotal', price: cartItems.itemsPrice },
    { name: 'TaxPrice', price: cartItems.taxPrice },
    { name: 'DeliveryPrice', price: cartItems.deliveryPrice === 0 ? 'Free' : cartItems.deliveryPrice },
  ];

  return (
    <Stack sx={{ margin: '1rem' }}>
      {!userInfo?.user?.username ? (
        <Box
          sx={{
            textAlign: 'center',
            mx: 'auto',
            mb: '3rem',
            border: '1px solid red',
            p: 2,
            textTransform: 'capitalize',
            borderRadius: 2,
            width: '300px',
            fontWeight: 'bold',
            backgroundColor: 'red',
            color: 'white'
          }}
        >
          Please login Before Proceed
        </Box>
      ) : (
        <></>
      )}
      {cartItems?.length === 0 ? (
        <Grid>
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '10px', boxShadow: 3 }}>
            <Typography variant="h6">
              Your Cart is empty <Link href="/GroceryShop/home">Go back</Link>
            </Typography>
          </Box>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            // sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3 }}
          >
            <Box sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3 }}>
              <Stack direction="row" alignItems="center" sx={{ padding: '1rem' }}>
                <Typography variant="h6">Cart</Typography>
                <span style={{ color: 'lightgray' }}>({countCartItem} Items)</span>
              </Stack>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>TotalPrice</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((cartItem) => (
                      <TableRow key={cartItem._id}>
                        <TableCell component="th" scope="row" padding="2px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={cartItem.name} src={cartItem.image} />
                            <Typography variant="subtitle2" noWrap>
                              {cartItem.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            GHs{cartItem.price}
                          </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="2px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <IconButton
                              onClick={() => {
                                dispatch(addToCart(cartItem, cartItem.qty + 1));
                              }}
                            >
                              <ControlPointIcon />
                            </IconButton>

                            <Typography variant="subtitle2" noWrap>
                              {cartItem.qty}
                            </Typography>
                            <IconButton
                              onClick={() => dispatch(reduceItemFromCart(cartItem))}
                              disabled={cartItem.qty === 1}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            GHs{cartItem.qty * cartItem.price}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            <IconButton onClick={() => dispatch(removeFromCart(cartItem))}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3, marginBottom: '2rem' }}>
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

            {/* <Button variant="contained" color="success" fullWidth sx={{ color: 'white' }} onClick={handleNext}>
              Continue
            </Button> */}
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default Cart;

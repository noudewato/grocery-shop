import React, { useState } from 'react';
import { Stack, Typography, Grid, Box, Button, FormControlLabel, RadioGroup, Radio, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliverAddress, savePaymentMethod } from '../../../actions/cart.action';
import FormInput from '../../../components/form-input/form-input.component';
import { fCurrency } from '../../../utils/formatNumber';

const Payment = ({ setIsAddressFilled }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, paymentMethod, deliverAddress } = cart;

  const onSubmitAddress = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodName));
    dispatch(saveDeliverAddress({city, location}));
    setIsAddressFilled(!!city && !!location);
  };

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

  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'Cash On Delivery' || 'Mobile Money');
  const [city, setCity] = useState(deliverAddress?.city || "");
  const [location, setLocation] = useState(deliverAddress?.location || "");
  
  console.log(paymentMethodName);
  console.log(city)
  console.log(location);

  return (
    <Stack sx={{ margin: '1rem' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <Box
            sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3, padding: '1rem', marginBottom: '2rem' }}
            component="form"
          >
            <Typography variant="h6">Payment Method</Typography>
            <Box>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Cash On Delivery"
                  checked={paymentMethodName === 'Cash On Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  control={<Radio />}
                  label="Cash On Delivery"
                />
                <FormControlLabel
                  value="Mobile Money"
                  checked={paymentMethodName === 'Mobile Money'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  control={<Radio />} 
                  label="Mobile Money"
                />
              </RadioGroup>
            </Box>
          </Box>
          <Box
            sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3, padding: '1rem', marginBottom: '2rem' }}
          >
            <Typography variant="h6" marginBottom="1rem">
              Address
            </Typography>
            <Box>
              <Stack spacing={3} marginBottom="1rem">
                <FormInput
                  text="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  name="city"
                  label="Enter your city"
                />
                <FormInput
                  text="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  name="location"
                  fullWidth
                  label="Enter your location"
                />
              </Stack>
              <Button variant="outlined" onClick={onSubmitAddress}>
                save changes
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: 3, padding: '1rem', marginBottom: '2rem' }}
            component="form"
          >
            <Typography variant="h6">Customer Info</Typography>
            <p>{paymentMethod}</p>
            <p>{city}</p>
            <p>{location}</p>
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
                  <Typography variant="body2">{fCurrency(orther.price)}</Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {fCurrency(cartItems.totalPrice)}
                </Typography>
              </ListItem>
            </Stack>
          </Box>

          {/* <Button variant="contained" color="success" fullWidth sx={{ color: 'white' }} onClick={handleNext}>
            Continue
          </Button> */}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Payment;

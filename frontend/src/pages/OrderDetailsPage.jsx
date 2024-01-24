import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableBody,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import {useReactToPrint} from 'react-to-print';
import { ORDER_DETAILS_RESET } from '../constants/order.constant';
import Spinner from '../components/spinner/spinner.component';
import { ComponentToPrint } from './ComponentToPrint';
import Label from '../components/label';
import { getOrderDetailsAction } from '../actions/order.action';
import { fCurrency } from '../utils/formatNumber';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading } = orderDetails;

   const componentRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
   });

  useEffect(() => {
    dispatch(getOrderDetailsAction(id));
  }, [id, dispatch]);

  const processing = async () => {
    try {
      const res = await axios.put(`/api/order/update-order/${id}`, { status: 'Processing' });
      if (res.status) {
        dispatch({
          type: ORDER_DETAILS_RESET,
        });
        setIsLoading(true);
        dispatch(getOrderDetailsAction(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completed = async () => {
    try {
      const res = await axios.put(`/api/order/update-order/${id}`, { status: 'Completed' });
      if (res.status) {
        dispatch({
          type: ORDER_DETAILS_RESET,
        });
        setIsLoading(true);
        dispatch(getOrderDetailsAction(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = async () => {
    try {
      const res = await axios.put(`/api/order/update-order/${id}`, { status: 'Cancel' });
      if (res.status) {
        dispatch({
          type: ORDER_DETAILS_RESET,
        });
        setIsLoading(true);
        dispatch(getOrderDetailsAction(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setTimmer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 2500);

    return () => clearTimeout(setTimmer);
  }, [isLoading]);

   useEffect(() => {
     if (userInfo && !userInfo.user.isAdmin) {
       navigate('/login');
     }
   }, [userInfo, navigate]);

  return (
    <div>
      {loading || isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Order #{order?._id.slice(0, 7)}
              </Typography>
              <Typography variant="p" component="div" gutterBottom>
                {moment(order?.createdAt).format('DD MMMM YYYY, hh:mm A')}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography>Status</Typography>

                {order?.status === 'pending' ? (
                  <Label color="success">Pending</Label>
                ) : order?.status === 'Processing' ? (
                  <Label color="secondary">Proccessing</Label>
                ) : order?.status === 'Completed' ? (
                  <Label color="warning">Completed</Label>
                ) : (
                  <Label color="error">Cancel</Label>
                )}
              </Stack>
            </Box>
            <Box>
              <Button variant="outlined" color="secondary" sx={{ ml: 1 }} onClick={processing}>
                Processing
              </Button>
              <Button variant="outlined" color="warning" sx={{ ml: 1 }} onClick={completed}>
                Completed
              </Button>
              <Button variant="outlined" color="error" sx={{ ml: 1 }} onClick={cancel}>
                Cancel
              </Button>
              <Button variant="contained" color="warning" sx={{ ml: 1 }} onClick={handlePrint}>
                Print
              </Button>
            </Box>
          </Stack>
          <Grid spacing={3} container>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                  color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                  boxShadow: 4,
                  borderRadius: 4,
                }}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                    <TableBody>
                      {order?.orderItems?.map((orderItem) => (
                        <TableRow key={orderItem._id}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <img
                                src={orderItem.image}
                                alt={orderItem.name}
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  border: '3px solid grey',
                                  borderRadius: '1rem',
                                }}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {orderItem.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">x{orderItem.qty}</TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle2" noWrap>
                              {fCurrency(orderItem.price)}(GHC)
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle2" noWrap>
                              {orderItem.price * orderItem.qty}(GHC)
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="center">
                          {fCurrency(order?.orderItems
                            ?.reduce((acc, orderItem) => acc + orderItem.qty * orderItem.price, 0)
                            )}
                          (GHC)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>TaxPrice</TableCell>
                        <TableCell align="center">{order?.taxPrice}(GHC)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>DeliveryPrice</TableCell>
                        <TableCell align="center">
                          {order?.deliveryPrice === 0 ? <>Free</> : order?.deliveryPrice}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="center">{fCurrency(order?.totalPrice)}(GHC)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                  color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                  boxShadow: 4,
                  borderRadius: 4,
                }}
              >
                <Typography variant="h6" component="h6" sx={{ mb: '.5rem' }}>
                  Customer
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: '1rem' }}>
                  <Avatar alt={order?.user?.name} src={order?.user?.image} />
                  <Typography variant="body2" component="div" noWrap>
                    {order?.user?.username} <br />
                    {order?.user?.phonenumber} <br />
                    {order?.user?.email} <br />
                  </Typography>
                </Stack>

                <Divider />
                <Typography variant="h6" component="h6" sx={{ mb: '.5rem' }}>
                  Address
                </Typography>
                <Stack sx={{ mb: '1rem' }}>
                  <Box>
                    <Typography variant="body2" component="div" noWrap>
                      <span>City:</span> {order?.deliverAddress?.city} <br />
                      Location: {order?.deliverAddress?.location}
                    </Typography>
                  </Box>
                </Stack>

                <Divider />
                <Typography variant="h6" component="h6" sx={{ mb: '.5rem' }}>
                  Payment
                </Typography>
                <Stack>
                  <Box>
                    <Typography variant="body2" component="div" noWrap>
                      {order?.paymentMethod}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
      <Helmet>
        <title> Grocery Shop | Dashbord | Order </title>
      </Helmet>

      <div
        style={{ display: 'none', margin:"5rem" }} // This make ComponentToPrint show   only while printing
      >
        <ComponentToPrint
          ref={componentRef}
          _id={order?._id}
          deliveryPrice={order?.deliveryPrice}
          totalPrice={order?.totalPrice}
          taxPrice={order?.taxPrice}
          order={order}
          createdAt={order?.createdAt}
          city={order?.deliverAddress?.city}
          location={order?.deliverAddress?.location}
        />
      </div>
    </div>
  );
};

export default OrderDetailsPage;

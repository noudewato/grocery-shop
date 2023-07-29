import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import Spinner from '../components/spinner/spinner.component';
import Label from '../components/label';
import { getOrderDetailsAction } from '../actions/order.action';



const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsAction(id));
  }, [id, dispatch]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Order #{order._id.slice(0, 7)}
              </Typography>
              <Typography variant="p" component="div" gutterBottom>
                {moment(order.createdAt).format('DD MMMM YYYY, hh:mm A')}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography>Status</Typography>

                {order.status === 'pending' ? <Label color="success">pending</Label> : <Label color="error">No</Label>}
              </Stack>
            </Box>
            <Box>
              <Button variant="contained" color="success" sx={{ mr: '.5rem' }}>
                Approved
              </Button>
              <Button variant="contained" color="secondary" sx={{ mr: '.5rem' }}>
                Completed
              </Button>
              <Button variant="contained">Print</Button>
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
                      {order.orderItems.map((orderItem) => (
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
                              {orderItem.price}(GHC)
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
                          {order.orderItems
                            .reduce((acc, orderItem) => acc + orderItem.qty * orderItem.price, 0)
                            .toFixed(2)}
                          (GHC)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>TaxPrice</TableCell>
                        <TableCell align="center">{order.taxPrice}(GHC)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>DeliveryPrice</TableCell>
                        <TableCell align="center">
                          {order.deliveryPrice === 0 ? <>Free</> : order.deliveryPrice}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="center">{order.totalPrice}(GHC)</TableCell>
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
                      <span>City:</span> {order?.deliverAddress.city} <br />
                      Location: {order?.deliverAddress.location}
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
    </div>
  );
};

export default OrderDetailsPage;

import React, { useEffect } from 'react';
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
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Paper,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import { getOrderDetailsAction } from '../actions/order.action';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsAction(id));
  }, [dispatch, id]);
  return (
    <>
      <Helmet>
        <title> Grocery Shop | Dashbord | Order </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Order #{order._id.slice(0, 7)}
            </Typography>
            <Typography variant="p" component="div" gutterBottom>
              {moment(order.createdAt).format('YYYY')}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained">Print</Button>
          </Box>
        </Stack>
        <Grid
          spacing={2}
          sx={{
            p: 5,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
            boxShadow: 1,
            borderRadius: 4,
          }}
        >
          <Grid item xs={12} sm={12} md={8} lg={8}>
            {' '}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
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
                      <TableCell align="right">x{orderItem.qty}</TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" noWrap>
                          {orderItem.price}(GHC)
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{order.totalPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">{order.deliverPrice}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      ;
    </>
  );
};

export default OrderDetailsPage;

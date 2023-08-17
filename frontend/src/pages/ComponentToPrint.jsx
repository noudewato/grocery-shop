import React from 'react';
import { TableContainer, TableCell, TableBody, TableRow, Typography, Stack, Table, Paper, Box, TableHead } from '@mui/material';
import moment from "moment"

export class ComponentToPrint extends React.PureComponent {

  render() {
      return (
        <div style={{ margin: '5rem auto', width: '600px', height: 'auto', padding: '1rem', border: '0.5px solid black' }}>
          <Stack direction="column" sx={{ textAlign: 'center', m: '1rem ' }}>
            <Typography variant="h6" noWrap>
              Grocery Shop
            </Typography>
            <Typography variant="title" noWrap>
              0550601470/050846435
            </Typography>
            <Typography variant="title" noWrap>
              Thanks to buy From us
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="column" spacing={1} sx={{ my: '1rem' }}>
              <Typography>Name: {this.props.order?.user?.username} </Typography>
              <Typography>Phone: {this.props.order?.user?.phonenumber}</Typography>
              <Typography>Email: {this.props.order?.user?.email}</Typography>
            </Stack>

            <Stack direction="column" spacing={1} sx={{ my: '1rem' }}>
              <Typography>City: {this.props.city} </Typography>
              <Typography>Location: {this.props.location}</Typography>
              <Typography>Date: {moment(this.props.order?.createdAt).format('DD MMM YYYY, hh:mm A')}</Typography>
            </Stack>
          </Box>
          <TableContainer component={Paper} sx={{ mt: 5, minWidth: 200 }}>
            <Table sx={{ minWidth: 200 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="center">U.Price</TableCell>
                  <TableCell align="center">T.Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.order?.orderItems?.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
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
                    {this.props.order?.orderItems
                      ?.reduce((acc, orderItem) => acc + orderItem.qty * orderItem.price, 0)
                      .toFixed(2)}
                    (GHC)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>TaxPrice</TableCell>
                  <TableCell align="center">{this.props.taxPrice}(GHC)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>DeliveryPrice</TableCell>
                  <TableCell align="center">
                    {this.props.deliveryPrice === 0 ? <>Free</> : this.props.deliveryPrice}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="center">{this.props.totalPrice}(GHC)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
  }
}

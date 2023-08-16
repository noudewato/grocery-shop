import React from 'react';
import { TableContainer, TableCell, TableBody, TableRow, Typography, Stack, Table, Paper } from '@mui/material';

export class ComponentToPrint extends React.PureComponent {

  render() {
      return (
        <>
          {/* <TableContainer component={Paper} sx={{ mt: 5, minWidth: 200 }}>
            <Table sx={{ minWidth: 200 }} aria-label="spanning table">
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
          </TableContainer> */}
              hi
        </>
      );
  }
}

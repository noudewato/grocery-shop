import { Helmet } from 'react-helmet-async';
import { grey } from '@mui/material/colors';
import { filter, slice } from 'lodash';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableHead,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Collapse,
  Box,
  Grid,
} from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

import Spinner from '../components/spinner/spinner.component';

import { orderListAction, orderTotalAmountAction, orderTotalDiverseAmountAction } from '../actions/order.action';

// components
import Label from '../components/label';
import Iconify from '../components/form-input/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '', label: '', alignRight: false },
  { id: 'order', label: 'order', alignRight: false },
  { id: 'customer', label: 'Customer', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'items', label: 'Items', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },

  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

   const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading } = orderList;

  const orderDiversAmount = useSelector((state) => state.orderDiversAmount);
  const { diversAmount, loading: loadingDivers } = orderDiversAmount;

  const orderTotalAmount = useSelector((state) => state.orderTotalAmount);
  const { amount, loading: loadingAmount } = orderTotalAmount;

  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(orderTotalAmountAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(orderTotalDiverseAmountAction());
  }, [dispatch]);

  const [openm, setOpenm] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleCloseMenu = () => {
    setOpenm(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const filteredUsers = applySortFilter(orders, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [open, setOpen] = useState(false);
  const [opentable, setOpenTable] = useState(false);

  const [placeholder, setPlaceholder] = useState('Search by status...');

  useEffect(() => {
    if (userInfo && !userInfo.user.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     const setTimmer = setTimeout(() => {
       if (isLoading) {
         setIsLoading(false);
       }
     }, 5000);

     return () => clearTimeout(setTimmer);
   }, [isLoading]);


  return (
    <>
      <Helmet>
        <title> Grocery Shop | Dashbord | Order </title>
      </Helmet>
      {isLoading || loading ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h4" gutterBottom>
              Order
            </Typography>
          </Stack>

          {loadingDivers || loadingAmount ? (
            <>...</>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={2.4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ py: 3, px: 2, borderRadius: 2, backgroundColor: 'white', my: 3, boxShadow: 4 }}
                >
                  <DataUsageIcon sx={{ fontSize: '50px', color: 'greenyellow' }} />

                  <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                    <Typography variant="body1" noWrap sx={{ textTransform: 'capitalize' }}>
                      Total
                    </Typography>
                    {amount?.amount[0]?.count} <br />
                    <Typography variant="h6">
                      {(amount?.amount[0]?.totalAmount).toFixed(2)} <br />
                    </Typography>
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} md={2.4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ py: 3, px: 2, borderRadius: 2, backgroundColor: 'white', my: 3, boxShadow: 4 }}
                >
                  <LoopIcon sx={{ fontSize: '50px', color: 'purple' }} />
                  <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                    <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                      Pending
                    </Typography>
                    {diversAmount?.diversAmount[3]?.count} <br />
                    <Typography variant="h6">
                      {(diversAmount?.diversAmount[3]?.totalAmount).toFixed(2)} <br />
                    </Typography>
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} md={2.4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ py: 3, px: 2, borderRadius: 2, backgroundColor: 'white', my: 3, boxShadow: 4 }}
                >
                  <LocalShippingIcon sx={{ fontSize: '50px', color: 'tomato' }} />
                  <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                    <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                      Processing
                    </Typography>
                    {diversAmount?.diversAmount[2]?.count} <br />
                    <Typography variant="h6">
                      {(diversAmount?.diversAmount[2]?.totalAmount).toFixed(2)} <br />
                    </Typography>
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} md={2.4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ py: 3, px: 2, borderRadius: 2, backgroundColor: 'white', my: 3, boxShadow: 4 }}
                >
                  <DoneIcon sx={{ fontSize: '50px', color: 'green' }} />
                  <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                    <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                      Completed
                    </Typography>
                    {diversAmount?.diversAmount[1]?.count} <br />
                    <Typography variant="h6">
                      {(diversAmount?.diversAmount[1]?.totalAmount).toFixed(2)} <br />
                    </Typography>
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} md={2.4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ py: 3, px: 2, borderRadius: 2, backgroundColor: 'white', my: 3, boxShadow: 4 }}
                >
                  <CancelIcon sx={{ fontSize: '50px', color: 'red' }} />
                  <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                    <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
                      Cancel
                    </Typography>
                    {diversAmount?.diversAmount[0]?.count} <br />
                    <Typography variant="h6">
                      {(diversAmount?.diversAmount[0]?.totalAmount).toFixed(2)} <br />
                    </Typography>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          )}

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} placeholder={placeholder}/>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 1250 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={orders.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                      placeholder
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        _id,
                        createdAt,
                        totalPrice,
                        orderItems,
                        user,
                        status /* role, status, company, isVerified */,
                      } = row;
                      // const selectedUser = selected.indexOf(name) !== -1;

                      return (
                        <>
                          <TableRow hover key={_id} tabIndex={-1}>
                            {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell> */}
                          </TableRow>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setOpenTable(opentable === row ? -1 : row)}
                            >
                              {opentable === row ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell padding="2px">{_id.slice(0, 7)}</TableCell>
                          <TableCell component="th" scope="row" padding="2px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={user?.username} src={user?.image} />
                              <Typography variant="subtitle2" noWrap>
                                {user?.username} <br />
                                {user?.email} <br />
                                {/* <Typography fontSize="10px">{user?.phonenumber}</Typography> */}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            {moment(createdAt).format(`Do MMMM YYYY, `)}
                            <br />
                            {moment(createdAt).format(`h:mm A`)}
                          </TableCell>
                          {/* <TableCell align="left">
                            <Typography></Typography>
                            {totalPrice}
                          </TableCell> */}

                          <TableCell align="left">{orderItems.reduce((acc, item) => acc + item.qty, 0)}</TableCell>
                          <TableCell align="left">₵{totalPrice}</TableCell>
                          <TableCell align="left">
                            {status === 'pending' ? (
                              <Label color="success">Pending</Label>
                            ) : status === 'Processing' ? (
                              <Label color="secondary">Processing</Label>
                            ) : status === 'Completed' ? (
                              <Label color="warning">Completed</Label>
                            ) : (
                              <Label color="error">Cancel</Label>
                            )}
                            {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                          </TableCell>

                          <TableCell style={{ display: 'flex' }}>
                            <Button style={{ marginRight: '.5rem' }} variant="outlined" color="primary">
                              <Link
                                style={{ color: 'blue', listStyle: 'none', textDecoration: 'none' }}
                                to={`/dashboard/order-detail/${_id}`}
                              >
                                View
                              </Link>
                            </Button>
                          </TableCell>

                          <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                              <Collapse in={opentable === row} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                  <Typography variant="h4" gutterBottom component="div">
                                    OrderItems
                                  </Typography>
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Total</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {row.orderItems.map((item) => (
                                        <TableRow key={item.name}>
                                          <TableCell component="th" scope="row">
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              style={{
                                                width: '80px',
                                                height: '80px',
                                                border: '3px solid grey',
                                                borderRadius: '1rem',
                                              }}
                                            />
                                          </TableCell>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell align="left">{item.price}</TableCell>
                                          <TableCell align="left">{item.qty}</TableCell>
                                          <TableCell align="left">{item.qty * item.price}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[10, 25]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      )}

      <Popover
        openm={Boolean(openm)}
        anchorEl={openm}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default OrderPage;

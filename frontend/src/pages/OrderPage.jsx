import { Helmet } from 'react-helmet-async';
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
  Checkbox,
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
  CardMedia,
  CardActionArea,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Link } from 'react-router-dom';
import moment from 'moment';

import Spinner from '../components/spinner/spinner.component';

import { orderListAction, orderDeleteAction } from '../actions/order.action';

// components
import Label from '../components/label';
import Iconify from '../components/form-input/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import DialogBox from '../components/dialog-box/dialog.component';

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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const OrderPage = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading } = orderList;

  //   const productDelete = useSelector((state) => state.productDelete);
  //   const { success, loading: deleteLoading } = productDelete;
  //   console.log(products);

  //   useEffect(() => {
  //     if (success) {
  //       toast.success('Pruduct Deleted Successfully');
  //       dispatch({
  //         type: PRODUCT_DELETE_RESET,
  //       });
  //     }
  //   }, [success, dispatch]);

  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);

  const shortText = (n) => {
    const shortedText = slice(0, n);

    return shortedText;
  };

  const [openm, setOpenm] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenMenu = (event) => {
    setOpenm(event.currentTarget);
  };

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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
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
  const [deleteData, setDeleteData] = useState({});
  console.log(open);

  const handleDialogClickOpen = (row) => {
    setOpen(true);
    setDeleteData(row);
  };

  return (
    <>
      <Helmet>
        <title> Grocery Shop | Dashbord | Order </title>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Order
            </Typography>
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                              <Label color="success">pending</Label>
                            ) : (
                              <Label color="error">No</Label>
                            )}
                            {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                          </TableCell>

                          <TableCell style={{ display: 'flex' }}>
                            <Button style={{ marginRight: '.5rem' }} variant="outlined" color="success">
                              <Link
                                style={{ color: 'green', listStyle: 'none', textDecoration: 'none' }}
                                to={`/dashboard/order-detail/${_id}`}
                              >
                                Edit
                              </Link>
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => handleDialogClickOpen(row)}>
                              Delete
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
              rowsPerPageOptions={[5, 10, 25]}
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

      <DialogBox
        open={open}
        title={deleteData?.name}
        deleteFunction={() => {
          // dispatch(productDeleteAction(deleteData?._id));
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default OrderPage;

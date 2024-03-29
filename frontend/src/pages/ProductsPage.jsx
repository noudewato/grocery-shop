import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

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
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { PRODUCT_DELETE_RESET } from '../constants/product.constant';

import Spinner from '../components/spinner/spinner.component';

import { productListAction, productDeleteAction } from '../actions/product.action';

// components
import Label from '../components/label';
import Iconify from '../components/form-input/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import DialogBox from '../components/dialog-box/dialog.component';

// ----------------------------------------------------------------------

import { fCurrency } from '../utils/formatNumber';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'active', label: 'Active', alignRight: false },
  { id: 'createdBy', label: 'createdBy', alignRight: false },
  { id: 'CreatedAt', label: 'CreatedAt', alignRight: false },
  { id: 'updatedAt', label: 'updatedAt', alignRight: false },
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

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;
  

  useEffect(() => {
    if (success) {
      toast.success('product deleted successfully');
      dispatch({
        type: PRODUCT_DELETE_RESET,
      });
      dispatch(productListAction());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (success) {
      toast.success('Pruduct Deleted Successfully');
      dispatch({
        type: PRODUCT_DELETE_RESET,
      });
    }
  }, [success, dispatch]);

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

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
      const newSelecteds = products.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredUsers = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [placeholder, setPlaceholder] = useState('Search product...')
  console.log(open);

  const handleDialogClickOpen = (row) => {
    setOpen(true);
    setDeleteData(row);
  };

  useEffect(() => {
    if (userInfo && !userInfo.user.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Helmet>
        <title> Grocery Shop | Dashbord | Product </title>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Product
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              <Link style={{ color: 'white', listStyle: 'none', textDecoration: 'none' }} to={'/dashboard/new-product'}>
                New Product
              </Link>
            </Button>
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} placeholder={placeholder}/>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 1500 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={products.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        _id,
                        name,
                        category,
                        price,
                        image,
                        createdAt,
                        updatedAt,
                        status,
                        user,
                        isActive /* role, status, company, isVerified */,
                      } = row;
                      const selectedUser = selected.indexOf(name) !== -1;

                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell> */}
                          <TableCell component="th" scope="row" padding="2px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{category}</TableCell>
                          <TableCell align="left">
                            <span style={{ color: 'tomato' }}>GHC</span>
                            {fCurrency(price)}
                          </TableCell>
                          <TableCell align="left">
                            {isActive ? <Label color="success">Yes</Label> : <Label color="error">No</Label>}
                            {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                          </TableCell>
                          <TableCell align="left">{user?.username}</TableCell>

                          <TableCell align="left">
                            {moment(createdAt).format(`Do MMMM YYYY`)}
                            <br />
                            {moment(createdAt).format(`h:mm A`)}
                          </TableCell>
                          <TableCell align="left">
                            {moment(updatedAt).format(`Do MMMM YYYY `)}
                            <br />
                            {moment(updatedAt).format(`h:mm A`)}
                          </TableCell>
                          <TableCell align="left">
                            {status === 'New' ? (
                              <Label color="error">New</Label>
                            ) : status === 'On Sale' ? (
                              <Label color="success">On Sale</Label>
                            ) : status === 'Hot' ? (
                              <Label color="warning">Hot</Label>
                            ) : (
                              <Label color="secondary">No</Label>
                            )}
                            {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                          </TableCell>
                          <TableCell style={{ display: 'flex' }}>
                            <Button style={{ marginRight: '.5rem' }} variant="outlined" color="success">
                              <Link
                                style={{ color: 'green', listStyle: 'none', textDecoration: 'none' }}
                                to={`/dashboard/edit-product/${_id}`}
                              >
                                Edit
                              </Link>
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => handleDialogClickOpen(row)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
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
              count={products.length}
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
          dispatch(productDeleteAction(deleteData?._id));
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ProductsPage;

import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

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

import DialogBox from '../components/dialog-box/dialog.component';

import { userDeleteAction, userListAction } from '../actions/auth.action';

// components
import Label from '../components/label';
import Iconify from '../components/form-input/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user', label: 'user', alignRight: false },
  { id: 'contact', label: 'contact', alignRight: false },
  { id: 'createdAt', label: 'CreatedAt', alignRight: false },
  { id: 'updatedAt', label: 'updatedAt', alignRight: false },
  { id: 'isActive?', label: 'isActive?', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
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
    return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function UserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { customer } = userList;

  useEffect(() => {
    dispatch(userListAction());
  }, [dispatch]);

  const [openm, setOpenm] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('username');

  const [filterusername, setFilterusername] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      const newSelecteds = customer.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, username) => {
    const selectedIndex = selected.indexOf(username);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
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

  const handleFilterByusername = (event) => {
    setPage(0);
    setFilterusername(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customer.length) : 0;

  const filteredcustomer = applySortFilter(customer, getComparator(order, orderBy), filterusername);

  const isNotFound = !filteredcustomer.length && !!filterusername;

  const [open, setOpen] = useState(false);
  const [selectUser, setSelectUser] = useState({});

  return (
    <>
      <Helmet>
        <title> Grocery Shop | Dashbord | User </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            customer
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterusername={filterusername} onFilterusername={handleFilterByusername} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={customer.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredcustomer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, userusername, email, image, phonenumber, createdAt, updatedAt, isActive } = row;
                    // const selectedUser = selected.indexOf(username) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox isActive={selectedUser} onChange={(event) => handleClick(event, username)} />
                        </TableCell> */}
                        <TableCell component="th" scope="row" padding="2px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={userusername} src={image} />
                            <Typography variant="subtitle2" noWrap>
                              {userusername}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="subtitle2" noWrap>
                            {phonenumber}
                            <br />
                            {email}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          {moment(createdAt).format(`Do MMMM YYYY, `)} <br /> {moment(createdAt).format(`h:mm:ss a`)}
                        </TableCell>
                        <TableCell align="left">
                          {moment(updatedAt).format(`Do MMMM YYYY, `)} <br /> {moment(updatedAt).format(`h:mm:ss a`)}
                        </TableCell>
                        <TableCell align="left">
                          {isActive ? <Label color="success">Yes</Label> : <Label color="error">No</Label>}
                        </TableCell>

                        <TableCell style={{ display: 'flex' }}>
                          <Button style={{ marginRight: '.5rem' }} variant="outlined" color="success">
                            <Link
                              style={{ color: 'green', listStyle: 'none', textDecoration: 'none' }}
                              to={`/dashboard/edit-category/${_id}`}
                            >
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setOpen(true);
                              setSelectUser(row);
                            }}
                          >
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
                            <strong>&quot;{filterusername}&quot;</strong>.
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
            count={customer.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(openm)}
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
        title={selectUser?.userusername}
        deleteFunction={() => {
          dispatch(userDeleteAction(selectUser?._id));
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// component
import Iconify from '../../../components/form-input/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function ProductCartWidget() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const [countCartItem, setCountCartItem] = useState(0);

    useEffect(() => {
      const count = cartItems.reduce((acc, item) => acc + item.qty, 0);
      setCountCartItem(count);
    }, [dispatch, cartItems]);
  return (
    <StyledRoot>
      <Badge showZero badgeContent={countCartItem} color="error" max={99}>
        <Link to="/GroceryShop/checkout" style={{color:"black"}}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Link>
      </Badge>
    </StyledRoot>
  );
}

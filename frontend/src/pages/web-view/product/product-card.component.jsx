import PropTypes from 'prop-types';
// @mui
import React from 'react';
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../actions/cart.action';
// utils
// import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------
ProductCard.propTypes = {
  product: PropTypes.object,
};
export default function ProductCard({ product }) {
  const { name, image, isActive, price } = product;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(product));
    toast.success(`${name} added to cart`);
  };
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {isActive ? (
          <Label
            variant="filled"
            color="info"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            In Stock
          </Label>
        ) : (
          <Label
            variant="filled"
            color="error"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Out Stock
          </Label>
        )}
        <StyledProductImg alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 1 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Button variant="outlined" color="success" onClick={handleClick} disabled={isActive === false}>
            +
          </Button>
          <Typography variant="subtitle1">
            {/* <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {price && fCurrency(price)}
            </Typography> */}
            &nbsp;
            {price}(GHS)
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

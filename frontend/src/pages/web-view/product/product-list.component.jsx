import React, { useEffect, useState } from 'react';
import { Grid }  from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from '../../../actions/product.action';

import ProductCard from './product-card.component';

// ----------------------------------------------------------------------

export default function ProductList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  console.log(products);
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <>
      <h4 style={{ textAlign: 'center', margin:'1rem 0 2rem 0' }}>Our Products</h4>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}


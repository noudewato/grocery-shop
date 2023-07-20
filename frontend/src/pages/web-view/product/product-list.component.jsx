import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Card, ListItem, ListItemText, ListItemButton, Stack, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from '../../../actions/product.action';
import { categoryListAction } from '../../../actions/category.action';
import ProductCard from './product-card.component';


// ----------------------------------------------------------------------
const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default function ProductList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;


  console.log(products);
  useEffect(() => {
    dispatch(productListAction());
    dispatch(categoryListAction())
  }, [dispatch]);

  const imagesFromWeb = [
    {
      name: 'image1',
      image: 'https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbundle%2F18.png&w=1200&q=75',
    },
    {
      name: 'image2',
      image: 'https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbundle%2F19.png&w=1200&q=75',
    },
    {
      name: 'image3',
      image: 'https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbundle%2F17.png&w=1200&q=75',
    },
  ];

  return (
    <>
      <h4 style={{ textAlign: 'center', margin: '1rem 0 2rem 0' }}>Best seller grocery near you</h4>

      <p style={{ textAlign: 'center', margin: '3rem' }}>
        We provide best quality & fresh grocery items near your location
      </p>

      <Grid container>
        <Grid xs={12} sm={12} md={2} item>
          {categories.map((category) => (
            <Grid key={category.id} item>
              <ListItem>
                <ListItemButton>
                  <ListItemText secondary={category.name} />
                </ListItemButton>
              </ListItem>
            </Grid>
          ))}
        </Grid>
        <Grid xs={12} sm={12} md={10} container spacing={2}>
          {products.slice(0, 20).map((product) => (
            <Grid key={product.id} item xs={6} sm={6} md={2.4}>
              <ProductCard product={product} />
            </Grid>
          ))}

          <Stack spacing={2} sx={{margin:'auto', textAlign:'center'}}>
            <Pagination count={products.lenght} color="primary" hidePrevButton hideNextButton />
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', margin: '2rem auto' }}>
        <Button variant="outlined" sx={{ textAlign: 'center', margin: '2rem auto' }}>
          Load More
        </Button>
      </Box>

      <Box>
        <Grid container spacing={3}>
          {imagesFromWeb.map((imageView, i) => (
            <Grid item xs={12} sm={12} md={4}>
              <Card>
                <StyledProductImg key={i} alt={imageView.name} src={imageView.image} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

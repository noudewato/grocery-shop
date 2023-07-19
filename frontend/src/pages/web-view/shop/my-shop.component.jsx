import { Container } from '@mui/material';
import React from 'react';
import ProductList from '../product/product-list.component';
import ProductCartWidget from '../product/product-card-widgets.component';
import Header from '../header/header.component';

const Home = () => (
  <Container>
    <Header />
    <ProductList />
    <ProductCartWidget />
  </Container>
);

export default Home;

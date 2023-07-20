import { Container } from '@mui/material';
import React from 'react';
import HomeSection from './carousel/home-section';
import ProductList from './product/product-list.component';
import ProductCartWidget from './product/product-card-widgets.component';
import Header from './header/header.component';
import Category from './category/category-list.component';
import Footer from './footer/footer';

const Home = () => (
  <Container>
    <Header />
    <HomeSection />
    <Category />
    <ProductList />
    <ProductCartWidget />
    <Footer/>
  </Container>
);

export default Home;

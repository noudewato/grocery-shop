import React , {useEffect} from "react"
import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Header from "./header/header.component"
import { categoryDetailsAction } from "../../actions/category.action"
import ProductCard from "./product/product-card.component";
import ProductCartWidget from './product/product-card-widgets.component';


const SimilarProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const categoryDetails = useSelector((state) => state.categoryDetails);
    const { category } = categoryDetails;
    useEffect(() => {
        dispatch(categoryDetailsAction(id))
    }, [dispatch, id]);

console.log(category)
    return (
        <div>
            <Header />
            <Container sx={{mt:13}}>
              <ProductCartWidget />
                <h2>{category?.name}</h2>
                <Box sx={{padding:"10px", display:"flex"}}>
                  <Typography variant="h6" sx={{fontWeight:600, textDecoration:"italic"}}>Items found </Typography>
                  <Typography variant="h6" sx={{fontWeight:300, color:"gray", paddingLeft:"5px"}}>({category?.products?.length}) </Typography>
                </Box>
                <Grid sx={{mt:5}} xs={12} sm={12} md={12} container spacing={2}>
          {category?.products &&
            category?.products?.map((product) => (
              <Grid key={product.id} item xs={6} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
            </Container>
        </div>)
}

export default SimilarProduct
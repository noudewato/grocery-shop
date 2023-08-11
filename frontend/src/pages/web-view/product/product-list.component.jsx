import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Card,
  ListItem,
  ListItemText,
  Stack,
  Pagination,
  TextField,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { productListAction } from '../../../actions/product.action';
import { categoryListAction } from '../../../actions/category.action';
import { productFilterAction } from '../../../actions/filter.action';
import ProductCard from './product-card.component';

// ----------------------------------------------------------------------
const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default function ProductList() {
  const [text, setText] = useState('');
  console.log(text);
  const [categoryIds, setCategoryIds] = useState([]);
  const dispatch = useDispatch();
  const keyword = useParams();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  console.log(products);
  useEffect(() => {
    dispatch(productListAction());
    dispatch(categoryListAction());
  }, [dispatch]);

  const handleSearch = (e) => {
    resetState();
    setText(e.target.value);

    dispatch(productFilterAction({ type: 'text', query: e.target.value }));
  };

  const resetState = () => {
    setText('');
    setCategoryIds([]);
  };

  const handleCategory = (e) => {
    resetState();

    const currentCategoryChecked = e.target.value;
    const allCategoriesChecked = [...categoryIds];
    const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

    let updatedCategoryIds;
    if (indexFound === -1) {
      // add
      updatedCategoryIds = [...categoryIds, currentCategoryChecked];
      setCategoryIds(updatedCategoryIds);
    } else {
      // remove
      updatedCategoryIds = [...categoryIds];
      updatedCategoryIds.splice(indexFound, 1);
      setCategoryIds(updatedCategoryIds);
    }

    dispatch(productFilterAction({ type: 'category', query: updatedCategoryIds }));
  };

  const [currentItems, setCurrentItems] = useState(products);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

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

  const [page, setPage] = useState(1)
  const [itemperpage, setItemperpage] = useState('')

  return (
    <>
      <h4 style={{ textAlign: 'center', margin: '1rem 0 2rem 0' }}>Best seller grocery near you</h4>

      <p style={{ textAlign: 'center', margin: '3rem' }}>
        We provide best quality & fresh grocery items near your location
      </p>

      <Grid container>
        <Grid xs={12} sm={12} md={2} item>
          <Box component="form" sx={{ width: { sx: '100%', lg: '180px' } }} noValidate autoComplete="off">
            <TextField
              id="search"
              name="search"
              label="search"
              color="secondary"
              fullWidth
              variant="outlined"
              value={text}
              onChange={handleSearch}
            />
            {/* <Button type='submit' >.</Button> */}
          </Box>
          {categories.map((category) => (
            <Grid key={category._id} item>
              <ListItem>
                <Checkbox value={category._id} checked={categoryIds.includes(category._id)} onChange={handleCategory} />
                <ListItemText secondary={category.name} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
        <Grid xs={12} sm={12} md={10} container spacing={2}>
          {currentItems &&
            currentItems.map((product) => (
              <Grid key={product.id} item xs={6} sm={6} md={2.4}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        <Stack spacing={2} sx={{ margin: 'auto', textAlign: 'center' }}>
          <div className="text-center d-flex justify-content-center m-4">
            <ReactPaginate
              breakLabel="..."
              nextLabel=""
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel={null}
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="activePage"
            />
          </div>
        </Stack>
      </Grid>

      <Box sx={{my:'2rem'}}>
        <Grid container spacing={3}>
          {imagesFromWeb.map((imageView, i) => (
            <Grid item xs={12} key={i} sm={12} md={4}>
              <Card>
                <StyledProductImg alt={imageView.name} src={imageView.image} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

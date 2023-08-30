import React, { useEffect, useState } from 'react';
import './pagination.css'
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
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SearchIcon from '@mui/icons-material/Search';
import { productActiveListAction } from '../../../actions/product.action';
import { categoryProductListAction} from '../../../actions/category.action';
import ProductCard from './product-card.component';

// ----------------------------------------------------------------------
const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default function ProductList() {
  // const [text, setText] = useState('');
  // console.log(text);
  // const [categoryIds, setCategoryIds] = useState([]);
  const dispatch = useDispatch();
  // const productList = useSelector((state) => state.productList);
  // const { products } = productList;

  const productsActiveList = useSelector((state) => state.productsActiveList);
  const { myProducts } = productsActiveList;
  console.log(myProducts);

  const categoryProductList = useSelector((state) => state.categoryProductList);
  const { categories } = categoryProductList;

  useEffect(() => {
    dispatch(productActiveListAction());
  }, [dispatch]);

   useEffect(() => {
     dispatch(categoryProductListAction());
   }, [dispatch]);



   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [category, setCategory] = useState([]);

  const handleCategory = (e) => {
    resetState();

    const currentCategoryChecked = e.target.value;
    const allCategoriesChecked = [...category];
    const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

    let updatedCategory;
    if (indexFound === -1) {
      // add
      updatedCategory = [...category, currentCategoryChecked];
      setCategory(updatedCategory);
    } else {
      // remove
      updatedCategory = [...category];
      updatedCategory.splice(indexFound, 1);
      setCategory(updatedCategory);
    }

    dispatch(productActiveListAction(`&category=${updatedCategory}`));
  };

  const resetState = () => {
    setCategory([]);
  };


  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(productActiveListAction(`${name}${category}`))
  };

  const [currentItems, setCurrentItems] = useState(myProducts);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(myProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(myProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, myProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % myProducts.length;
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon onClick={handleSearch} sx={{ cursor: 'pointer' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {categories && categories.map((c) => (
            <Grid key={c._id} item>
              <ListItem>
                <Checkbox value={c.name} onChange={handleCategory} checked={category.includes(c.name)} />
                <ListItemText secondary={c.name} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
        <Grid xs={12} sm={12} md={10} container spacing={2}>
          {currentItems &&
            currentItems.map((product) => (
              <Grid key={product.id} item xs={6} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        <Stack spacing={2} sx={{ margin: 'auto', textAlign: 'center' }}>
          <div className="text-center d-flex justify-content-center m-4">
            <ReactPaginate
              breakLabel="..."
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel={'prev'}
              nextLabel={'next'}
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            />
          </div>
        </Stack>
      </Grid>

      <Box sx={{ my: '2rem' }}>
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

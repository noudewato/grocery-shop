import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
  Avatar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/spinner/spinner.component';
import { PRODUCT_UPDATE_RESET } from '../constants/product.constant';
import { productDetailsAction, productUpdateAction } from '../actions/product.action';
import { categoryListAction } from '../actions/category.action';
import FormInput from '../components/form-input/form-input.component';

const EditProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate, product: productUpdated } = productUpdate;

  const statusContent = ['New', 'On Sale', 'Hot'];

  const [name, setName] = useState('');
  const [nameError, setnameError] = useState('');
  const [category, setCategory] = useState('');
  const [categoryError, setcategoryError] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setpriceError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setdescriptionError] = useState('');
  const [status, setStatus] = useState('');
  const [statusError, setstatusError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState('');
  const [imageError, setimageError] = useState('');

  useEffect(() => {
    dispatch(productDetailsAction(id));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, id, error]);

  useEffect(() => {
    dispatch(categoryListAction());
  }, [dispatch, id]);

  useEffect(() => {
    if (productUpdated &&  productUpdated.success) {
      toast.success('updated successfully');
      navigate('/dashboard/products');
      setName('');
      setCategory('');
      setPrice('');
      setImage('');
      setDescription('');
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
    }

      if (error) {
        toast.error(errorUpdate);
        dispatch({
          type: PRODUCT_UPDATE_RESET,
        });
      }
  }, [successUpdate, error, dispatch, navigate, errorUpdate, productUpdated]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setStatus(product.status);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.description);
      setIsActive(product.isActive);
    }
  }, [product]);

  useEffect(() => {
    if (userInfo && !userInfo.user.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setTimmer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 2500);

    return () => clearTimeout(setTimmer);
  }, [isLoading]);

  const handleValidation = () => {
    let formIsValid = true;
    if (!name) {
      formIsValid = false;
      setnameError('product name is required');
    }
    if (!category) {
      formIsValid = false;
      setcategoryError('please select category');
    }
    if (!price) {
      formIsValid = false;
      setpriceError('product price is required');
    }
    // else if (!price.match('^[0-9]+$')) {
    //    formIsValid = false;
    //    setpriceError('product price must contain only number');
    // }
    if (!image) {
      formIsValid = false;
      setimageError('product image is required');
    }
    if (!status) {
      formIsValid = false;
      setstatusError('please select status');
    }
    if (!description) {
      formIsValid = false;
      setdescriptionError('description is required');
    }

    return formIsValid;
  };

  const handleEditProductClick = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      dispatch(
        productUpdateAction({
          _id: id,
          name,
          price,
          image,
          category,
          description,
          isActive,
          status,
        })
      );
    }
  };

  const uploadingHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload/upload-images', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <div className="new-pr">
      <Helmet>
        <title>Dashboard | Edit Product</title>
      </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Edit Product
            </Typography>
          </Stack>

          <Box
            component="form"
            sx={{
              p: 5,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
              color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
              boxShadow: 1,
              borderRadius: 4,
            }}
          >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    margin: 'auto',
                    position: 'relative',
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={image}
                    sx={{
                      width: 300,
                      height: 300,
                      margin: 'auto',
                      position: 'relative',
                    }}
                  />
                  <label
                    htmlFor="image"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto',
                      textAlign: 'center',
                      position: 'absolute',
                      backgroundColor: 'rgba(0, 0, 0, 0.0)',
                      borderRadius: '50%',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  >
                    <input
                      style={{ display: 'none' }}
                      id="image"
                      name="image"
                      onChange={uploadingHandler}
                      type="file"
                    />

                    <Button color="secondary" variant="contained" component="span">
                      {uploading && <>.......</>} Upload Image
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={3}>
                  <FormInput
                    text="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    name="name"
                    label="Product Name"
                    error={nameError}
                    helperText={nameError}
                  />
                  <FormInput
                    text="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    select
                    fullWidth
                    name="category"
                    label="Product Category"
                    error={categoryError}
                    helperText={categoryError}
                  >
                    {categories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </FormInput>

                  <FormInput
                    text="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    select
                    fullWidth
                    name="status"
                    label="Product Status"
                    error={statusError}
                    helperText={statusError}
                  >
                    {statusContent.map((s, index) => (
                      <MenuItem key={index} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </FormInput>

                  <FormInput
                    text="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    name="price"
                    label="Product Price"
                    error={priceError}
                    helperText={priceError}
                  />

                  <FormInput
                    text="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    fullWidth
                    name="image"
                    label="Product Image"
                    error={imageError}
                    helperText={imageError}
                  />

                  <FormControlLabel
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    label="isActive?"
                    control={<Switch />}
                  />

                  <FormInput
                    text="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    name="description"
                    label="Content"
                    rows={4}
                    multiline
                    error={descriptionError}
                    helperText={descriptionError}
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleEditProductClick}
                  >
                    {loadingUpdate && <>...</>} Edit Product
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default EditProductPage;

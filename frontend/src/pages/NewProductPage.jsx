import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Stack,
  Typography,
  Switch,
  MenuItem,
  Button,
  Grid,
  Avatar,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormInput from '../components/form-input/form-input.component';
import { categoryListAction } from '../actions/category.action';
import { productCreateAction } from '../actions/product.action';
import Spinner from '../components/spinner/spinner.component';
import { PRODUCT_CREATE_RESET } from '../constants/product.constant';

const NewProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productCreate = useSelector((state) => state.productCreate);
  const { success, product, error, loading } = productCreate;

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
  console.log(isActive);

  const handleCreateProductClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(
        productCreateAction({
          name,
          price,
          image,
          category,
          description,
          status,
          isActive,
        })
      );
    }

    // const data = new FormData();
    // data.append('file', file);
    // data.append('upload_preset', 'uploads');

    // fetch('https://api.cloudinary.com/v1_1/dz88wbaks/image/upload', {
    //   method: 'post',
    //   body: data,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // try {
    //   const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dz88wbaks/image/upload", data);
    //   console.log(uploadRes.data, "hi");
    // } catch (error) {
    //   console.log(error);
    // }
    // dispatch(productCreateAction(name, category, price, description, file, isActive));
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setTimmer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 2500);

    return () => clearTimeout(setTimmer);
  }, []);

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
    if (!description) {
      formIsValid = false;
      setpriceError('product description is required');
    }
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

  useEffect(() => {
    dispatch(categoryListAction());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(`${product.name} is created successfully`);
      setName('');
      setDescription('');
      setImage('');
      setCategory('');
      setPrice('');
      dispatch({
        type: PRODUCT_CREATE_RESET,
      });
      navigate('/dashboard/products');
    } else {
      toast.error(error);
    }
  }, [success, product, error]);

  const statusContent = ['New', 'On Sale', 'Hot'];

  return (
    <div className="new-pr">
      <Helmet>
        <title>Dashboard | New Product</title>
      </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Create a new product
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
                    onClick={handleCreateProductClick}
                  >
                   {loading && <>...</>} Create Product
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

export default NewProductPage;

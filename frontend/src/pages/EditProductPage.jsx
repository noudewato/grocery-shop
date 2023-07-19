import { Container, Stack, Typography, Button, Box, MenuItem, FormControlLabel, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PRODUCT_UPDATE_RESET } from '../constants/product.constant';
import { productDetailsAction, productUpdateAction } from '../actions/product.action';
import { categoryListAction } from '../actions/category.action';
import FormInput from '../components/form-input/form-input.component';
import Iconify from '../components/form-input/iconify';


const EditProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate, error: errorUpdate } = productUpdate;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(true);
  const [image, setImage] = useState('');

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
    if (successUpdate) {
      toast.success('updated successfully');
      navigate('/dashboard/products');
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
    } else {
      toast.error(errorUpdate);
    }
  }, [successUpdate, error]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category._id);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.description);
      setChecked(product.isActive);
    }
  }, [product]);

  const handleEditProductClick = (e) => {
    e.preventDefault();

    dispatch(
      productUpdateAction({
        _id: id,
        name,
        price,
        image,
        category,
        description,
        checked,
      })
    );

    setName('');
    setCategory('');
    setPrice('');
    setImage('');
    setDescription('');
  };
  return (
    <div>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Product
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Go Back
          </Button>
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
          <Stack spacing={3}>
            <FormInput
              text="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              name="name"
              label="Product Name"
            />
            <FormInput
              text="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              select
              fullWidth
              name="category"
              label="Product Category"
            >
              {categories.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
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
            />

            <FormInput
              text="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth
              name="image"
              label="Product Image"
            />

            <FormControlLabel
              checked={checked}
              value={checked}
              onChange={(e) => setChecked(e.target.checked)}
              label="isActive?"
              control={<Switch />}
            />

            {/* <input type="file" onChange={(e) => console.log(e.target.files[0])} /> */}

            {/* <Switch value={isActive} isActive={isActive} onChange={(e) => setIsActive(e.target.isActive)} /> */}
            <FormInput
              text="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              name="description"
              label="Content"
              rows={4}
              multiline
            />

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleEditProductClick}>
              Edit Product
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default EditProductPage;

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Switch, Button, Grid, Avatar, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CATEGORY_UPDATE_RESET } from '../constants/category.constant';
import FormInput from '../components/form-input/form-input.component';
import { categoryUpdateAction, categoryDetailsAction } from '../actions/category.action';
import Spinner from '../components/spinner/spinner.component';

const EditCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { success, category, error } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { category: categoryUpdated, loading } = categoryUpdate;

  const [name, setName] = useState('');
  const [nameError, setnameError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState('');
  const [imageError, setimageError] = useState('');

  const handleUpdateCategoryClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(
        categoryUpdateAction({
          _id: id,
          name,
          image,
          isActive,
        })
      );
    }
  };

   const handleValidation = () => {
     let formIsValid = true;
     if (!name) {
       formIsValid = false;
       setnameError('category name is required');
     }
     if (!image) {
       formIsValid = false;
       setimageError('category image is required');
     }

     return formIsValid;
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

  useEffect(() => {
    if (category) {
      setName(category.name);
      setImage(category.image);
      setIsActive(category.isActive);
    }
  }, [category]);

  useEffect(() => {
    if (categoryUpdated && categoryUpdated.success) {
      toast.success(`updated successfully`);
      navigate('/dashboard/category');
      dispatch({
        type: CATEGORY_UPDATE_RESET,
      });
      setName('');
      setImage('');
    }
    if (categoryUpdated && !categoryUpdated.success){
      toast.error(categoryUpdated.message);
        dispatch({
          type: CATEGORY_UPDATE_RESET,
        });
    }
  }, [dispatch, navigate, categoryUpdated]);

  useEffect(() => {
    dispatch(categoryDetailsAction(id));
  }, [id, dispatch]);

  return (
    <div className="new-pr">
      <Helmet>
        <title>Dashboard | New Category</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Category
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
                  <input style={{ display: 'none' }} id="image" name="image" onChange={uploadingHandler} type="file" />

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
                  required
                  onChange={(e) => setName(e.target.value)}
                  error={nameError}
                  helperText={nameError}
                  fullWidth
                  name="name"
                  label="Category Name"
                />

                <FormInput
                  text="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  error={imageError}
                  helperText={imageError}
                  fullWidth
                  name="image"
                  label="Category Image"
                />

                <FormControlLabel
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  label="isActive?"
                  control={<Switch />}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleUpdateCategoryClick}
                >
                {loading && <>....</>}  Save Change
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default EditCategoryPage;

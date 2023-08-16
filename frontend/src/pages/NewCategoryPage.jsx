import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Switch, Button, Grid, Avatar, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CATEGORY_CREATE_RESET } from '../constants/category.constant';
import FormInput from '../components/form-input/form-input.component';
import { categoryCreateAction } from '../actions/category.action';
import Spinner from '../components/spinner/spinner.component';

const NewCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success, category, error, loading } = categoryCreate;

  const [name, setName] = useState('');
  const [nameError, setnameError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState('');
  const [imageError, setimageError] = useState('');

  const handleCreateCategoryClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(
        categoryCreateAction({
          name,
          image,
          isActive,
        })
      );
    }
  };

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
    if (category && category.success) {
      toast.success(`${category?.category.name} is created successfully`);
      navigate('/dashboard/category');
      dispatch({
        type: CATEGORY_CREATE_RESET,
      });
      setName('');
      setImage('');
    }
    
     if (category && !category.success) {
       toast.error(category?.message);
       dispatch({
         type: CATEGORY_CREATE_RESET,
       });
     }

  }, [dispatch, navigate, success, category, error]);

  return (
    <div className="new-pr">
      <Helmet>
        <title>Dashboard | New Category</title>
      </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Create a new category
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
                      borderRadius:'50%',
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
                    onClick={handleCreateCategoryClick}
                  >
                   {loading && <>...</>} Create Category
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

export default NewCategoryPage;

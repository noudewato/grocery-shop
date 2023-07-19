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
  const { success, category, error } = categoryCreate;

  const [name, setName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [image, setImage] = useState('');

  const handleCreateCategoryClick = async (e) => {
    e.preventDefault();
    dispatch(
      categoryCreateAction({
        name,
        image,
        checked,
      })
    );
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
    if (success) {
      toast.success(`${category.name} is created successfully`);
      navigate('/dashboard/category');
      dispatch({
        type: CATEGORY_CREATE_RESET,
      });
      setName('');
      setImage('');
    } else {
      toast.error(error);
    }
  }, [success, category, error]);

  return (
    <div className="new-pr">
      <Helmet>
        <title>Dashboard | New Category</title>
      </Helmet>
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
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 300, height: 300, margin: 'auto' }}
              >
                <label htmlFor="image" style={{ margin: 'auto', textAlign: 'center' }}>
                  <input style={{ display: 'none' }} id="image" name="image" onChange={uploadingHandler} type="file" />

                  <Button color="secondary" variant="contained" component="span">
                    {uploading && <Spinner />} Upload Image
                  </Button>
                </label>
              </Avatar>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={3}>
                <FormInput
                  text="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  name="name"
                  label="Category Name"
                />

                <FormInput
                  text="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  fullWidth
                  name="image"
                  label="Category Image"
                />

                <FormControlLabel
                  checked={checked}
                  value={checked}
                  onChange={(e) => setChecked(e.target.checked)}
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
                  Create Category
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default NewCategoryPage;

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Box, Stack, Typography } from '@mui/material';
import image1 from '../../../assets/images/g-01.jpg';
import image2 from '../../../assets/images/g-02.jpg';
import image3 from '../../../assets/images/g-03.jpg';

const HomeSection = () => {
  const items = [
    {
      name: 'Your Online Shop',
      description: 'Easy Way oooh',
      image: image1,
    },
    {
      name: 'Open 24/7',
      description: 'Just Order Anything',
      image: image3,
    },
    {
      name: 'Fast Secure and Delivery',
      description: 'Your Online Shop',
      image: image2,
    },
  ];
  return (
    <Box sx={{ margin: '5rem 0 2rem 0', borderRadius: '2rem' }}>
      <Carousel>
        {items.map((item, i) => (
          <Box
            sx={{
              backgroundImage: `url(${item.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '400px',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '2rem',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={i}
          >
            <Stack direction="column" sx={{backgroundColor:'black'}}>
              <Typography variant="h3" component="div" sx={{textAlign:'center'}}>
                {item.name}
              </Typography>
              <Typography variant="h2" component="div" sx={{ color: 'green' }}>
                {item.description}
              </Typography>

              <Button className="CheckButton">Check it out!</Button>
            </Stack>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default HomeSection;

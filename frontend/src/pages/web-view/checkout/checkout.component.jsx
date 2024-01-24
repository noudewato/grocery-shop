import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Cart from '../cart/cart.component';
import Payment from '../payment/payment.component';
import ReviewOrder from '../review-order/review-order.component';
import Header from '../header/header.component';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Checkout = () => {

  const [isAddressFilled, setIsAddressFilled] = useState(false);


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = ['Cart', 'Payment and Address', 'Review your order'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Cart />;
      case 1:
        return <Payment setIsAddressFilled={setIsAddressFilled} />;
      case 2:
        return <ReviewOrder />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar> */}
      <Header />
      <Container component="main" sx={{ mb: 4, mt: 10 }}>
        {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> */}
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} color="success">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel color="success">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order confirmation, and will send you an update when
              your order has shipped.
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} variant="outlined">
                  Back
                </Button>
              )}
<Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1, mr: 2, display:`${activeStep === steps.length - 1 && "none"}` }}
              disabled={
                !userInfo?.user?.username ||
                (activeStep === 1 && !isAddressFilled) || // Use isAddressFilled to determine the button's disabled state
                cartItems.length === 0 ||
                (activeStep === steps.length - 1 && 'End')
              }
            >
              {activeStep === steps.length - 1 ? '' : 'Next'}
            </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1, mr: 2 }}
                disabled={!userInfo?.user?.username || cartItems.length === 0 || activeStep === steps.length - 1 && 'End'}
              >
                {activeStep === steps.length - 1 ? 'End' : 'Next'}
              </Button>
            </Box>
          </>
        )}
        {/* </Paper> */}
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;

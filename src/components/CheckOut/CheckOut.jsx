import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Container,
} from "@material-ui/core";
import { commerce } from "../../lib/commerce";
import { Link, useHistory } from "react-router-dom";
import AddressForm from "./AddressForm/AddressForm";
import PaymentForm from "./PaymentForm/PaymentForm";

import useStyles from "./style";

const steps = ["Shipping Address", "Payment Details"];

const CheckOut = ({ cart, order, onCaptureHandel, error }) => {
  const classes = useStyles();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [checkOutToken, setCheckOutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
        setCheckOutToken(token);
      } catch (error) {
        history.push("/");
      }
    };

    generateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveState) => prevActiveState + 1);
  const prevStep = () => setActiveStep((prevActiveState) => prevActiveState - 1);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm next={next} checkOutToken={checkOutToken} nextStep={nextStep} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkOutToken={checkOutToken}
        prevStep={prevStep}
        onCaptureHandel={onCaptureHandel}
        nextStep={nextStep}
      />
    );

  return (
    <Container my={4}>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkOutToken && <Form />}
        </Paper>
      </main>
    </Container>
  );
};

export default CheckOut;

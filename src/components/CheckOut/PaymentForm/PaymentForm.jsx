import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "../Review/Review";
import PaymentMethods from "./PaymentMethods/PaymentMethods";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkOutToken, shippingData, prevStep, onHandelCapture, nextStep }) => {
  return (
    <>
      <Review checkOutToken={checkOutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Methods
      </Typography>
      <Elements stripe={stripePromise}>
        <PaymentMethods
          onHandelCapture={onHandelCapture}
          shippingData={shippingData}
          prevStep={prevStep}
          nextStep={nextStep}
          checkOutToken={checkOutToken}
        />
      </Elements>
    </>
  );
};

export default PaymentForm;

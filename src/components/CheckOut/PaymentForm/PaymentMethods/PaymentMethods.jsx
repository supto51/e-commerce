import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";

const PaymentMethods = ({ onHandelCapture, shippingData, prevStep, nextStep, checkOutToken }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handelSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const orderData = {
        line_items: checkOutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          getaway: "stripe",
          payment_method_id: paymentMethod.id,
        },
      };
      console.log(checkOutToken.id);
      onHandelCapture(checkOutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <form onSubmit={(e) => handelSubmit(e, elements, stripe)}>
        <CardElement />
        <div style={{ margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled>
            Pay: {checkOutToken.live.subtotal.formatted_with_symbol}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentMethods;

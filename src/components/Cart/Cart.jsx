import React from "react";
import { Container, Button, Grid, Typography } from "@material-ui/core";
import CardItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

import useStyles from "./Style";

const Cart = ({ cart, handelUpdateCartQyt, handelEmptyCart, handelRemoveFromCart }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Your shopping cart is empty try{" "}
      <Link to="/" className={classes.link}>
        Add something to the cart!!🎉
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={4}>
        {cart.line_items.map((item) => (
          <Grid key={item.id} item xs={12} sm={4}>
            <CardItem
              item={item}
              handelUpdateCartQyt={handelUpdateCartQyt}
              handelRemoveFromCart={handelRemoveFromCart}
            />
          </Grid>
        ))}
        <div className={classes.cardDetails}>
          <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
          <div>
            <Button
              className={classes.emptyButton}
              onClick={handelEmptyCart}
              variant="contained"
              size="large"
              color="secondary"
              type="button"
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              className={classes.checkoutButton}
              variant="contained"
              size="large"
              color="primary"
              type="button"
            >
              Check Out
            </Button>
          </div>
        </div>
      </Grid>
    </>
  );

  if (!cart.line_items) return "loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4">
        Your shopping cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;

import React from "react";
import { Grid, Container } from "@material-ui/core";
import Product from "./Product/Product";

import useStyles from "./style";

const Products = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {props.products.map((product) => {
          return (
            <Grid item sm={6} md={4} lg={3} key={product.id}>
              <Product product={product} handelAddToCart={props.handelAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Products;

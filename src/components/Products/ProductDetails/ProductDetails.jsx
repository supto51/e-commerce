import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { commerce } from "../../../lib/commerce";
import { Container, Typography, Grid, CircularProgress } from "@material-ui/core";

import useStyle from "./Style";

const ProductDetails = () => {
  const classes = useStyle();
  const [product, setProduct] = useState();

  const { id } = useParams();

  const getProduct = async (id) => {
    const product = await commerce.products.retrieve(id);
    setProduct(product);
  };

  useEffect(() => {
    getProduct(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(product);

  const renderDetailsPage = () =>
    product ? (
      <>
        <Typography variant="h2" gutterBottom>
          {product.name}
        </Typography>
        <Grid item xs={12}>
          <img className={classes.image} src={product.media.source} alt={product.name} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body2"
            color="textPrimary"
          />
        </Grid>
      </>
    ) : (
      <div style={{ textAlign: "center", margin: "100px 0" }}>
        <CircularProgress size="10rem" thickness={2} />
      </div>
    );

  return (
    <Container>
      <div className={classes.toolbar} />
      {renderDetailsPage()}
    </Container>
  );
};

export default ProductDetails;

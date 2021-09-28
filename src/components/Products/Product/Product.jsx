import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import useStyles from "./style";

const Product = ({ product, handelAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} title={product.name} image={product.media.source} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="p">{product.price.formatted_with_code}</Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          component={Link}
          to={`/product-details/${product.id}`}
          variant="contained"
          color="primary"
        >
          Buy Now
        </Button>
        <IconButton aria-label="Add-To-Card" onClick={() => handelAddToCart(product.id, 1)}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;

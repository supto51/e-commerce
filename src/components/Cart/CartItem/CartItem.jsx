import React from "react";
import { Card, CardContent, CardMedia, Button, Typography, CardActions } from "@material-ui/core";
import useStyles from "./Style";

const CartItem = ({ item, handelUpdateCartQyt, handelRemoveFromCart }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia image={item.media.source} className={classes.media} title={item.name} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handelUpdateCartQyt(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handelUpdateCartQyt(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => handelRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;

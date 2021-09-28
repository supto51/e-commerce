import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  media: {
    height: 260,
    backgroundSize: "contain",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  cartActions: {
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
}));

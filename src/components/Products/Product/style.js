import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    padding: " 8px 16px",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
}));

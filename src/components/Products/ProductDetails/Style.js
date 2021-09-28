import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  image: {
    maxWidth: "100%",
    height: "400px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
}));

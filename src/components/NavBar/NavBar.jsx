import React from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Badge,
  Button,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useLocation } from "react-router-dom";

import useStyles from "./Style";
import logo from "../../assets/img/logo.png";

const NavBar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Typography component={Link} to="/" color="inherit" className={classes.title}>
            <img src={logo} alt="logo" className={classes.image} height="25px" />
            Commerce.js
          </Typography>
          <div className={classes.grow}></div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton component={Link} to="/cart" aria-label="Shopping Cart" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;

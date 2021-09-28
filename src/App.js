import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";

import Products from "./components/Products/Products";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./components/Cart/Cart";
import CheckOut from "./components/CheckOut/CheckOut";

import "./App.css";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => setCart(await commerce.cart.retrieve());

  const handelAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handelUpdateCartQyt = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handelRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handelEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const handelRefreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handelCaptureOrder = async (checkOutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkOutTokenId, newOrder);

      setOrder(incomingOrder);
      handelRefreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <NavBar totalItems={cart.total_items} />
      <Switch>
        <Route exact path="/">
          <Products products={products} handelAddToCart={handelAddToCart} />
        </Route>
        <Route exact path="/cart">
          <Cart
            cart={cart}
            handelUpdateCartQyt={handelUpdateCartQyt}
            handelEmptyCart={handelEmptyCart}
            handelRemoveFromCart={handelRemoveFromCart}
          />
        </Route>
        <Route exact path="/checkout">
          <CheckOut
            cart={cart}
            order={order}
            onCaptureHandel={handelCaptureOrder}
            error={errorMessage}
          />
        </Route>
        <Route exact path="/product-details/:id">
          <ProductDetails />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

import React from "react";
import Header from "./assets/Layout/Header";
import Meals from "./assets/Meals/Meals";
import Cart from "./assets/Cart/Cart.jsx";
import CartProvider from "./assets/store/CartProvider";

function App() {
  const [cartShown, setCartShown] = React.useState(false);

  const showCart = () => {
    setCartShown(true);
  };

  const hideCart = () => {
    setCartShown(false);
  };

  return (
    <CartProvider>
      {cartShown && <Cart onClose={hideCart} />}
      <Header onShowCart={showCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

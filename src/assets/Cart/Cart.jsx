import React from "react";
import CartContext from "../store/CartContext";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal.jsx";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [checkout, setCheckout] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [hasSubmit, setHasSubmit] = React.useState(false);

  const cartCtx = React.useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const cartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemove = (id) => {
    // console.log(id);
    cartCtx.removeItem(id);
  };

  const handleOrder = () => {
    // console.log("hellhsho");
    setCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        // console.log(item);
        return (
          <CartItem
            className={classes.ca}
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAdd.bind(null, item)}
            onRemove={cartItemRemove.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        {" "}
        Close{" "}
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrder}>
          {" "}
          Order{" "}
        </button>
      )}
    </div>
  );

  const onFinalOrder = async (userData) => {
    setSubmitLoading(true);

    await fetch(
      "https://react-sw-6cfc3-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          customer: userData,
          orderedFood: cartCtx.items,
        }),
      }
    );

    setHasSubmit(true);
    setSubmitLoading(false);

    cartCtx.clearItems();
  };

  const cartContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount: </span>
        <span> ${cartCtx.totalAmount.toFixed(2)} </span>
      </div>
      {checkout && (
        <Checkout onCancel={props.onClose} onFinalOrder={onFinalOrder} />
      )}
      {!checkout && modalActions}
    </React.Fragment>
  );

  const submitLoadingContent = <p> Your order is being placed... </p>;

  const submitSuccessfulContent = (
    <React.Fragment>
      <p> Your order has been successfully placed !! </p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          {" "}
          Close{" "}
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!submitLoading && !hasSubmit && cartContent}
      {submitLoading && submitLoadingContent}
      {!submitLoading && hasSubmit && submitSuccessfulContent}
    </Modal>
  );
};

export default Cart;

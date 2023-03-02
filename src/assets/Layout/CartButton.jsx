import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./CartButton.module.css";
import CartContext from "../store/CartContext"

const CartButton = (props) => {
  const [btnAnimate, setBtnAnimate] = React.useState(false)
  const cartCtx = useContext(CartContext);

    // const numOfCartItems = cartCtx.items.reduce((curNum, item) => {
    //   return curNum + item.amount;
    // }, 0)

  const { items } = cartCtx;
  const btnClasses = `${classes.button} ${btnAnimate ? classes.bump : ''}`
  React.useEffect(() => {
    if(items.length === 0) {
      return;
    }
    setBtnAnimate(true);
    const timer = setTimeout(()=> {
      setBtnAnimate(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items])

    let numOfCartItems = 0;
    const lent = items.map( (x) => {
      numOfCartItems += x.amount;
    })

  return (
    <button className={btnClasses} onClick = {props.onShowCart} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className = {classes.yourCart}> Your Cart </span>
      <span className={classes.badge}> {numOfCartItems} </span>
    </button>
  );
};

export default CartButton;

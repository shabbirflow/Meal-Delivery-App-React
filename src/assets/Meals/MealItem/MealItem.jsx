import React from 'react';
import classes from "./MealItem.module.css";
import MealForm from "./MealForm";
import CartContext from '../../store/CartContext'

const MealItem = (props) => {
  const cartCtx = React.useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name, 
      amount: amount,
      price: props.price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealForm id = {props.id} onAddToCart = {addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;

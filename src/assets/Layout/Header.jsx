import React from "react";
import mealImage from "../other/othermeals.jpg";
import CartButton from "./CartButton";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Mealy</h1>
         <CartButton onShowCart = {props.onShowCart} /> 
      </header>
      <div className={classes['main-image']}>
        <img src={mealImage} alt="bruh idk" />
      </div>
    </React.Fragment>
  );
};

export default Header;

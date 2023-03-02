import { useRef, useEffect, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (e) => (e.trim().length === 0 ? true : false);
const is6Long = (e) => (e.trim().length === 6 ? true : false);

const Checkout = (props) => {
  const [validity, setValidity] = useState({
    name: true,
    address: true,
    pin: true,
    city: true,
  });

  const nameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const pinCodeRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredPin = pinCodeRef.current.value;

    const nameValid = isEmpty(enteredName) ? false : true;
    const addressValid = isEmpty(enteredAddress) ? false : true;
    const cityValid = isEmpty(enteredCity) ? false : true;
    const pinValid = is6Long(enteredPin) ? true : false;

    setValidity({
      name: nameValid,
      address: addressValid,
      city: cityValid,
      pin: pinValid,
    });

    // console.log(validity)

    const formValid =
    nameValid && addressValid && cityValid && pinValid;

    if (!formValid) return;

    props.onFinalOrder({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      pin: enteredPin,
    });

    // props.onCancel();

    console.log("SUBMITTED!!!");
  };

  const nameStyle = !validity.name ? classes.invalid : "";
  const cityStyle = !validity.city ? classes.invalid : "";
  const addressStyle = !validity.address ? classes.invalid : "";
  const pinStyle = !validity.pin ? classes.invalid : "";
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameStyle}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!validity.name && <p> Please enter a valid name </p>}
      </div>
      <div className={`${classes.control} ${addressStyle}`}>
        <label htmlFor="address">Your address</label>
        <input type="text" id="address" ref={addressRef} />
        {!validity.address && <p> Please enter a valid address </p>}
      </div>
      <div className={`${classes.control} ${pinStyle}`}>
        <label htmlFor="pin">Pin Code</label>
        <input type="number" id="pin" ref={pinCodeRef} />
        {!validity.pin && <p> Please enter a valid pin code (6 digits) </p>}
      </div>
      <div className={`${classes.control} ${cityStyle}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!validity.city && <p> Please enter a valid city </p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

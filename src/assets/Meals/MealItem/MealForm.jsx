import React from "react";
import classes from "./MealForm.module.css";
import Input from "../../UI/Input";

const MealForm = (props) => {
    const [amountValid, setAmountValid] = React.useState(true);
    const amountInput = React.useRef();

    const submitHandler = (event) => {
    event.preventDefault();

    const enteredInput = amountInput.current.value;
    const enteredInputNumber = +enteredInput;
    if (
      enteredInput.trim().length === 0 ||
      enteredInputNumber < 1 ||
      enteredInputNumber > 5
    ) {
        setAmountValid(false);
        return;
    }

    props.onAddToCart(enteredInputNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        className = {classes.numberInput}
        ref={amountInput}
        input={{
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          id: "amount_" + props.id,
        }}
      />
      <button> + Add </button>
      {!amountValid && <p> Please enter a valid input (1 to 5) ! </p>}
    </form>
  );
};

export default MealForm;

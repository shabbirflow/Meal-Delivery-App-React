import React from 'react'; 
import CartContext from "./CartContext";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    
    let existsIndex = state.items.findIndex((x) => x.id === action.item.id);
    const existsItem = state.items[existsIndex];
    let updatedItems;
    if(existsItem){
      let updatedItem;
      updatedItem = {...existsItem, amount: existsItem.amount + action.item.amount};
      updatedItems = [...state.items];
      updatedItems[existsIndex] = updatedItem;
    }else{
      updatedItems = state.items.concat(action.item)
    }
    

    return {
        items: updatedItems,
        totalAmount: updatedAmount
    } }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  return defaultCart;
};

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = React.useReducer(cartReducer, defaultCart);

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };
  const cleartemHandler = () => {
    dispatchCart({type: "CLEAR"});
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItems: cleartemHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

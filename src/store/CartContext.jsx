import { useReducer, createContext } from "react";

// Actually, the items, addItem and removeItem are only used for auto-complete.
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // Update the state to add the meal item
    // state.items.push(action.item);
    // We can definitely use this statement for adding new item: state.items.push(action.item);
    // But if we click on adding one specific item multiple times?
    // This is an approach:
    const existingCartItemIndex = state.items.findIndex(
      (item) => action.item.id
    );
    // Create a copy for state items
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisitingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (exisitingItem.quantity === 1) {
      // Remove item
      updatedItems.slice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...exisitingItem,
        quantity: exisitingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  // useReducer accepts 2 params
  // the first one is a function to update state
  // the 2nd one is an initial state
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;

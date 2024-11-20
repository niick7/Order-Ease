import { useReducer, createContext } from "react";

// Actually, the items, addItem and removeItem are only used for auto-complete.
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  // The state is getting from useReducer(cartReducer, {
  //   items: [],
  // })
  // The action is getting from dispatchCartAction({ type: "ADD_ITEM", item });
  // And dispatchCartAction({ type: "REMOVE_ITEM", id });
  // Then sometimes you can see action.type, action.item.id (when adding item) OR action.id (when removing item)
  if (action.type === "ADD_ITEM") {
    // Update the state to add the meal item
    // state.items.push(action.item);
    // We can definitely use this statement for adding new item: state.items.push(action.item);
    // But if we click on adding one specific item multiple times?
    // This is an approach:
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
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
      updatedItems.splice(existingCartItemIndex, 1);
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
  // This is state: {
  //   items: [],
  // }
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    // And this is an action:
    // { type: "ADD_ITEM", item }
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

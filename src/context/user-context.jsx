import React,{ createContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  isAuth: false,
  isLoading: false,
  token: null,
  expiryDate: null,
  username: "",
  editStore: null,
  editStoreKey: null,
  orderItems: [],
  selectedItems: {},
  totalPrice: 0,
  shopItems: [],
};

export const UserContext = createContext(initialState);

const UserContextProvider = (props) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  console.log({globalState})
  return (
    <UserContext.Provider
      value={{ globalState: globalState, dispatch: dispatch }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

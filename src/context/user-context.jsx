import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const userContext = createContext({});
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

const UserContext = (props) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider
      value={{ globalState: globalState, dispatch: dispatch }}
    >
      {props.children}
    </userContext.Provider>
  );
};
export default UserContext;

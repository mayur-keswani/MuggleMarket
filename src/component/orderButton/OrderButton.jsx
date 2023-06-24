import React, { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../context/action-types";

const OrderButton = ({ item }) => {
  const { globalState, dispatch } = useContext(UserContext);
  const { selectedItems } = globalState;

  const addToCart = (id, name, price) => {
    console.log(id);
    dispatch({
      type: ADD_TO_CART,
      payload: { id: id, name: name, price: price },
    });
  };
  const removeFromCart = (id, name, price) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { id: id, name: name, price: price },
    });
  };

  return <></>
//   return selectedItems.hasOwnProperty(item._id.toString()) ? (
//     <Button.Group floated="right" className="mx-5" color="teal">
//       <Button
//         icon="add"
//         onClick={() => addToCart(item._id, item.name, item.price)}
//       />
//       <Button>{selectedItems[item._id.toString()]}</Button>
//       <Button
//         icon="minus"
//         disabled={selectedItems[item._id.toString()] <= 0}
//         onClick={() => removeFromCart(item._id, item.name, item.price)}
//       />
//     </Button.Group>
//   ) : (
//     <Item.Extra>
//       <Button
//         animated="vertical"
//         floated="right"
//         className="mx-5"
//         onClick={() => addToCart(item._id, item.name, item.price)}
//       >
//         <Button.Content hidden>
//           <Icon name="shop" />
//         </Button.Content>
//         <Button.Content visible>ADD TO CART</Button.Content>
//       </Button>
//     </Item.Extra>
//   );
};

export default OrderButton;

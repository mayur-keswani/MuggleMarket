import React, { useContext, useEffect, useState } from "react";
import {UserContext} from "../../context/user-context";
import { useNavigate } from "react-router-dom";
// import { Button, Item, Icon, Header } from "semantic-ui-react";
import { SET_LOADING } from "../../context/action-types";
import { Skeleton } from "../../component/commons/skeleton/card";
import "./MyStore.css";
import { fetchMyStores } from "../../lib/market.api";

const MyStore = () => {
  const { globalState, dispatch } = useContext(UserContext);
  const { isLoading } = globalState;
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  const fetchMySTORE = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const { data } = await fetchMyStores();
      setStores(data.stores);
      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const showStoreHandler = (id) => {
    navigate("/my-store/" + id);
  };
  useEffect(() => {
    fetchMySTORE();

    return () => {
      setStores([]); // This worked for me
    };
  }, []);

  return (
    <></>
    // <>
    //   <Header as="h2" className="mb-5 p-5 bg-light">
    //     <Icon name="shop" />
    //     <Header.Content>
    //       My Stores
    //       <Header.Subheader>Manage your stores</Header.Subheader>
    //     </Header.Content>
    //   </Header>

    //   {isLoading ? (
    //     <Skeleton />
    //   ) : !stores.length ? (
    //     <h4 className="text-danger">You Have No Store!</h4>
    //   ) : (
    //     <Item.Group relaxed className="mystore-section">
    //       {stores.map((store) => (
    //         <Item
    //           className="mx-2"
    //           style={{ width: "100%", borderBottom: "1px dotted black" }}
    //           key={store._id}
    //         >
    //           <Item.Image
    //             src={
    //               store.store_picture ||
    //               "https://react.semantic-ui.com/images/wireframe/image.png"
    //             }
    //             size="small"
    //             className="rounded img-fluid"
    //           />
    //           <Item.Content verticalAlign="middle">
    //             <Item.Header as="a">{store.name}</Item.Header>
    //             <Item.Meta>
    //               <span className="cinema">{store.store_type}</span>
    //             </Item.Meta>
    //             <Item.Description> {store.description}</Item.Description>
    //             <Item.Extra className="mt-1">
    //               <Button
    //                 animated
    //                 primary
    //                 size="large"
    //                 onClick={() => showStoreHandler(store._id)}
    //               >
    //                 <Button.Content visible>Look inside</Button.Content>
    //                 <Button.Content hidden>
    //                   <Icon name="arrow right" />
    //                 </Button.Content>
    //               </Button>
    //             </Item.Extra>
    //           </Item.Content>
    //         </Item>
    //       ))}
    //     </Item.Group>
    //   )}
    // </>
  );
};

export default MyStore;

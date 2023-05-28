import React, { useEffect, useState, useContext } from "react";
import AboutStore from "./AboutStore";
import StoreItems from "./StoreItems";
import { Spinner } from "../../component/ui/spinner/Spinner";
import { Route, useHistory, useParams } from "react-router-dom";
import { Grid, Header, Menu } from "semantic-ui-react";
import { SET_SHOP_ITEMS } from "../../context/action-types";
import userContext from "../../context/user-context";
import { fetchStoreDetailAPI } from "../../lib/market.api";

const StoreDetails = () => {
  const [navItem, setnavItem] = useState({ activeItem: "about-store" });
  const history = useHistory();
  const { id } = useParams();
  const [store, setStore] = useState();
  const { dispatch } = useContext(userContext);
  const handleItemClick = (e, { name }) => {
    setnavItem({ activeItem: name });
    history.push("/store/" + id + "/" + name);
  };

  const fetchSingleStore = async (id) => {
    try {
      const { data: result } = await fetchStoreDetailAPI(id);
      const { store } = result;
      dispatch({ type: SET_SHOP_ITEMS, payload: store.store_items });
      setStore(store);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSingleStore(id);
  }, [id]);
  const { activeItem } = navItem;
  return !store ? (
    <Spinner />
  ) : (
    <>
      <div
        className="store-thumbnail jumbotron text-center"
        style={{ height: "15vh", zIndex: "200" }}
      >
        {/* <img src=""  */}
        <Grid>
          <Grid.Column mobile={8} tablet={6} computer={3}>
            <img
              src={
                store.store_picture ||
                "https://img2.pngio.com/market-store-retail-shop-shop-shopping-store-store-icon-retail-shopping-icon-png-512_512.png"
              }
              alt="store-thumbnail"
              className="img-fluid img-thumbnail"
              style={{
                width: "180px",
                height: "160px",
                borderRadius: "50%",
                position: "relative",
                bottom: "-10%",
                left: "10%",
                transform: "translateY(-10%)",
              }}
            />
          </Grid.Column>
        </Grid>
      </div>

      <div
        className="bg-light jumbotron d-flex justify-items-start align-items-end"
        style={{ height: "30vh", zIndex: "100" }}
      >
        <Header as="h2" className="p-2">
          {store.name}
          <Header.Subheader className="text-muted">
            {store.store_type} <br />
            <br />
            <p className="text-lead">{store.city}</p>
            {store.opening_time} - {store.closing_time}
          </Header.Subheader>
        </Header>
      </div>

      <div className="store-navbar bg-light">
        <Menu attached="top" tabular>
          <Menu.Item
            name="about-store"
            className="px-5 mr-2 text-lead h6"
            active={activeItem === "about-store"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="items"
            className="px-5 mr-2 text-lead h6"
            active={activeItem === "items"}
            onClick={handleItemClick}
          />
        </Menu>
      </div>

      <Route
        path="/store/:id/about-store"
        exact
        render={() => <AboutStore store={store} />}
      />
      <Route
        path="/store/:id/items"
        exact
        render={() => <StoreItems store={store} />}
      />
    </>
  );
};

export default StoreDetails;

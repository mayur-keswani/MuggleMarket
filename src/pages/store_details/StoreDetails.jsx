import React, { useEffect, useState, useContext } from "react";
import AboutStore from "./AboutStore";
import StoreItems from "./StoreItems";
import { Skeleton } from "../../component/commons/skeleton/card";
import { useNavigate, useParams } from "react-router-dom";
import { SET_SHOP_ITEMS } from "../../context/action-types";
import { UserContext } from "../../context/user-context";
import { fetchStoreDetailAPI } from "../../lib/market.api";

const StoreDetails = () => {
  const [navItem, setnavItem] = useState({ activeItem: "about-store" });
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [StoreDetails, setStoreDetails] = useState();
  const { dispatch } = useContext(UserContext);

  const handleItemClick = (e, { name }) => {
    setnavItem({ activeItem: name });
    navigate("/store/" + id + "/" + name);
  };

  const fetchStoreData = async (id) => {
    try {
      setIsLoading(true);
      const { data: result } = await fetchStoreDetailAPI(id);
      const { store } = result;
      dispatch({ type: SET_SHOP_ITEMS, payload: store.store_items });
      setIsLoading(false);

      setStoreDetails(store);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStoreData(id);
    }
  }, [id]);

  const { activeItem } = navItem;
  return isLoading || !setStoreDetails ? (
    <Skeleton />
  ) : (
    <>
      <div
        className="store-thumbnail jumbotron text-center"
        style={{ height: "15vh", zIndex: "200" }}
      >
        <div className="grid grid-cols-4">
          <div>
            <img
              src={
                setStoreDetails.store_picture ||
                "https://img2.pngio.com/market-store-retail-shop-shop-shopping-store-store-icon-retail-shopping-icon-png-512_512.png"
              }
              alt="store-thumbnail"
              className="relative w-[180px] h-[160px] rounded-full -bottom-[10%] left-[10] -translate-y-[10%] "
              // style={{
              //   width: "180px",
              //   height: "160px",
              //   borderRadius: "50%",
              //   position: "relative",
              //   bottom: "-10%",
              //   left: "10%",
              //   transform: "translateY(-10%)",
              // }}
            />
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div
    //     className="store-thumbnail jumbotron text-center"
    //     style={{ height: "15vh", zIndex: "200" }}
    //   >
    //     {/* <img src=""  */}
    // <Grid>
    //   <Grid.Column mobile={8} tablet={6} computer={3}>
    //     <img
    //       src={
    //         store.store_picture ||
    //         "https://img2.pngio.com/market-store-retail-shop-shop-shopping-store-store-icon-retail-shopping-icon-png-512_512.png"
    //       }
    //       alt="store-thumbnail"
    //       className="img-fluid img-thumbnail"
    //       style={{
    //         width: "180px",
    //         height: "160px",
    //         borderRadius: "50%",
    //         position: "relative",
    //         bottom: "-10%",
    //         left: "10%",
    //         transform: "translateY(-10%)",
    //       }}
    //     />
    //   </Grid.Column>
    // </Grid>
    //   </div>

    //   <div
    //     className="bg-light jumbotron d-flex justify-items-start align-items-end"
    //     style={{ height: "30vh", zIndex: "100" }}
    //   >
    //     <Header as="h2" className="p-2">
    //       {store.name}
    //       <Header.Subheader className="text-muted">
    //         {store.store_type} <br />
    //         <br />
    //         <p className="text-lead">{store.city}</p>
    //         {store.opening_time} - {store.closing_time}
    //       </Header.Subheader>
    //     </Header>
    //   </div>

    //   <div className="store-navbar bg-light">
    //     <Menu attached="top" tabular>
    //       <Menu.Item
    //         name="about-store"
    //         className="px-5 mr-2 text-lead h6"
    //         active={activeItem === "about-store"}
    //         onClick={handleItemClick}
    //       />
    //       <Menu.Item
    //         name="items"
    //         className="px-5 mr-2 text-lead h6"
    //         active={activeItem === "items"}
    //         onClick={handleItemClick}
    //       />
    //     </Menu>
    //   </div>

    //   <Route
    //     path="/store/:id/about-store"
    //     exact
    //     element={<AboutStore store={store} />}
    //   />
    //   <Route
    //     path="/store/:id/items"
    //     exact
    //     element={<StoreItems store={store} />}
    //   />
    // </>
  );
};

export default StoreDetails;

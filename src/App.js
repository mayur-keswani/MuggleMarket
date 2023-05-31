import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "semantic-ui-css/semantic.min.css";

import Stores from "./pages/stores/Stores";
import { Route, Routes } from "react-router-dom";

import PartnerWithUs from "./pages/partner_with_us/PartnerWithUs";
import CreateStore from "./pages/create_your_store/CreateStore";
import { onAuthentication, onLogout } from "./context/action-types";
import StoreDetails from "./pages/store_details/StoreDetails";
import MyStore from "./pages/my-stores/MyStores";
import EditStore from "./pages/edit-store/EditStore";
import Checkout from "./pages/checkout/Checkout";
import MyOrders from "./pages/my-orders/MyOrders";
import BaseLayout from "./component/layout/BaseLayout";
import UserContextProvider from "./context/user-context";

const App = () => {
  // const autoLogoutHandler = (remainingTime) => {
  //   console.log(remainingTime);
  //   setTimeout(() => {
  //     localStorage.removeItem("token");
  //     dispatch({ type: onLogout, payload: null, expiresIn: null });
  //   }, remainingTime);
  // };

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   const expiresIn = localStorage.getItem("expiresIn");
  //   const username = JSON.parse(localStorage.getItem("username"));

  //   console.log(expiresIn);
  //   if (!token && !expiresIn) {
  //     return 0;
  //   }

  //   if (new Date(expiresIn) < new Date()) {
  //     dispatch({ type: onLogout, payload: null });
  //     return 0;
  //   }
  //   const payload = {
  //     token: token,
  //     username: username,
  //   };
  //   dispatch({ type: onAuthentication, payload });
  //   let remainingTime = new Date(expiresIn).getTime() - new Date().getTime();

  //   autoLogoutHandler(remainingTime);
  // }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <BaseLayout>
            <Stores />
          </BaseLayout>
        }
      />

      <Route
        path="/partner_with_us"
        render={() => (
          <BaseLayout>
            <PartnerWithUs />
          </BaseLayout>
        )}
      />

      {/* {globalState.isAuth ? (
            <Route
              path="/create-your-store/:page"
              exact
              component={CreateStore}
            />
          ) : null} */}

      <Route path="/store/:id" element={<StoreDetails />} />

      <Route path="/my-stores" element={<MyStore />} />

      <Route path="/my-store/:id" element={<EditStore />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route
        path="/my-orders"
        render={() => (
          <BaseLayout>
            <MyOrders />
          </BaseLayout>
        )}
      />
    </Routes>
  );
};

export default App;

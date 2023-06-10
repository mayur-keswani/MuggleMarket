import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

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

const App = () => {
 
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
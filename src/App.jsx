import React, { useContext, useEffect } from "react";

import Stores from "./pages/stores/Stores";
import { Route, Routes } from "react-router-dom";

import PartnerWithUs from "./pages/partner_with_us/PartnerWithUs";
import StoreDetails from "./pages/store_details/StoreDetails";
import MyStore from "./pages/my-stores/MyStores";
import EditStore from "./pages/edit-store/EditStore";
import Checkout from "./pages/checkout/Checkout";
import MyOrders from "./pages/my-orders/MyOrders";
import BaseLayout from "./component/layout/BaseLayout";

import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./context/user-context";
import CreateStore from "./pages/create_your_store/CreateStore";
import { onLogin } from "./context/action-creators";
import { checkIsAuthenticated } from "./lib/localStorage";

const App = () => {
  const { globalState, dispatch } = useContext(UserContext)



  useEffect(() => {
    (async () => {
      const auth = await checkIsAuthenticated();
      console.log({auth})
      if (auth) {
        dispatch(onLogin(auth))
      }
    })()
  }, [])
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
        path="/partner-with-us"
        element={
          <BaseLayout forBusiness={true}>
            <PartnerWithUs />
          </BaseLayout>
        }
      />

      {globalState.isAuth || true ? (
        <Route
          path="/create-your-store/:page"
          element={<BaseLayout forBusiness={true}><CreateStore /></BaseLayout>}
        />
      ) : null}

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

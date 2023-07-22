import React, { useContext, useEffect } from "react";

import Stores from "./pages/stores/Stores";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

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
import { getCartAPI } from "./lib/market.api";
import { addInitialCartItems } from "./context/action-creators";

const ProtectedRoute = (props) => {
  if (!props?.auth?.isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return props.children ? props.children : <Outlet />;
};



const App = () => {
  const { globalState:{auth}, dispatch } = useContext(UserContext);
  const getCartItems = async () => {
    try {
      const { data } = await getCartAPI();
      console.log(data);
      dispatch(addInitialCartItems(data.cart))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(auth.isLoggedIn)
      getCartItems();
  }, [auth]);

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
          <ProtectedRoute auth={auth}>
            <BaseLayout forBusiness={true}>
              <Outlet />
            </BaseLayout>
          </ProtectedRoute>
        }
      >
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route
          path="/partner-with-us/create-your-store"
          element={<CreateStore />}
        />

        <Route path="/partner-with-us/my-stores" element={<MyStore />} />
      </Route>

      <Route
        path="/store/:id"
        element={
          <BaseLayout>
            <StoreDetails />
          </BaseLayout>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute auth={auth}>
            <BaseLayout>
              <Checkout />
            </BaseLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/my-store/:id" element={<EditStore />} />

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

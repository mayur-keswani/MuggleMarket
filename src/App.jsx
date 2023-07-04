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

const ProtectedRoute = (props) => {
  if (!props?.auth?.isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return props.children ? props.children : <Outlet />;
};


const App = () => {
  const { globalState, dispatch } = useContext(UserContext);

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
          <ProtectedRoute auth={globalState?.auth}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route
          path="/partner-with-us"
          element={
            <BaseLayout forBusiness={true} overLap={true}>
              <PartnerWithUs />
            </BaseLayout>
          }
        />
        <Route
          path="/partner-with-us/create-your-store/:page"
          element={
            <BaseLayout forBusiness={true}>
              <CreateStore />
            </BaseLayout>
          }
        />
      </Route>

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

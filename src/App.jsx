import React, { useContext, useEffect } from "react";

import Stores from "./pages/stores";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import PartnerWithUs from "./pages/partner-with-us";
import StoreDetails from "./pages/store-details";
import MyStore from "./pages/my-stores";
import Checkout from "./pages/checkout";
import MyOrders from "./pages/my-orders";
import BaseLayout from "./component/layout/BaseLayout";

import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./context/user-context";
import CreateStore from "./pages/create-your-store";
import { getCartAPI } from "./lib/market.api";
import { addInitialCartItems } from "./context/action-creators";
import StoreProducts from "./pages/my-stores/products";
import PaymentPage from "./pages/payment";

const ProtectedRoute = (props) => {
  if (!props?.auth?.isLoggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return props.children ? props.children : <Outlet />;
};

const App = () => {
  const {
    globalState: { auth },
    dispatch,
  } = useContext(UserContext);
  const getCartItems = async () => {
    try {
      const { data } = await getCartAPI();
      dispatch(addInitialCartItems(data.cart));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) getCartItems();
  }, [auth]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <BaseLayout showCart={true}>
            <Stores />
          </BaseLayout>
        }
      />

      <Route
        path="/partner-with-us"
        element={
          <ProtectedRoute auth={auth}>
            <BaseLayout forBusiness={true} showCart={false}>
              <Outlet />
            </BaseLayout>
          </ProtectedRoute>
        }
      >
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/partner-with-us/my-stores" element={<MyStore />} />
        <Route
          path="/partner-with-us/my-stores/:id/products"
          element={<StoreProducts />}
        />
        <Route
          path="/partner-with-us/create-your-store"
          element={<CreateStore />}
        />
        <Route
          path="/partner-with-us/create-your-store/:id"
          element={<CreateStore />}
        />
      </Route>

      <Route
        path="/store/:id"
        element={
          <BaseLayout showCart={true}>
            <StoreDetails />
          </BaseLayout>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute auth={auth}>
            <BaseLayout showCart={false}>
              <Checkout />
            </BaseLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute auth={auth}>
            <BaseLayout showCart={false}>
              <PaymentPage />
            </BaseLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute auth={auth}>
            <BaseLayout showCart={false}>
              <MyOrders />
            </BaseLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

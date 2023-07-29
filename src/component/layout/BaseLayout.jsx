import React, { useContext } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Cart from "../cart/Cart";
import { UserContext } from "../../context/user-context";

const BaseLayout = (props) => {
  const {
    globalState: { cart,auth },
  } = useContext(UserContext);
  return (
    <>
      <Header forBusiness={!!props?.forBusiness} overLap={!!props?.overLap} />
      <main className="relative mt-48 md:mt-24 min-h-[calc(100vh-9rem)] md:min-h-[calc(100vh-6rem)]">
        {props.children}
        {cart.length > 0 && !!props.showCart && auth.isLoggedIn && (
          <Cart totalItems={cart} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;

import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const BaseLayout = (props) => {
  return (
    <>
      <Header
        forBusiness={!!props?.forBusiness}
        overLap={!!props?.overLap }
      />
      {props.children} <Footer />
    </>
  );
};

export default BaseLayout;

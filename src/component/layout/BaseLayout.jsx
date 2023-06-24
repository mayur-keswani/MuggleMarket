import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const BaseLayout = (props) => {
  return (
    <>
      <Header forBusiness={!!props?.forBusiness} />
      {props.children} <Footer />
    </>
  );
};

export default BaseLayout;

import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const BaseLayout = (props) => {
  return (
    <>
      <Header />
      {props.children} <Footer />
    </>
  );
};

export default BaseLayout;

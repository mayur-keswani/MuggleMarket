import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const BaseLayout = (props) => {
  return (
    <>
      <Header forBusiness={!!props?.forBusiness} overLap={!!props?.overLap} />
      <main className="relative mt-28 min-h-[calc(100vh-6rem)]">
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;

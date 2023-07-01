import React from "react";
import "./Logo.css";
const ForBusiness = () => {
  return (
    <div className="logoWrapper flex flex-col justify-start text-black md:text-white ">
      <span className=" text-xl">Muggle Market</span>
      <span className="text-ellipsis italic text-right text-lg">For Business</span>
    </div>
  );
};

export default ForBusiness;

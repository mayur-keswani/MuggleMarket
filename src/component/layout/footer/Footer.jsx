import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../commons/logo/Logo";

const Footer = () => {
  return (
    <footer className="flex flex-col px-8 pt-6 dark:border-gray-dark dark:bg-gray-dark">
      <div>
        <Logo />
      </div>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4 p-2">
        <div className="flex flex-col my-1">
          <span className="font-bold">About MuggleMarket</span>
          <NavLink className={"text-muted"}>Company</NavLink>
          <NavLink className={"text-muted"}>About</NavLink>
          <NavLink className={"text-muted"}>Jobs</NavLink>
          <NavLink className={"text-muted"}>Team</NavLink>
        </div>

        <div className="flex flex-col my-1">
          <span className="font-bold">MuggleVerse</span>
          <NavLink className={"text-muted"}>MuggleMarker</NavLink>
          <NavLink className={"text-muted"}>MuggleAcademy</NavLink>
          <NavLink className={"text-muted"}>MuggleDrive</NavLink>
          <NavLink className={"text-muted"}>MugglePexels</NavLink>
          <NavLink className={"text-muted"}>MuggleKeep</NavLink>
        </div>

        <div className="flex flex-col my-1">
          <span className="font-bold">For Stores</span>
          <NavLink to={"/partner-with-us"} className={"text-muted"}>
            Partners With Us
          </NavLink>
          <NavLink className={"text-muted"}>Privacy</NavLink>
          <NavLink className={"text-muted"}>Security</NavLink>
          <NavLink className={"text-muted"}>Terms</NavLink>
        </div>

        <div className="flex flex-col my-1">
          <span className="font-bold">Social Links</span>
          <NavLink className={"text-muted"}>Privacy</NavLink>
          <NavLink className={"text-muted"}>Terms</NavLink>
          <NavLink className={"text-muted"}>Security</NavLink>
          <NavLink className={"text-muted"}>Site Map</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

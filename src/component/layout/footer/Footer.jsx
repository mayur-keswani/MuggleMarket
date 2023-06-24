import React,{Fragment} from "react";
import { NavLink } from "react-router-dom";
import  "./Footer.css";
import Logo from "../../commons/logo/Logo";

const Footer = () => {
  return (
    <footer>
      <div>
        <Logo />
      </div>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col my-1">
          <span className="font-bold">About MuggleMarket</span>
          <NavLink>Company</NavLink>
          <NavLink>About</NavLink>
          <NavLink>Jobs</NavLink>
          <NavLink>Team</NavLink>
        </div>

        <div className="flex flex-col my-1">
          <span className="font-bold">MuggleVerse</span>
          <NavLink>MuggleMarker</NavLink>
          <NavLink>MuggleAcademy</NavLink>
          <NavLink>MuggleDrive</NavLink>
          <NavLink>MugglePexels</NavLink>
          <NavLink>MuggleKeep</NavLink>
        </div>

        <div className="flex flex-col my-1">
          <span className="font-bold">For Stores</span>
          <NavLink to={"/partner-with-us"}>Partners With Us</NavLink>
          <NavLink>Privacy</NavLink>
          <NavLink>Security</NavLink>
          <NavLink>Terms</NavLink>
        </div>

        <div className="flex flex-col my-1">
          <span className="font-bold">Social Links</span>
          <NavLink>Privacy</NavLink>
          <NavLink>Terms</NavLink>
          <NavLink>Security</NavLink>
          <NavLink>Site Map</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

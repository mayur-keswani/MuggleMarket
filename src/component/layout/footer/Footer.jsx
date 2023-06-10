import React,{Fragment} from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
import Logo from "../../ui/logo/Logo";

const Footer = () => {
  return (
    <footer>
      <div className={styles.basicInfo}>
        <Logo />
       
      </div>
      <hr />
      <div className="row d-flex  justify-content-center">
        <div className="col-lg-3 col-md-4 col-sm-2 d-flex flex-column my-1">
          <span className="fw-bold">About MuggleMarket</span>
          <NavLink >Company</NavLink>
          <NavLink >About</NavLink>
          <NavLink >Jobs</NavLink>
          <NavLink >Team</NavLink>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-2  d-flex flex-column my-1">
          <span className="fw-bold">MuggleVerse</span>
          <NavLink >MuggleMarker</NavLink>
          <NavLink >MuggleAcademy</NavLink>
          <NavLink >MuggleDrive</NavLink>
          <NavLink >MugglePexels</NavLink>
          <NavLink >MuggleKeep</NavLink>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-2  d-flex flex-column my-1">
          <span className="fw-bold">For Stores</span>
          <NavLink >Partners With Us</NavLink>
          <NavLink >Privacy</NavLink>
          <NavLink >Security</NavLink>
          <NavLink >Terms</NavLink>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-2  d-flex flex-column my-1">
          <span className="fw-bold">Social Links</span>
          <NavLink>Privacy</NavLink>
          <NavLink >Terms</NavLink>
          <NavLink >Security</NavLink>
          <NavLink >Site Map</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

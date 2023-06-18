import React, { useContext, useState } from "react";
import DetectLocation from "./location/DetectLocation";
import SearchBar from "./search-bar/SearchBar";
import styles from "./Header.module.css";
import Logo from "../../ui/logo/Logo";
import { UserContext } from "../../../context/user-context";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";


const Header = (props) => {
  const { globalState, dispatch } = useContext(UserContext);
  const { isAuth, username } = globalState;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className={styles.navbar}>
        <div className={styles.logoWrapper}>
          <span className={`mx-2 ${styles.hamburger}`}>
            {isMenuOpen ? (
              <GrClose
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              />
            ) : (
              <GiHamburgerMenu
                onClick={() => {
                  setIsMenuOpen(true);
                }}
              />
            )}
          </span>

          <Logo />
        </div>
        <div className={styles.navbarInner}>
          <div className={styles.leftSide}>
            <div>
              <DetectLocation />
              <SearchBar />
            </div>
          </div>
          <div className={`${styles.rightSide} ${isMenuOpen && styles.open}`}>
            <ul className={styles.navList}>
              <li className="btn-login px-2 mx-2">Log in</li>
              <li className="btn-signup px-2">Sign Up</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className={`${styles.searchBar} d-flex row`}>
        <div className="col-lg-12 flex grow justify-end">
          <input
            className="flex h-10 w-[250px] rounded-md bg-gray px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search"
          ></input>
        </div>
      </div> */}
    </header>
  );
};

export default Header;

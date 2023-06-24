import React, { useContext, useState } from "react";
import DetectLocation from "./location/DetectLocation";
import SearchBar from "./search-bar/SearchBar";
import styles from "./Header.module.css";
import Logo from "../../commons/logo/Logo";
import { UserContext } from "../../../context/user-context";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import ForBusiness from "../../commons/logo/ForBusiness";

const Header = (props) => {
  const { globalState, dispatch } = useContext(UserContext);
  const { isAuth, username } = globalState;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <header className={`bg-white ${props?.forBusiness && 'relative bg-transparent'} `}>
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

            {props?.forBusiness ? <ForBusiness /> : <Logo />}
          </div>
          <div className={styles.navbarInner}>
            {!props?.forBusiness && (
              <div className={styles.leftSide}>
                <div>
                  <DetectLocation />
                  <SearchBar />
                </div>
              </div>
            )}

            <div className={`${styles.rightSide} ${isMenuOpen && styles.open}`}>
              <ul className={styles.navList}>
                <li className="btn-login px-2 mx-2">Log in</li>
                <li className="btn-signup px-2">Sign Up</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className={`h-12 grid grid-cols-4 gap-4 md:hidden`}>
        <div className="col-span-3">
          <SearchBar />
        </div>
        <DetectLocation />
      </div>
    </>
  );
};

export default Header;

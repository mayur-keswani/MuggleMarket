import React, { Fragment, useContext, useEffect, useState } from "react";
import DetectLocation from "./location/DetectLocation";
import SearchBar from "./search-bar/SearchBar";
import Logo from "../../commons/logo/Logo";
import { UserContext } from "../../../context/user-context";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import ForBusiness from "../../commons/logo/ForBusiness";
import LoginModal from "../../modals/LoginModal";
import SignupModal from "../../modals/SignupModal";
import UserAccountMenu from "./UserAccountMenu";
import { useNavigate } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Header = (props) => {
  const [showLoginDialog, setShowLoginModal] = useState(false);
  const [showSignupDialog, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  const { globalState } = useContext(UserContext);
  const {
    auth: { isLoggedIn },
  } = globalState;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


  return (
    <>
      <header
        className={`fixed top-0 w-full h-24 box-border bg-gray-light dark:border-gray-dark dark:bg-gray-dark z-10  `}
      >
        {showLoginDialog  && <LoginModal
          isOpen={showLoginDialog}
          closeModal={() => {
            setShowLoginModal(false);
          }}
        />}
        {showSignupDialog  && <SignupModal
          isOpen={showSignupDialog}
          closeModal={() => {
            setShowSignupModal(false);
          }}
        />}
        <nav className="w-full h-full flex items-center justify-between box-border">
          <div className="h-full p-1 flex items-center justify-center flex-initial">
            <span className={`mx-2 block md:hidden`}>
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
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              {props?.forBusiness ? (
                <ForBusiness overLap={props?.overLap} />
              ) : (
                <Logo />
              )}
            </div>
          </div>

          <div className="flex flex-auto h-full items-center justify-between m-0">
            {/* LEFT SIDE */}
            <div>
              {!props?.forBusiness && (
                <div
                  className={`${
                    isMenuOpen
                      ? "fixed top-[6rem] left-0 w-full h-[calc(100vh-6rem)] flex justify-center items-center z-10 text-black bg-gray-light overflow-hidden"
                      : "hidden md:flex md:px-4 items-center justify-center"
                  }`}
                >
                  <ul className="text">
                    <li
                      onClick={() => {
                        navigate("/partner-with-us");
                      }}
                    >
                      {" "}
                      Partner With Us
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className={`flex items-center justify-center`}>
              <div className="mr-3">
                <button
                  className="btn dark:hidden"
                  onClick={() => {
                    document.documentElement.classList.add("dark");
                  }}
                >
                  <MdDarkMode size={"1.5rem"} />
                </button>
                <button
                  className="btn hidden dark:block "
                  onClick={() => {
                    document.documentElement.classList.remove("dark");
                  }}
                >
                  <MdLightMode size={"1.5rem"} />
                </button>
              </div>
              {!props?.forBusiness && (
                <div className="hidden md:flex items-center justify-center ">
                  <DetectLocation />
                  <SearchBar />
                </div>
              )}
              {!isLoggedIn ? (
                <ul className="text-xl flex mx-2 space-x-3">
                  <li
                    className="btn-login "
                    onClick={() => {
                      setShowLoginModal(true);
                    }}
                  >
                    Log in
                  </li>
                  <li
                    className="btn-signup "
                    onClick={() => {
                      setShowSignupModal(true);
                    }}
                  >
                    Sign Up
                  </li>
                </ul>
              ) : (
                <UserAccountMenu />
              )}
            </div>
          </div>
        </nav>
        {!props?.forBusiness && (
          <div className={`h-12 grid grid-cols-4 gap-4 md:hidden`}>
            <div className="col-span-3">
              <SearchBar />
            </div>
            <DetectLocation />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

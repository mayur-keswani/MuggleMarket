import React, { Fragment, useContext, useState } from "react";
import DetectLocation from "./location/DetectLocation";
import SearchBar from "./search-bar/SearchBar";
import styles from "./Header.module.css";
import Logo from "../../commons/logo/Logo";
import { UserContext } from "../../../context/user-context";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import ForBusiness from "../../commons/logo/ForBusiness";
import LoginModal from "../../modals/LoginModal";
import SignupModal from "../../modals/SignupModal";
import { Menu, Transition } from "@headlessui/react";
import { onLogout } from "../../../context/action-creators";
import { clearLocalStorage } from "../../../lib/localStorage";

const Header = (props) => {
  const [showLoginDialog, setShowLoginModal] = useState(false);
  const [showSignupDialog, setShowSignupModal] = useState(false);

  const { globalState, dispatch } = useContext(UserContext);
  const {
    auth: { isLoggedIn, username },
  } = globalState;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  async function logoutHandler() {
    dispatch(onLogout());
    await clearLocalStorage();
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <header
        className={`${props?.forBusiness &&
          props?.overLap &&
          "absolute top-0 left-0 bg-white dark:bg-slate-800 md:bg-transparent z-10 "} `}
      >
        <LoginModal
          isOpen={showLoginDialog}
          closeModal={() => {
            setShowLoginModal(false);
          }}
        />
        <SignupModal
          isOpen={showSignupDialog}
          closeModal={() => {
            setShowSignupModal(false);
          }}
        />
        <div className={styles.navbar}>
          <div className={styles.logoWrapper}>
            <span className={`mx-2 ${styles.hamburger}`}>
              {isMenuOpen ? (
                <GrClose
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={`${props?.forBusiness && " md:text-white"}`}
                />
              ) : (
                <GiHamburgerMenu
                  onClick={() => {
                    setIsMenuOpen(true);
                  }}
                  className={`${props?.forBusiness && "md:text-white"}`}
                />
              )}
            </span>

            {props?.forBusiness ? (
              <ForBusiness overLap={props?.overLap} />
            ) : (
              <Logo />
            )}
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
              <ul
                className={`${styles.navList} ${
                  props?.forBusiness ? "text-white" : "text-slate-600"
                } text-xl`}
              >
                {!isLoggedIn ? (
                  <>
                    <li
                      className="btn-login px-2 mx-2"
                      onClick={() => {
                        setShowLoginModal(true);
                      }}
                    >
                      Log in
                    </li>
                    <li
                      className="btn-signup px-2"
                      onClick={() => {
                        setShowSignupModal(true);
                      }}
                    >
                      Sign Up
                    </li>
                  </>
                ) : isMenuOpen ? (
                  <>
                    <li className="btn-login px-2 mx-2">Account Settings</li>
                    <li className="btn-signup px-2">Support</li>
                    <li
                      className="btn-signup px-2"
                      onClick={() => {
                        logoutHandler();
                      }}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <Menu
                    as="div"
                    className="relative inline-block text-left mx-5"
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <i color="#FF7E8B" size="20">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                            <circle cx="12" cy="10" r="3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        </i>
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {/* <div className="px-1 py-1 "> */}
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 ",
                                "text-gray-700 font-semibold px-4 py-2 text-sm"
                              )}
                            >
                              Signin as {username}
                            </span>
                          )}
                        </Menu.Item>
                        {/* </div> */}
                        <div>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 ",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Account Settings
                              </span>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Support
                              </span>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="submit"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full px-4 py-2 text-left text-sm"
                                )}
                                onClick={() => {
                                  logoutHandler();
                                }}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
      {!props?.forBusiness && (
        <div className={`h-12 grid grid-cols-4 gap-4 md:hidden`}>
          <div className="col-span-3">
            <SearchBar />
          </div>
          <DetectLocation />
        </div>
      )}
    </>
  );
};

export default Header;

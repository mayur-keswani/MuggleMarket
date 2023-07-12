import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useContext } from "react";
import { UserContext } from "../../../context/user-context";
import { clearLocalStorage } from "../../../lib/localStorage";
import { onLogout } from "../../../context/action-creators";

const UserAccountMenu = () => {
  const { globalState,dispatch } = useContext(UserContext);

  async function logoutHandler() {
    dispatch(onLogout());
    await clearLocalStorage();
  }
    const {
      auth: { isLoggedIn, username },
    } = globalState;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Menu as="div" className="relative inline-block text-left mx-5 ">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-dark">
            <svg
              className="absolute w-10 h-10 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
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
        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-gray-light ring-opacity-5 focus:outline-none bg-white  dark:bg-gray-dark dark:divide-gray-600">
          <Menu.Item>
            {({ active }) => (
              <span
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700 ",
                  "text-gray-700 font-semibold px-4 py-2 text-sm"
                )}
              >
                Signin as {username}
              </span>
            )}
          </Menu.Item>
          {/* </div> */}
          {/* <div> */}
          <Menu.Item>
            {({ active }) => (
              <span
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700 ",
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
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
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
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
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
          {/* </div> */}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserAccountMenu;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Menu } from "@headlessui/react";
import { getUserLocalLocation } from "../../../../lib/localStorage";
import { setUserLocationValue } from "../../../../context/action-creators";
import { UserContext } from "../../../../context/user-context";
// import { Button } from 'bootstrap'

const DetectLocation = () => {
  const {
    globalState: { location },
    dispatch,
  } = useContext(UserContext);

  const setIntialLocation = async () => {
    let userLocation = await getUserLocalLocation();
    if (userLocation && userLocation.city) {
      dispatch(setUserLocationValue(userLocation));
    }
  };
  useEffect(() => {
    setIntialLocation();
  }, []);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      axios
        .get(
          `https://us1.locationiq.com/v1/reverse.php?key=pk.726308e29885c04749be8ff916e042e1&lat=${lat}&lon=${long}&format=json`
        )
        .then((result) => {
          let city = result.data.address.state_district;
          console.log(result);
          let data = { lat, long, city };
          localStorage.setItem("location", JSON.stringify(data));
          dispatch(setUserLocationValue(data));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="flex justify-center items-center">
      <i className="px-1" color="red" size="20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#FF7E8B"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          aria-labelledby="icon-svg-title- icon-svg-desc-"
          role="img"
        >
          <title>location-fill</title>
          <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0 3 1.3 3 3s-1.3 3-3 3z"></path>
        </svg>
      </i>

      <Menu
        as="div"
        className={`hidden relative md:inline-block text-left mx-2 `}
      >
        <Menu.Button
          className="flex items-center justify-center w-full whitespace-nowrap gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 "
          type="button"
        >
          {location.city ? (
            <>
              <span>{location.city}</span>{" "}
              <span>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      setUserLocationValue({
                        lat: null,
                        long: null,
                        city: null,
                      })
                    );
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Remove</span>
                </button>
              </span>
            </>
          ) : (
            <span>Location</span>
          )}
        </Menu.Button>
        <Menu.Items className="absolute  bg-gray-dark dark:bg-black right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg  ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item
            className="block p-4 text-sm text-primary cursor-pointer"
            onClick={() => {
              fetchLocation();
            }}
          >
            <span>Detect You Current Location</span>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default DetectLocation;

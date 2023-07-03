import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Location.module.css";
import { Menu } from "@headlessui/react";
// import { Button } from 'bootstrap'

const DetectLocation = ({ isMobileView }) => {
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (localStorage.getItem("location")) {
      setLocation(JSON.parse(localStorage.getItem("location")));
    }
  });
  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log(latitude, longitude);
      axios
        .get(
          `https://us1.locationiq.com/v1/reverse.php?key=pk.726308e29885c04749be8ff916e042e1&lat=${latitude}&lon=${longitude}&format=json`
        )
        .then((result) => {
          let city = result.data.address.state_district;
          console.log(result.data.address);
          localStorage.setItem("location", JSON.stringify(city));
          console.log(city);
          setLocation(city);
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

      <Menu as="div" className={`hidden relative md:inline-block text-left mx-2 `}>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-white bg- px-3 py-2 text-sm font-semibold text-gray-900 ">
          Location
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item className="block px-4 py-2 text-sm text-primary">

              <a
                href="#"
              >
                Detect You Current Location
              </a>
            </Menu.Item>

          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default DetectLocation;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Message } from "semantic-ui-react";
import styles from "./Location.module.css";
// import { Button } from 'bootstrap'

const DetectLocation = () => {
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
  return (
    <div className={styles.locationWrapper}>
      <i className="sc-rbbb40-1 iFnyeo" color="#FF7E8B" size="20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#FF7E8B"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          aria-labelledby="icon-svg-title- icon-svg-desc-"
          role="img"
          className="sc-rbbb40-0 iRDDBk"
        >
          <title>location-fill</title>
          <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0 3 1.3 3 3s-1.3 3-3 3z"></path>
        </svg>
      </i>
      <input placeholder="Ahmedabad" className="sc-bDOcnW chtIrw" value="" />
      <i
        className="sc-rbbb40-1 iFnyeo sc-dUcZlc jWRoci"
        color="#4F4F4F"
        size="12"
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#4F4F4F" width="12" height="12" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 ezrcri">
            <title>down-triangle</title>
            <path d="M20 5.42l-10 10-10-10h20z"></path>
          </svg> */}
      </i>
      {/* <div className="sc-iNovjJ cbqhcE">
          <div className="sc-dCaJBF sc-cXHFlN jZWYCm">
            <div className="sc-dchYKM fJNHIt">
              <div className="sc-hAcydR gtZnFi">
                <i className="sc-rbbb40-1 iFnyeo" color="#EF4F5F" size="14">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#EF4F5F" width="14" height="14" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 kyPUnV"><title>current-location</title>
                  <path d="M13.58 10c0 1.977-1.603 3.58-3.58 3.58s-3.58-1.603-3.58-3.58c0-1.977 1.603-3.58 3.58-3.58v0c1.977 0 3.58 1.603 3.58 3.58v0zM20 9.52v0.96c0 0.265-0.215 0.48-0.48 0.48v0h-1.72c-0.447 3.584-3.256 6.393-6.802 6.836l-0.038 0.004v1.72c0 0.265-0.215 0.48-0.48 0.48v0h-0.96c-0.265 0-0.48-0.215-0.48-0.48v0-1.72c-3.575-0.455-6.375-3.262-6.816-6.802l-0.004-0.038h-1.74c-0.265 0-0.48-0.215-0.48-0.48v0-0.96c0-0.265 0.215-0.48 0.48-0.48v0h1.74c0.445-3.578 3.245-6.385 6.781-6.836l0.039-0.004v-1.72c0-0.265 0.215-0.48 0.48-0.48v0h0.96c0.265 0 0.48 0.215 0.48 0.48v0 1.72c3.584 0.447 6.393 3.256 6.836 6.802l0.004 0.038h1.72c0.265 0 0.48 0.215 0.48 0.48v0zM15.96 10c0-3.292-2.668-5.96-5.96-5.96s-5.96 2.668-5.96 5.96c0 3.292 2.668 5.96 5.96 5.96v0c3.292 0 5.96-2.668 5.96-5.96v0z"></path></svg>
                </i>
              </div>
              <p color="#EF4F5F" className="sc-1hez2tp-0 sc-eAyhxF iLWlIB">Detect current location</p>
            </div><p className="sc-1hez2tp-0 sc-eVrGFk bNyCmq">Using GPS</p>
          </div>
        </div> */}
    </div>
  );
};

export default DetectLocation;

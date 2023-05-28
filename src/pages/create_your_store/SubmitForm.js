import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Header, Icon, Segment, Image } from "semantic-ui-react";

import userContext from "../../context/user-context";
import { EDIT_STORE } from "../../context/action-types";
import { createStoreAPI, editStoreAPI } from "../../lib/market.api";

const SubmitForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [storeImage, setStoreImage] = useState("");
  const history = useHistory();
  const { globalState, dispatch } = useContext(userContext);
  const { token, editStoreKey, editStore } = globalState;

  useEffect(() => {
    if (editStoreKey) {
      setStoreImage(editStore.store_picture);
    }
  }, []);
  const submitFormHandler = async () => {
    const outletDetails = JSON.parse(localStorage.getItem("outletDetails"));
    const formData = new FormData();
    formData.append("description", outletDetails.description);
    formData.append("address", outletDetails.address);
    formData.append("storeName", outletDetails.storeName);
    formData.append("city", outletDetails.city);
    formData.append("openingTime", outletDetails.openingTime);
    formData.append("closingTime", outletDetails.closingTime);
    formData.append("contactNo", outletDetails.contactNo);
    formData.append("landlineNo", outletDetails.landlineNo);
    formData.append("ownerName", outletDetails.ownerName);
    formData.append("personalNo", outletDetails.personalNo);
    formData.append("storeType", outletDetails.storeType);
    formData.append("yearOfEstablishment", outletDetails.yearOfEstablishment);
    formData.append("personalWebsite", outletDetails.personalWebsite);
    formData.append("facebook", outletDetails.facebook);
    formData.append("instagram", outletDetails.instagram);
    formData.append("youtube", outletDetails.youtube);
    formData.append("storeImage", storeImage);
    console.log(formData.get("storeImage"));

    try {
      let response;
      if (editStoreKey) {
        response = await editStoreAPI(editStoreKey, formData);
        dispatch({ type: EDIT_STORE, payload: { id: null, store: null } });
      } else {
        response = await createStoreAPI(formData);
      }

      history.push("/");
    } catch (error) {}
  };

  let imageURL;
  if (typeof storeImage !== "string" && storeImage) {
    imageURL = URL.createObjectURL(storeImage);
  }

  return (
    <Segment placeholder>
      {errorMessage ? (
        <div className="text-center text-danger h3">{errorMessage}</div>
      ) : null}

      <Header icon>
        <Icon name="shopping bag" />
        Only One-step to Go 🚀
      </Header>
      <div className="text-center">
        <Image
          centered
          className="store_image rounded-circle"
          src={imageURL || storeImage}
        />
        <br />
        &nbsp;
        <input
          type="file"
          name="storeImage"
          onChange={(e) => setStoreImage(e.target.files[0])}
        />
        <p className="text-muted" style={{ fontSize: "1.5rem" }}>
          Store Image
        </p>
      </div>
      <Button primary onClick={submitFormHandler}>
        Proceed
      </Button>
    </Segment>
  );
};

export default SubmitForm;

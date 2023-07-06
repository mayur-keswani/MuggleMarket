import React, { useState } from "react";
import ModalWrapper from "../commons/modal-wrapper/ModalWrapper";
// import SubmitForm from "../../pages/create_your_store/SubmitForm";
import FormItem from "../commons/Input";

const OutletTimingsForm = () => {
  const [outletDetails, setOutletDetails] = useState({
    storeType: "",
    yearOfEstablishment: "",
    openingTime: "",
    closingTime: "",
    personalWebsite: "",
    instagram: "",
    facebook: "",
    youtube: "",
  });
  const [showConfirmBox, toggleConfirmBox] = useState(false);

  const submitFormHandler = () => {
    let prevDetails = JSON.parse(localStorage.getItem("outletDetails"));
    let newDetails = { ...prevDetails, ...outletDetails };
    localStorage.setItem("outletDetails", JSON.stringify(newDetails));

    toggleConfirmBox(true);
  };

  return (
    <form>
      {showConfirmBox && (
        <ModalWrapper
          isOpen={showConfirmBox}
          closeModal={() => toggleConfirmBox((prevState) => !prevState)}
          title=""
        >
          {/* <SubmitForm /> */}
        </ModalWrapper>
      )}
      <div className="mt-3">
        <p>Outlet Type & Timings</p>
        <span className="text-muted">Name, address, Location</span>
        <div>
          <div className="mb-4">
            <FormItem
              type="text"
              label="Story Type"
              placeholder="Store type (eg.Clothes,Cafe,Cosmetics)"
              value={outletDetails.storeType}
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  storeType: event.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <FormItem
              type="text"
              label="Establishment Date"
              placeholder="Your year of Establishment? (optional)"
              value={outletDetails.yearOfEstablishment}
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  yearOfEstablishment: event.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <FormItem
              type="time"
              label="Opening Time"
              placeholder="Opening time"
              value={outletDetails.openingTime}
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  openingTime: event.target.value,
                })
              }
            />
          </div>
          <FormItem
            type="time"
            label="Closing Time"
            placeholder="Closing time"
            value={outletDetails.closingTime}
            onChange={(event) =>
              setOutletDetails({
                ...outletDetails,
                closingTime: event.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="mt-3">
        <p>Social Links</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FormItem
              type="url"
              label="Personal Website"
              placeholder="eg: www.yourStore.com"
              value={outletDetails.personalWebsite}
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  personalWebsite: event.target.value,
                })
              }
            />
          </div>
          <div>
            <FormItem
              type="url"
              label="Instagram"
              placeholder="eg: https://www.instagram.com/yourName/"
              value={outletDetails.instagram}
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  instagram: event.target.value,
                })
              }
            />
          </div>
          <div>
            <FormItem
              type="url"
              label="Facebook"
              placeholder="eg: https://www.facebook.com/yourName"
              value={outletDetails.facebook}
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  facebook: event.target.value,
                })
              }
            />
          </div>
          <div>
            <FormItem
              type="url"
              label="Youtube"
              value={outletDetails.youtube}
              placeholder="eg: https://www.youtube.com/channelName"
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  youtube: event.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* <Button
        animated
        size="huge"
        className="my-5"
        color="blue"
        onClick={submitFormHandler}
      >
        <Button.Content visible>Create Store</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button> */}
    </form>
  );
};

export default OutletTimingsForm;

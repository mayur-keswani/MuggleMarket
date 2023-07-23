import React, { lazy, Suspense, useEffect, useState } from "react";
import Guide from "../../component/create-store/Guide";
import "./CreateStore.css";
import { createStoreAPI } from "../../lib/market.api";
const OutletInformationForm = lazy(() =>
  import("../../component/create-store/OutletInformationForm")
);
const OutletTimingsForm = lazy(() =>
  import("../../component/create-store/OutletTimingsForm")
);

const CreateStore = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [storeDetails, setStoreDetails] = useState({});
  const [isLoading,setIsLoading] = useState(false)

  const renderPrevForm = () => {
    setCurrentStep((prevState) => prevState - 1);
  };
  const onSubmitHandler = async(values) => {
    console.log(storeDetails)
    if (
      "storeImage" in values &&
      values["storeImage"].length &&
      values["storeImage"].length>0
    ) {
      values["storeImage"] = values.storeImage[0];
    }
    let updatedOutletDetails = {...storeDetails,...values}
    setStoreDetails(updatedOutletDetails);
    if (currentStep === 2) {
      const formData = new FormData();

      
      formData.append("name", updatedOutletDetails.storeName);
      formData.append("description", updatedOutletDetails.description);

      formData.append("location", {
        city: updatedOutletDetails.city,
        address: updatedOutletDetails.address,
      });

      formData.append("openingTime", updatedOutletDetails.openingTime);
      formData.append("closingTime", updatedOutletDetails.closingTime);
      formData.append("contactNo", updatedOutletDetails.contactNo);
      formData.append("landlineNo", updatedOutletDetails.landlineNo);
      formData.append("ownerName", updatedOutletDetails.ownerName);
      formData.append("personalNo", updatedOutletDetails.personalNo);
      formData.append("storeType", updatedOutletDetails.storeType);
      formData.append("yearOfEstablishment", updatedOutletDetails.yearOfEstablishment);

      formData.append("social", {
        site: updatedOutletDetails.personalWebsite,
        facebook: updatedOutletDetails.facebook,
        instagram: updatedOutletDetails.instagram,
        youtube: updatedOutletDetails.youtube,
      });
      formData.append("storeImage", updatedOutletDetails.storeImage);
      console.log(formData.get("storeImage"));
        try {
          let response;
          setIsLoading(true)
          if (false) {
            // response = await editStoreAPI(editStoreKey, formData);
            // dispatch({ type: EDIT_STORE, payload: { id: null, store: null } });
          } else {
            response = await createStoreAPI(formData);
          }
          setIsLoading(false)
          // navigate("/");
        } catch (error) {
          setIsLoading(false);
        }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const renderStoreForm = () => {
    if (currentStep === 1) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <div className="text-xl">Outlet Details</div>
            <hr />
            <OutletInformationForm
              storeDetails={storeDetails}
              onSubmit={onSubmitHandler}
            />
          </div>
        </Suspense>
      );
    } else if (currentStep === 2) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <div className="text-2xl">Outlet Details</div>
            <hr />

            <OutletTimingsForm
              storeDetails={storeDetails}
              onSubmit={onSubmitHandler}
              renderPrevForm={renderPrevForm}
              isLoading={isLoading}
            />
          </div>
        </Suspense>
      );
    }
    // else if (currentStep === 3) {
    //   return (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <OutletItemsForm
    //         storeDetails={storeDetails}
    //         onSubmit={onSubmitHandler}
    //         renderPrevForm={renderPrevForm}
    //       />
    //     </Suspense>
    //   );
    // }
  };

  return (
    <>
      <div className="grid grid-cols-1 m-3">
        <div className="create-store-guide">
          <Guide page={currentStep} />
        </div>
        <div className="create-store-form">{renderStoreForm()}</div>

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
      </div>
    </>
  );
};

export default CreateStore;

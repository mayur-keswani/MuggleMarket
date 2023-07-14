import React, { lazy, Suspense, useEffect, useState } from "react";
import Guide from "../../component/create-store/Guide";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateStore.css";
import { useForm } from "react-hook-form";
import FormItem from "../../component/commons/form-item";
const OutletInformationForm = lazy(() =>
  import("../../component/create-store/OutletInformationForm")
);
const OutletTimingsForm = lazy(() =>
  import("../../component/create-store/OutletTimingsForm")
);
const OutletItemsForm = lazy(() =>
  import("../../component/create-store/OutletItemsForm")
);

const CreateStore = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [storeDetails, setStoreDetails] = useState({});

  const renderPrevForm = () => {
    setCurrentStep((prevState) => prevState - 1);
  };
  const onSubmitHandler = (values) => {
    debugger;
    setStoreDetails((prevValues) => ({ ...prevValues, ...values }));
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      //TODO:
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
            />
          </div>
        </Suspense>
      );
    } else if (currentStep === 3) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <OutletItemsForm
            storeDetails={storeDetails}
            onSubmit={onSubmitHandler}
            renderPrevForm={renderPrevForm}
          />
        </Suspense>
      );
    }
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

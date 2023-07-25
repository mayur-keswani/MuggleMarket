import React, { lazy, Suspense, useEffect, useState } from "react";
// import Guide from "../../component/create-store/Guide";
import "./CreateStore.css";
import { createStoreAPI, editStoreAPI, fetchStoreDetailAPI } from "../../lib/market.api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../component/commons/spinner/Spinner";
const OutletInformationForm = lazy(() =>
  import("../../component/create-store/OutletInformationForm")
);
const OutletTimingsForm = lazy(() =>
  import("../../component/create-store/OutletTimingsForm")
);

const Guide = (props) => {
  const isCompleted = (step_no) => {
    if (step_no < props.page) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="sr-only text-xl dark">Steps</div>

      <div className="w-full">
        <ol className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 ">
          <li className="flex items-center md:justify-center gap-2 p-4">
            <svg
              className="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>

            <p className="leading-none">
              <strong className="block font-medium">Outlet Information </strong>
              <small className="mt-1">
                Store name, address, contact no.,owner details
              </small>
            </p>
          </li>

          <li className="relative flex items-center md:justify-center gap-2 bg-gray-50 p-4">
            <span className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50 sm:block"></span>

            <span className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white sm:block"></span>

            <svg
              className="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <p className="leading-none">
              <strong className="block font-medium">
                Outlet Type & Timings{" "}
              </strong>
              <small className="mt-1"> Establishment and Opening hours </small>
            </p>
          </li>

          {/* <li className="flex items-center md:justify-center gap-2 p-4">
            <svg
              className="h-7 w-7 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>

            <p className="leading-none">
              <strong className="block font-medium"> Upload Items </strong>
              <small className="mt-1">Store'items,product images. </small>
            </p>
          </li> */}
        </ol>
      </div>
    </div>
  );
};
const CreateStore = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [storeDetails, setStoreDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()

  const renderPrevForm = () => {
    setCurrentStep((prevState) => prevState - 1);
  };
  const onSubmitHandler = async (values) => {
    console.log(storeDetails);
    if (
      "picture" in values &&
      typeof values['picture'] !== 'string' &&
      values["picture"].length &&
      values["picture"].length > 0
    ) {
      values["picture"] = values.picture[0];
    }
    let updatedOutletDetails = { ...storeDetails, ...values };
    setStoreDetails(updatedOutletDetails);
    if (currentStep === 2) {
      const formData = new FormData();

      formData.append("name", updatedOutletDetails.name);
      formData.append("description", updatedOutletDetails.description);

      formData.append("city", updatedOutletDetails.city);
      formData.append("address", updatedOutletDetails.address);

      formData.append("openingTime", updatedOutletDetails.openingTime);
      formData.append("closingTime", updatedOutletDetails.closingTime);
      formData.append("contactNo", updatedOutletDetails.contactNo);
      formData.append("landlineNo", updatedOutletDetails.landlineNo);
      formData.append("ownerName", updatedOutletDetails.ownerName);
      formData.append("personalNo", updatedOutletDetails.personalNo);
      formData.append("storeType", updatedOutletDetails.storeType);
      formData.append(
        "yearOfEstablish",
        updatedOutletDetails.yearOfEstablish
      );

      formData.append("site", updatedOutletDetails.personalWebsite ?? "");
      formData.append("facebook", updatedOutletDetails.facebook ?? "");
      formData.append("instagram", updatedOutletDetails.instagram ?? "");
      formData.append("youtube", updatedOutletDetails.youtube ?? "");
      formData.append("picture", updatedOutletDetails.picture);
      try {
        let response;
        setIsLoading(true);
        if (id) {
          response = await editStoreAPI(id,formData);
          toast.success("Store Updated Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          response = await createStoreAPI(formData);
          toast.success("Store Created Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setIsLoading(false);
        navigate("/partner-with-us/my-stores");
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
  };

  const fetchStoreDetails = async (id) => {
    try {
      setIsFetchingDetails(true);
      const {
        data: { store },
      } = await fetchStoreDetailAPI(id);
      const {
        location: { address, city },
      } = store;
      store["picture"] = store?.picture ?? store?.storePicture;

      const {
        social: { site, facebook, youtube, instagram },
      } = store;

      delete store["social"];
      delete store["location"];
      setStoreDetails({
        ...store,
        address,
        city,
        site,
        facebook,
        youtube,
        instagram,
      });
      setIsFetchingDetails(false);
    } catch (error) {
      setIsFetchingDetails(false);

      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate(-1);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStoreDetails(id);
    }
  }, [id]);

  return (
    <div className="grid grid-cols-1 m-3">
      <div className="create-store-guide">
        <Guide page={currentStep} />
      </div>

      <div className="create-store-form w-full flex justify-center items-center">
        {isFetchingDetails ? (
          <Spinner size="large" />
        ) : currentStep === 1 ? (
          <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full">
              <div className="text-xl">Outlet Details</div>
              <hr />
              <OutletInformationForm
                storeDetails={storeDetails}
                onSubmit={onSubmitHandler}
              />
            </div>
          </Suspense>
        ) : (
          currentStep === 2 && (
            <Suspense fallback={<div>Loading...</div>}>
              <div className="w-full">
                <div className="text-2xl">Outlet Details</div>
                <hr />

                <OutletTimingsForm
                  storeDetails={storeDetails}
                  onSubmit={onSubmitHandler}
                  renderPrevForm={renderPrevForm}
                  isUpdateMode={!!id}
                  isLoading={isLoading}
                />
              </div>
            </Suspense>
          )
        )}
      </div>
    </div>
  );
};

export default CreateStore;

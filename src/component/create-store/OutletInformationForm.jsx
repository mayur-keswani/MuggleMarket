import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import FormItem from "../commons/form-item";

const OutletInformationForm = () => {
  const [outletDetails, setOutletDetails] = useState({
    storeName: "",
    description: "",
    city: "",
    address: "",
    contactNo: "",
    landlineNo: "",
    ownerName: "",
    personalNo: "",
  });

  const { globalState } = useContext(UserContext);
  const { editStoreKey, editStore } = globalState;

  useEffect(() => {
    if (editStoreKey) {
      console.log(editStoreKey);
      setOutletDetails({
        storeName: editStore.name || "",
        description: editStore.description || "",
        city: editStore.city || "",
        address: editStore.address || "",
        contactNo: editStore.contact_no || "",
        landlineNo: editStore.landline_no || "",
        ownerName: editStore.owner || "",
        personalNo: editStore.personal_no || "",
      });
    }
  }, []);
  const navigate = useNavigate();
  const submitFormHandler = () => {
    localStorage.setItem("outletDetails", JSON.stringify(outletDetails));
    navigate("/create-your-store/2");
  };

  return (
    <form>
      <div className="py-3">
        <p className="block">Store Details</p>
        <span className="text-muted ">Name, address, Location</span>
        <div className="mb-4">
          <FormItem
            type="text"
            placeholder="Store Name"
            value={outletDetails.storeName}
            onChange={(event) =>
              setOutletDetails({
                ...outletDetails,
                storeName: event.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <FormItem
            type="textarea"
            placeholder="Brief Description"
            value={outletDetails.description}
            onChange={(event) =>
              setOutletDetails({
                ...outletDetails,
                description: event.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <FormItem
            placeholder="City"
            type="text"
            value={outletDetails.city}
            onChange={(event) =>
              setOutletDetails({ ...outletDetails, city: event.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <FormItem
            type="textarea"
            placeholder="Store complete address"
            value={outletDetails.address}
            onChange={(event) =>
              setOutletDetails({
                ...outletDetails,
                address: event.target.value,
              })
            }
          />
        </div>
      </div>

      <div>
        <p>Contact number at store</p>
        <p className="text-muted ">
          Your customer will call on this number for general enquiries
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FormItem
              type="text"
              placeholder="Mobile number at store"
              value={outletDetails.contactNo}
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  contactNo: event.target.value,
                })
              }
            />
          </div>
          <div>
            <FormItem
              type="text"
              placeholder="landline number with std code"
              value={outletDetails.landlineNo}
              onChange={(event) =>
                setOutletDetails({
                  ...outletDetails,
                  landlineNo: event.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div>
        <p>Outlet owner details</p>
        <span className="text-muted ">
          These will be used to share revenue related communications
        </span>
        <div className="grid grid-cols-2 gap-2">
          <FormItem
            type="text"
            placeholder="Outlet owner fullname"
            value={outletDetails.ownerName}
            onChange={(event) =>
              setOutletDetails({
                ...outletDetails,
                ownerName: event.target.value,
              })
            }
          />
          <FormItem
            type="phone"
            placeholder="Personal no."
            value={outletDetails.personalNo}
            onChange={(event) =>
              setOutletDetails({
                ...outletDetails,
                personalNo: event.target.value,
              })
            }
          />
        </div>
      </div>
    </form>
  );
};

export default OutletInformationForm;

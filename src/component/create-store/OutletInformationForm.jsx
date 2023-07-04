import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";

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
      <div className="mb-4">
        <input
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
        <textarea
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
        <input
          placeholder="City"
          value={outletDetails.city}
          onChange={(event) =>
            setOutletDetails({ ...outletDetails, city: event.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <textarea
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
      <div className="text-xl">Contact number at store</div>
      <p className="text-slate-600">
        Your customer will call on this number for general enquiries
      </p>
      <div>
        <input
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
      <hr />
      Or want to share landline number
      <hr />
      <div>
        <input
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
      <div className="text-xl">Outlet owner details</div>
      <p className="text-slate-600">
        These will be used to share revenue related communications
      </p>
      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="Outlet owner fullname"
          value={outletDetails.ownerName}
          onChange={(event) =>
            setOutletDetails({
              ...outletDetails,
              ownerName: event.target.value,
            })
          }
        />
        <input
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
    </form>
  );
};

export default OutletInformationForm;

import React, { useState } from "react";
import MenuItems from "../menu-items/MenuItems";
import FormItem from "../commons/form-item";

const OutletItemsForm = () => {
  const [avgExpense, setAvgExpense] = useState("200");
  const submitFormHandler = (items) => {
    let prevDetails = JSON.parse(localStorage.getItem("outletDetails"));
    let newDetails = { ...prevDetails, items, avgExpense };
    console.log(newDetails);
    localStorage.setItem("outletDetails", JSON.stringify(newDetails));
  };
  // console.log(showConfirmBox)
  return (
    <form>
      <FormItem
        type="text"
        placeholder="Mobile number at store"
        label="Average Expense"
        value={avgExpense}
        onChange={(event) => setAvgExpense(event.target.value)}
      />

      <div
        className="menu-items-entry p-4 text-center overflow-x-scroll"
      >
        <div className="text">Add Items</div>
        <MenuItems submitForm={submitFormHandler} />
      </div>
    </form>
  );
};

export default OutletItemsForm;

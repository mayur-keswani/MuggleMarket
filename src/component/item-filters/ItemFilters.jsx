import React, { useContext, useState } from "react";
import { SET_SHOP_ITEMS } from "../../context/action-types";
import { UserContext } from "../../context/user-context";
import { GrClose } from "react-icons/gr";
import FormItem from "../commons/form-item";

const ItemFilters = ({ store }) => {
  const [state, setState] = useState({ activeItem: "Boys" });
  const { dispatch } = useContext(UserContext);

  const handleItemClick = (e, { name }) => {
    let filteredItems;
    if (name === "ALL") {
      filteredItems = store.store_items;
    } else {
      filteredItems = store.store_items.filter(
        (item) => item.filterType === name
      );
    }

    dispatch({ type: SET_SHOP_ITEMS, payload: filteredItems });
    setState({ activeItem: name });
  };
  const { activeItem } = state;

  const filterList = store.store_items.map((item) => item.filterType);
  const distinctFilter = filterList.filter(
    (filter, index) => filterList.indexOf(filter) === index
  );

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-4xl p-2">
        <div className="rounded-md px-2 py-6">
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="font-semibold">FILTER BY</span>
              <div className="flex flex-wrap m-2 space-x-2">
                <span className="flex items-center justify-center rounded-md bg-gray-dark px-3 py-1 font-medium">
                  Nike <GrClose className="ml-1 h-4 w-4 cursor-pointer" />
                </span>
                <span className="flex items-center justify-center rounded-md bg-gray-dark px-3 py-1 font-medium">
                  Nike <GrClose className="ml-1 h-4 w-4 cursor-pointer" />
                </span>
              </div>
            </div>
            <hr />
            <div className="mt-2">
              <ul
                className="w-full text-sm font-medium 
                  rounded-lg dark:border-gray-600"
              >
                <li
                  name="ALL"
                  active={activeItem === "ALL"}
                  onClick={handleItemClick}
                  className="w-full rounded-t-lg"
                >
                  <FormItem type="checkbox" label="All" />
                </li>

                {distinctFilter.map((filterType) => {
                  return (
                    <li
                      key={filterType}
                      name={filterType}
                      active={activeItem === filterType}
                      onClick={handleItemClick}
                    >
                      {filterType}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFilters;

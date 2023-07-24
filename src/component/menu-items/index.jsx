import React, { useState, useContext } from "react";
import { UserContext } from "../../context/user-context";
import { Skeleton } from "../commons/skeleton/card";
import AddItemToStoreModal from "../modals/AddItemToStoreModal";

const MenuItems = (props) => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const { globalState, dispatch } = useContext(UserContext);
  const { token, editStoreKey } = globalState;
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  // const addNewItemHandler = async () =>{
  //   await setItems((prevState)=>{
  //     return prevState.concat(menuItem)
  //   })
  // }

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="border border-gray-200 md:rounded-lg overflow-x-scroll">
      <AddItemToStoreModal
        isOpen={showAddItemModal}
        closeModal={() => {
          setShowAddItemModal(false);
        }}
      />

      <table className="w-full box-border divide-y divide-gray-200">
        <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-dark dark:text-gray-400">
          <tr scope="col" className="bg-gray-50">
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Items No.
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Product Image
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            ></th>
          </tr>
        </thead>

        <tbody>
          {items?.length == 0 ? (
            <tr className="border-b p-10">
              <td colSpan={6}>No Product Found</td>
            </tr>
          ) : (
            items.map((item) => {
              return (
                <tr key={item._id} className="border-b">
                  <td className="">{item._id}</td>
                  <td className="">{item.name}</td>
                  <td className="">{item.description}</td>
                  <td className="">{item.picture}</td>
                  <td className="">{item.price}</td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          <tr>
            <td
              className="text-xs text-gray-700 uppercase  dark:bg-gray-dark dark:text-gray-400"
              colSpan={6}
            >
              <button
                className="btn btn-primary p-3 w-full "
                onClick={() => {
                  setShowAddItemModal(true);
                }}
              >
                Add New Item
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MenuItems;

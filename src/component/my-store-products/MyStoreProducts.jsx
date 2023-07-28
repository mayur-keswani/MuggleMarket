import React, { useState, useContext } from "react";
import Spinner from "../commons/spinner/Spinner";

const MyStoreProducts = (props) => {
  return (
    <div className="border border-gray-200 md:rounded-lg overflow-x-scroll">
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

        <tbody className="">
          {props.isLoading ? (
            <Spinner />
          ) : props?.products?.length == 0 ? (
            <tr className="border-b p-10">
              <td colSpan={6}>No Product Found</td>
            </tr>
          ) : (
            props?.products.map((product) => {
              return (
                <tr key={product._id} className="border-b">
                  <td className="">{product._id}</td>
                  <td className="">{product.name}</td>
                  <td className="">{product.description}</td>
                  <td className="">{product.picture}</td>
                  <td className="">{product.price}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyStoreProducts;

import React, { useState, useContext } from "react";
import Spinner from "../commons/spinner/Spinner";
import FormItem from "../commons/form-item";
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";

const MyStoreProducts = (props) => {
  return (
    <div className="flex flex-col border border-gray-200 md:rounded-lg overflow-x-scroll">
      <div className="relative text-right">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineSearch/>
        </div>
        <FormItem
          type="text"
          id="table-search-users"
          placeholder="Search for Product"
        />
      </div>
      <table className="w-full box-border divide-y divide-gray-200">
        <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-dark dark:text-gray-400">
          <tr scope="col" className="bg-gray-50">
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Categories
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
            >
              Action
            </th>
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
                  <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      src={product.picture}
                      className="w-20 h-20 rounded-full object-contain"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">{product.name}</div>
                      <div className="font-normal text-gray-500">
                        {product.description}
                      </div>
                    </div>
                  </td>
                  <td className="">
                    {product.categories.length > 0
                      ? product?.categories
                          .map((prodCategory) => {
                            return props.categories.find(
                              (cat) =>
                                cat._id.toString() == prodCategory.toString()
                            ).name;
                          })
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td className="">{product.price}</td>
                  <td>
                    <div className="flex space-x-2">
                      <span
                        onClick={() => {
                          props.updateProduct(product);
                        }}
                      >
                        <AiFillEdit />
                      </span>
                      <span
                        className="cursor-pointer"
                        disabled={props.isDeleting}
                        onClick={() => {
                          props.deleteProduct(product._id);
                        }}
                      >
                        {props.isDeleting &&
                        props.deletingProductKey === product._id ? (
                          <Spinner />
                        ) : (
                          <AiFillDelete />
                        )}
                      </span>
                    </div>
                  </td>
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

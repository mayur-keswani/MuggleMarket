import React from "react";
import { GrClose } from "react-icons/gr";
import FormItem from "../commons/form-item";

const ProductCategories = ({
  selectedCategories,
  categories,
  updateSelectedCategories,
}) => {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-4xl p-2">
        <div className="rounded-md px-2 py-6">
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="font-semibold">Selected Categories</span>
              <div className="flex flex-wrap m-2 space-x-2">
                {selectedCategories.map((category) => (
                  <span className="flex items-center justify-center rounded-md bg-gray-dark px-3 py-1 font-medium">
                    {category.name}
                    <GrClose
                      className="ml-1 h-4 w-4 cursor-pointer"
                      onClick={() => {
                        updateSelectedCategories(category, false);
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
            <hr />
            <div className="mt-2">
              <ul
                className="w-full text-sm font-medium 
                  rounded-lg dark:border-gray-600"
                onClick={(e) => {
                  // console.log(e.target.checked)
                }}
              >
                {/* <li name="ALL" className="w-full rounded-t-lg">
                  <FormItem
                    type="checkbox"
                    label="All"
                    checked={filters.includes("All")}
                    onChange={(e) => {
                      updateSelectedCategories(
                        e.target.getAttribute("label"),
                        e.target.checked
                      );
                    }}
                  />
                </li> */}

                {categories.map((category) => {
                  return (
                    <FormItem
                      key={category._id}
                      type="checkbox"
                      label={category.name}
                      checked={
                        selectedCategories.findIndex(
                          (selCategory) => selCategory._id === category._id
                        ) !== -1
                      }
                      onChange={(e) => {
                        updateSelectedCategories(category, e.target.checked);
                      }}
                    />
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

export default ProductCategories;

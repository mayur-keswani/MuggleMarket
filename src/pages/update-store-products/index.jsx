import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddCategoryModal from "../../component/modals/AddCategoryModal";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import MenuItems from "../../component/menu-items";
import FormItem from "../../component/commons/form-item";

const UpdateStoreProducts = () => {
  const [categories, setCategories] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: props?.storeDetails,
  });
  return (
    <form onSubmit={handleSubmit(props?.onSubmit)}>
      <AddCategoryModal
        isOpen={showAddCategoryModal}
        closeModal={() => {
          setShowAddCategoryModal(false);
        }}
        onSubmit={(value) => {
          if (categories.find((category) => category.name == value.name)) {
            toast.error(`Category with this name already existed`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            setCategories((prevState) => prevState.concat(value));
            toast.success("New Category Added!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }}
      />
      <FormItem
        type="text"
        {...register("avgExpense", { required: true })}
        placeholder="Mobile number at store"
        label="Average Expense"
      />
      {errors?.storeName?.type === "required" && (
        <p className="error">Average expense is required!</p>
      )}

      <div className="menu-items-entry py-4 ">
        <div className="flex flex-col space-x-3 mb-3">
          <span className="font-semibold">Categories</span>
          <div className="flex flex-wrap m-2 space-x-2">
            {categories.map((category, index) => (
              <span
                key={categories.name + index}
                className="flex items-center justify-center rounded-md bg-gray-dark px-3 py-1 font-medium"
              >
                {category.name}
                <GrClose
                  className="ml-1 h-4 w-4 cursor-pointer"
                  onClick={() => {
                    setCategories((prevState) =>
                      prevState.filter((c) => c.name !== category.name)
                    );
                  }}
                />
              </span>
            ))}
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary text-center p-3 py-2 mx-3"
              onClick={() => {
                setShowAddCategoryModal(true);
              }}
            >
              Add Category
            </button>
          </div>
        </div>
        <div>
          <div className="font-semibold">Products</div>
          <MenuItems />
        </div>
      </div>

      <div className="flex items-center justify-center flex-row w-full mt-2">
        <button className="btn btn-outline-primary py-3 px-4" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default UpdateStoreProducts;

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-context";
import {
  addProductAPI,
  updateProductAPI,
} from "../../lib/market.api";
import { Controller, useForm } from "react-hook-form";
import ModalLayout from "../layout/ModalLayout";
import Spinner from "../commons/spinner/Spinner";
import { toast } from "react-toastify";
import FormItem from "../commons/form-item";
import ImageUploader from "../image-uploader/ImageUploader";
import { AiFillDelete } from "react-icons/ai";
import { Listbox } from "@headlessui/react";
import { data } from "autoprefixer";

const AddProductModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (props.data) {
      setValue("name", props.data.name);
      setValue("description", props.data.description);
      setValue("price", props.data.price);
      setValue("picture", props.data.picture);
      setValue("categories", props.data.categories);
    }
  }, [props.data]);
  const onSubmitHandler = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (typeof values.picture === "string") {
      formData.append("picture", values.picture);
    } else {
      formData.append("picture", values.picture[0]);
    }
    values.categories.forEach((cat) => {
      formData.append("categories[]", cat);
    });
    formData.append("price", values.price);
    try {
      setIsLoading(true);
      if (props.data) {
        const { data: result } = await updateProductAPI(
          props.data.storeID,
          props.data._id,
          formData
        );
      } else {
        const { data: result } = await addProductAPI(
          props.storeId,
          formData
        );
      }

      props.onSuccess && props.onSuccess();
      props.closeModal();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const picture = watch("picture");
  const imgSrc =
    typeof picture === "string"
      ? picture
      : picture && picture?.length > 0 && URL.createObjectURL(picture[0]);

  return (
    <ModalLayout
      title={"Add Item"}
      closeModal={props?.closeModal}
      isOpen={props?.isOpen}
    >
      <form
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="mb-4">
          <FormItem
            type="text"
            label="name"
            {...register("name", { required: true })}
          />

          {errors?.name?.type === "required" && (
            <p className="error">Item'Name is required</p>
          )}
        </div>

        <div className="mb-6">
          <FormItem
            label="Description"
            type="textarea"
            {...register("description", { required: true })}
          />
          {errors?.description?.type === "required" && (
            <p className="error">Description is required</p>
          )}
        </div>

        <div className="mb-6">
          <Controller
            control={control}
            name="categories"
            rules={{ required: true }}
            defaultValue={[]}
            render={({ field: { onChange, onBlur, value, name, ref } }) => {
              return (
                <FormItem
                  type="select"
                  label="Select Categories"
                  value={value ?? []}
                  onChange={(value) => {
                    setValue("categories", value);
                  }}
                  isMulti={true}
                  name={name}
                  ref={ref}
                  options={props.categories.map((category) => ({
                    label: category.name,
                    value: category._id,
                  }))}
                />
                // <Listbox
                //   as="div"
                //   value={selectedCategories}
                //   // {...register("category", { required: true })}
                //   onChange={setSeletedCategories}
                //   isMulti={true}
                //   onBlur={onBlur}
                //   name={name}
                //   ref={ref}
                //   // as="..."
                //   multiple
                // >
                //   {({ open }) => (
                //     <div className="relative">
                //       <Listbox.Button>
                //         {selectedCategories
                //           .map((category) => category.name)
                //           .join(", ")}
                //         <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                //           <svg
                //             className="h-5 w-5 text-gray-400"
                //             viewBox="0 0 20 20"
                //             fill="none"
                //             stroke="currentColor"
                //           >
                //             <path
                //               d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                //               strokeWidth="1.5"
                //               strokeLinecap="round"
                //               strokeLinejoin="round"
                //             />
                //           </svg>
                //         </span>
                //       </Listbox.Button>
                //       <Listbox.Options>
                //         {props.categories.map((category) => (
                //           <Listbox.Option key={category._id} value={category}>
                //             {category.name}
                //           </Listbox.Option>
                //         ))}
                //       </Listbox.Options>
                //     </div>
                //   )}
                // </Listbox>
              );
            }}
          />

          {errors?.categories?.type === "required" && (
            <p className="error">Item' Category is required</p>
          )}
        </div>

        <div className="mb-6">
          <FormItem
            label="Price"
            type="number"
            {...register("price", { required: true })}
          />
          {errors?.price?.type === "required" && (
            <p className="error">Item'Price is required</p>
          )}
        </div>

        <div className="mb-6">
          {imgSrc ? (
            <div className="flex items-center justify-center relative">
              <img
                className="rounded-xl object-cover"
                width={"200px"}
                height={"200px"}
                src={imgSrc}
              />
              <span className="opacity-0 hover:opacity-100 hover:flex hover:bg-gray-light hover:bg-opacity-30 absolute top-0 left-0 z-50 w-full h-full items-center justify-center ">
                <span
                  className="bg-primary rounded-full p-2"
                  onClick={() => {
                    setValue("picture", null);
                  }}
                >
                  <AiFillDelete />
                </span>
              </span>
            </div>
          ) : (
            <>
              <ImageUploader
                onChange={(files) => {
                  setValue("picture", files);
                }}
                {...register("picture", { required: true })}
              />
              {errors?.picture?.type === "required" && (
                <p className="error">Picture is required</p>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <button
            disabled={isLoading}
            className="btn btn-primary inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7"
            type="submit"
          >
            {isLoading && <Spinner />} {props.data ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddProductModal;

import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user-context";
import { uploadItemToStoreAPI } from "../../lib/market.api";
import { useForm } from "react-hook-form";
import ModalLayout from "../layout/ModalLayout";
import Spinner from "../commons/spinner/Spinner";
import { toast } from "react-toastify";
import FormItem from "../commons/form-item";

const AddItemToStoreModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("storeImage", values.picture);
    console.log(formData.get("storeImage"));
    formData.append("price", values.price);
    try {
      setIsLoading(true);
      const { data: result } = await uploadItemToStoreAPI(
        editStoreKey,
        formData
      );
      setItems((prevState) => {
        return prevState.concat(result.product);
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

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
            <p className="name">Item'Name is required</p>
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
          <FormItem
            label="Picture"
            type="file"
            {...register("picture", { required: true })}
          />
          {errors?.picture?.type === "required" && (
            <p className="error">Picture is required</p>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <button
            disabled={isLoading}
            className="btn btn-primary inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7"
            type="submit"
          >
            {isLoading && <Spinner />} Submit
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddItemToStoreModal;

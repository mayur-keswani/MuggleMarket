import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalLayout from "../layout/ModalLayout";
import Spinner from "../commons/spinner/Spinner";
import FormItem from "../commons/form-item";
import { addCategoryAPI, updateCategoryAPI } from "../../lib/market.api";

const AddCategoryModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (props.data) {
      setValue("name", props.data.name);
      setValue("description", props.data.description);
    }
  }, [props.data]);

  const onSubmitHandler = async (values) => {
    try {
      setIsLoading(true);
      if (props.data) {
        await updateCategoryAPI(props.storeId, props.data._id, {
          name: values.name,
          description: values.description,
        });
      } else {
        await addCategoryAPI(props.storeId, {
          name: values.name,
          description: values.description,
        });
      }
      await props.onSubmit(values);
      setIsLoading(false);

      props?.closeModal();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout
      title={"Add Category"}
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
        <div className="mb-4">
          <FormItem
            type="textarea"
            label="description"
            placeholder="Short description of what will this category contains"
            {...register("description", { required: false })}
          />
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

export default AddCategoryModal;

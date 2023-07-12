import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user-context";
import { useForm } from "react-hook-form";
import ModalLayout from "./ModalLayout";
import { onLogin } from "../../context/action-creators";
import Spinner from "../commons/spinner/Spinner";
import { signupAPI } from "../../lib/market.api";
import { toast } from "react-toastify";
import FormItem from "../commons/form-item";

const SignupModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { dispatch } = useContext(UserContext);

  const onSubmitHandler = async (values) => {
    try {
      setIsLoading(true);
      const { username, email, password } = values;
      setIsLoading(true);
      const { data: result } = await signupAPI({ username, email, password });
      setIsLoading(false);
      const expiresIN = new Date(new Date().getTime() + 3600000);
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("username", JSON.stringify(result.username));
      localStorage.setItem("expiresIn", expiresIN.toISOString());

      dispatch(onLogin({ token: result.token, username: result.username }));
      toast.success("SignUp Successfull !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      props.closeModal();
    } catch (error) {
      console.log(error?.response);
      if (error && error?.response && error?.response?.data) {
        toast.error(error.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setIsLoading(false);
    }
  };
  return (
    <ModalLayout
      title={"Sign Up"}
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
            label="Username"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors?.username?.type === "required" && (
            <p className="error">Username is required</p>
          )}
        </div>
        <div className="mb-4">
          <FormItem
            type="text"
            label="Email"
            placeholder="email"
            {...register("email", { required: true })}
          />

          {errors?.email?.type === "required" && (
            <p className="error">Email is required</p>
          )}
        </div>

        <div className="mb-6">
          <FormItem
            type="password"
            label="Password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          {errors?.password?.type === "required" && (
            <p className="error">Password is required</p>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <button
            disabled={isLoading}
            className="btn btn-primary inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7"
            type="submit"
          >
            {isLoading && <Spinner />} Sign Up
          </button>
          <a
            className="inline-block text-right align-baseline font-bold text-sm hover:text-blue-800 w-full md:w-1/2"
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        <div className="mt-3 space-y-3">
          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 px-3.5 py-2.5 font-semibold transition-all duration-200 focus:outline-none"
          >
            <span className="mr-2 inline-block">
              <svg
                className="h-6 w-6 text-rose-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
            </span>
            Sign in with Google
          </button>
          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-40 px-3.5 py-2.5 font-semibold transition-all duration-200 focus:outline-none"
          >
            <span className="mr-2 inline-block">
              <svg
                className="h-6 w-6 text-[#2563EB]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
              </svg>
            </span>
            Sign in with Facebook
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default SignupModal;

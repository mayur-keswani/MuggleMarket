import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user-context";
import { useForm } from "react-hook-form";
import ModalLayout from "./ModalLayout";
import { onLogin } from "../../context/action-creators";
import Spinner from "../commons/spinner/Spinner";
import { signupAPI } from "../../lib/market.api";
import { toast } from "react-toastify";

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
      const { username, email, password } = values
      setIsLoading(true)
      const { data: result } = await signupAPI({ username, email, password });
      setIsLoading(false);
      const expiresIN = new Date(new Date().getTime() + 3600000);
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("username", JSON.stringify(result.username));
      localStorage.setItem("expiresIn", expiresIN.toISOString());

      dispatch(onLogin({ token: result.token, username: result.username }));
      toast.success("SignUp Successfull !", {
        position: toast.POSITION.TOP_RIGHT
      });
      props.closeModal();
    } catch (error) {
      console.log(error?.response)
      if (error && error?.response && error?.response?.data) {
        toast.error(error.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="Username"
          >
            Username
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="username"
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors?.username?.type === "required" && (
            <p className="error">Username is required</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="email"
            type="text"
            placeholder="email"
            {...register("email", { required: true })}
          />
          {errors?.email?.type === "required" && (
            <p className="error">Email is required</p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="password"
            type="password"
            placeholder="******************"
            {...register("password", { required: true })}
          />
          {errors?.password?.type === "required" && (
            <p className="error">Password is required</p>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <button
            disabled={isLoading}
            className="bg-primary text-white font-bold w-full md:w-1/2   py-2  rounded focus:outline-none focus:shadow-outline wrap"
            type="submit"
          >
            {isLoading && <Spinner />} Sign Up
          </button>
          <a
            className=" inline-block text-right align-baseline font-bold text-sm text-[color:var(--primary)] hover:text-blue-800 w-full md:w-1/2"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 my-2" />
        <span className="block text-center">Or</span>

        <div className="flex items-center justify-center py-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign-up with Google +
          </button>
        </div>


      </form>
    </ModalLayout>
  );
};

export default SignupModal;

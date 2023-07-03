import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user-context";
import { loginAPI } from "../../lib/market.api";
import { useForm } from "react-hook-form";
import ModalLayout from "./ModalLayout";
import { onLogin } from "../../context/action-creators";
import Spinner from "../commons/spinner/Spinner";
import { data } from "autoprefixer";
import { toast } from "react-toastify";

const LoginModal = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { dispatch } = useContext(UserContext);


  const onSubmitHandler = async (values) => {
    try {
     
      console.log(values)
      // setIsLoading(true)
      const { email, password } = values
      setIsLoading(true)
      const { data: result } = await loginAPI({ email, password });
      console.log(data)
      setIsLoading(false)
      const expiresIN = new Date(new Date().getTime() + 3600000)?.toISOString();
      localStorage.setItem('auth',JSON.stringify({token:result?.tolken,username:result?.username,expiresIN}))
      // localStorage.setItem("token", JSON.stringify(result.token));
      // localStorage.setItem("username", JSON.stringify(result.username));
      // localStorage.setItem("expiresIn", expiresIN);

      const { token, username } = result
      dispatch(onLogin({ token, username }));
      toast.success("Login Successfull !", {
        position: toast.POSITION.TOP_RIGHT
      });
      props.closeModal();
    } catch (error) {
      if (error && error?.response && error?.response?.status == '401') {
        toast.error(error.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        }); 
      }
      console.log(error)
      setIsLoading(false)
    }
  };

  return (
    <ModalLayout title={'Login'} closeModal={props?.closeModal} isOpen={props?.isOpen}>
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmitHandler)} >

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="email"
            type="text"
            placeholder="email"
            {...register('email', { required: true })} />
          {errors?.email?.type === "required" && <p className="error">Email is required</p>}
        </div>


        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="password"
            type="password" placeholder="******************"
            {...register('password', { required: true })} />
          {errors?.password?.type === "required" && <p className="error">Password is required</p>}
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <button
            disabled={isLoading}
            className="bg-primary text-white font-bold w-full md:w-1/2   py-2  rounded focus:outline-none focus:shadow-outline wrap"
            type="submit">
            {isLoading && <Spinner />} Sign In
          </button>
          <a className=" inline-block text-right align-baseline font-bold text-sm text-[color:var(--primary)] hover:text-blue-800 w-full md:w-1/2" href="#">
            Forgot Password?
          </a>
        </div>
        <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 my-2" />
        <span className="block text-center">Or</span>

        <div className="flex items-center justify-center py-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign-in with Google +</button>
        </div>

      </form>
    </ModalLayout>
  );
  // <Form>
  //   {loginWithEmail ? (
  //     <>
  //       {errorMessage ? (
  //         <div className="text-center h3 text-danger">{errorMessage}</div>
  //       ) : (
  //         ""
  //       )}
  //       <Form.Group widths="equal">
  //         <Form.Field>
  //           <Input
  //             icon="mail"
  //             placeholder="Email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //         </Form.Field>
  //       </Form.Group>
  //       <Form.Group widths="equal">
  //         <Form.Field>
  //           <Input
  //             placeholder="Password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //         </Form.Field>
  //       </Form.Group>
  //       <Button
  //         fluid
  //         basic
  //         size="large"
  //         content="Submit"
  //         onClick={onLoginHandler}
  //       />
  //     </>
  //   ) : (
  //     <>
  //       <Form.Group widths="equal">
  //         <Form.Field>
  //           <Input
  //             icon="phone"
  //             iconposition="left"
  //             placeholder="Phone number"
  //             value={phoneNo}
  //             onChange={(e) => setPhoneNo(e.target.value)}
  //           />
  //         </Form.Field>
  //       </Form.Group>
  //       <Button fluid type="submit" size="huge">
  //         Send OTP
  //       </Button>
  //       <Divider horizontal>Or</Divider>
  //       <Button
  //         fluid
  //         basic
  //         size="large"
  //         content="Continue with Email"
  //         icon="mail"
  //         iconposition="left"
  //         onClick={() => setEmailPrefernce(true)}
  //       />
  //       <br />
  //       <Button
  //         fluid
  //         basic
  //         size="large"
  //         content="Continue with Google"
  //         icon="google"
  //         iconposition="left"
  //       />
  //       <Divider />
  //       <div className="d-flex">
  //         <h3>
  //           <b>New to MuggleMarket? </b>
  //         </h3>
  //         <span className="text-muted"> Create account</span>
  //       </div>
  //     </>
  //   )}
  // </Form>
};

export default LoginModal;

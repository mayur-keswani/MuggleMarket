import React from "react";
import { Link } from "react-router-dom";
import createListing from "./images/create_listing.svg";
import register from "./images/register_online.svg";
import receiveOrder from "./images/order_online.svg";
import "./PartnerWithUs.css";
const PartnerWithUs = () => (
  <>
    <div className="zumbotron h-[420px] flex items-center justify-start flex-col relative" style={{
      background: "linear-gradient(rgba(0, 0, 0, 0) 57.17%, rgba(0, 0, 0, 0.46) 100%), rgba(0, 0, 0, 0.3)",
    }}>
      <div className="w-full h-full absolute top-0 left-0">
        <img
          alt="web-backdrop"
          src="https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          loading="lazy"
          className="w-full h-full object-cover transform-none opacity-100 transition-opacity"
        ></img>
      </div>
      <div
        className="absolute top-1/3  left-0 w-full  py-4  px-6 font-bold"

      >
        <span className="text-3xl">Partner with MugggleMarket</span>
        <p className="text-2xl ">for free and get more customers!</p>
        <div className="flex justify-center items-center p-2 mt-3 h-16 ">
          <button className="bg-primary hover:bg-secondary  rounded w-44 lg:w-1/5 h-full"> Register your Store </button>
        </div>
      </div>
    </div>

    <div className="text-center p-5">
      <span className="text-2xl block font-semibold">Why should you partner with MuggleMarket?</span>
      <span className="text-slate-500 ">
        MuggleMarket enables you to get 60% more revenue, 10x new customers{" "}
        <br />
        and boost your brand visibility by providing insights to improve your
        businenss.
      </span>
    </div>

    <div className="text-center p-5">
      <span className="text-2xl block font-semibold">How it works?</span>
      <div className="relative grid grid-cols-1 md:grid-cols-3  gap-2 shadow-lg">

        <div className="bg-white dark:bg-slate-800 px-2 py-4 flex items-center justify-center flex-col  rounded-md">
          <div className="w-full flex items-center justify-center rounded-3xl">
            <img
              src="https://b.zmtcdn.com/merchant-onboarding/ecb5e086ee64a4b8b063011537be18171600699886.png"
              height="64px" width="64px" alt="how-it-works"
              className="object-contain"></img>
          </div>
          <div className="font-semibold text-xl mt-1">Step 1</div>
          <div className="p-2">
            <div className="font-semibold mt-1">Create your page on MuggleMarket</div>
            <div className="text-slate-500"> Help users discover your place by creating a listing on MuggleMarket</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 px-2 py-4 flex items-center justify-center flex-col  rounded-md">
          <div className="w-full flex items-center justify-center rounded-3xl">
            <img
              src="https://b.zmtcdn.com/merchant-onboarding/71d998231fdaeb0bffe8ff5872edcde81600699935.png"
              height="64px" width="64px" alt="how-it-works"
              className="object-contain"></img>
          </div>
          <div className="font-semibold text-xl mt-1">Step 2</div>
          <div className="p-2">
            <div className="font-semibold mt-1">Register for online ordering</div>
            <div className="text-slate-500"> And deliver orders to millions of customers with ease</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 px-2 py-4 flex items-center justify-center flex-col  rounded-md">
          <div className="w-full flex items-center justify-center rounded-3xl">
            <img
              src="https://b.zmtcdn.com/merchant-onboarding/efdd6ac0cd160a46c97ad58d9bbd73fd1600699950.png"
              height="64px" width="64px" alt="how-it-works"
              className="object-contain"></img>
          </div>
          <div className="font-semibold text-xl mt-1">Step 3</div>
          <div className="p-2">
            <div className="font-semibold mt-1">Start receiving orders online</div>
            <div className="text-slate-500"> Manage orders on our partner app, web dashboard or API partners</div>
          </div>
        </div>



      </div>
    </div>
  </>
  // <>
  //   <div className="zumbotron">
  //     <div className="m-2 h1">Partner with Muggle-Market</div>
  //     <p className="h5 mx-3 text-lead">for free and get more customers!</p>
  //     <div>
  //       <Button
  //         as={Link}
  //         to="/create-your-store/1"
  //         positive
  //         size="large"
  //         className="mx-3 px-5"
  //       >
  //         Register Your Store
  //       </Button>
  //     </div>
  //   </div>
  //   <div className="text-center p-5">
  //     <h1>Why should you partner with MuggleMarket?</h1>
  //     <p className="text-muted  h5">
  //       MuggleMarket enables you to get 60% more revenue, 10x new customers{" "}
  //       <br />
  //       and boost your brand visibility by providing insights to improve your
  //       businenss.
  //     </p>
  //   </div>
  //   <Segment className="how-it-works">
  //     <Header as="h2" textAlign="center">
  //       <Icon name="settings" />
  //       How it works?
  //     </Header>
  //     <Step.Group widths={3}>
  //       <Step active className="working-steps">
  //         <img
  //           src={createListing}
  //           width="150px"
  //           alt="create-listing on muggle-market"
  //         />
  //         <Step.Content className="m-3">
  //           <Step.Title>Create your page on Zomato</Step.Title>
  //           <Step.Description>
  //             Help users discover your place by creating a listing on Zomato
  //           </Step.Description>
  //         </Step.Content>
  //       </Step>
  //       <Step active className="working-steps">
  //         <Step.Content className="m-3">
  //           <img src={register} width="150px" alt="register your store" />
  //           <Step.Title>Register for online ordering</Step.Title>
  //           <Step.Description>
  //             And deliver orders to millions of customers with ease
  //           </Step.Description>
  //         </Step.Content>
  //       </Step>
  //       <Step active className="working-steps">
  //         <Step.Content className="m-3">
  //           <img
  //             src={receiveOrder}
  //             width="150px"
  //             alt="start-receiving-orders"
  //           />
  //           <Step.Title>Start receiving orders online</Step.Title>
  //           <p>
  //             Manage orders on our partner app,
  //             <br /> web dashboard or API partners
  //           </p>
  //         </Step.Content>
  //       </Step>
  //     </Step.Group>
  //   </Segment>
  //   {/* <Footer/> */}
  // </>
);

export default PartnerWithUs;

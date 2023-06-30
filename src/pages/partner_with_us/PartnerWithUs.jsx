import React from "react";
import { Link } from "react-router-dom";
import createListing from "./images/create_listing.svg";
import register from "./images/register_online.svg";
import receiveOrder from "./images/order_online.svg";
import "./PartnerWithUs.css";
const PartnerWithUs = () => {
  return (
    <>
      <div className="zumbotron h-[420px] flex items-center justify-start flex-col relative">
        <div className="w-full h-full absolute top-0 left-0">
          <img
            alt="web-backdrop"
            src="https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            loading="lazy"
            className="w-full h-full object-cover transform-none opacity-100 transition-opacity"
          ></img>
        </div>
        <div
          className="absolute sm:top-0 left-[50%] md:bottom-[74px] h-full w-full -translate-x-1/2 "
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0) 57.17%, rgba(0, 0, 0, 0.46) 100%), rgba(0, 0, 0, 0.3)",
          }}
        >
          <span className="h-11">Partner with MugggleMarket</span>
          <p className="h5 mx-3">for free and get more customers!</p>
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
};

export default PartnerWithUs;

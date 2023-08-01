import React from "react";
import ModalLayout from "../layout/ModalLayout";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const AfterPaymentStatusModal = (props) => {
  const navigate = useNavigate();
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  return (
    <ModalLayout
      title={"Payment Status"}
      closeModal={props?.closeModal}
      isOpen={props?.isOpen}
    >
      {props?.status.isSuccess && (
        <Confetti width={screenWidth} height={screenHeight} />
      )}
      <div className="flex flex-col justify-center">
        {props?.status.isSuccess ? (
          <div className="text-center p-4">
            <p className="text-xl">Order Placed Successfully!</p>
          </div>
        ) : props?.status.isFailed ? (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <p className="text-xl">Couldn't able to place your Order!</p>
            <p className="text-muted">Try again after some time</p>
          </div>
        ) : null}
        <button
          className="btn btn-primary p-3 m-4"
          onClick={() => navigate("/")}
        >
          Continue Shopping!
        </button>
      </div>
    </ModalLayout>
  );
};

export default AfterPaymentStatusModal;

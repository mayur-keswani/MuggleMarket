import React, { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";

const ModalLayout = (props) => {
  return (
    <Dialog
      open={props?.isOpen}
      onClose={() => props.closeModal()}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-white dark:bg-gray-dark">
          <Dialog.Title className="flex items-start justify-between p-4 rounded-t ">
            <span className="text-2xl font-bold leading-tight sm:text-3xl">
              {props?.title}
            </span>
            <button
              type="button"
              onClick={() => {
                props.closeModal();
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </Dialog.Title>
          <div className="w-full ">
            {props?.children}
            <p className="text-center text-gray-500 text-xs">
              &copy;2023 MuggleMarket
            </p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalLayout;

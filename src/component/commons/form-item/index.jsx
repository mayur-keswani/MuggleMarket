import { Listbox } from "@headlessui/react";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormItem = (props, ref) => {
  switch (props?.type) {
    case "text":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
            ref={ref}
          />
        </>
      );
    case "select":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={props?.name}
            >
              {props?.label}
            </label>
          )}

          <Listbox as="div" ref={ref} multiple {...props}>
            {({ open }) => (
              <div className="relative w-full rounded-md shadow-sm">
                <Listbox.Button
                  className={`relative flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
                    props?.className}`}
                >
                  {props.value ? (
                    <span>
                      {typeof props.value === "string"
                        ? props.value
                        : props.options
                            .filter((option) =>
                              props.value.includes(option.value)
                            )
                            .map((option) => option.label)
                            .join(", ")}
                    </span>
                  ) : (
                    <span className="block truncate">
                      {" "}
                      {props?.placeholder ?? ""}{" "}
                    </span>
                  )}

                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Listbox.Options className="max-h-[100px] overflow-y-auto rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                  {props.options.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      value={option.value}
                      className={`p-2 bg-gray-light dark:bg-black ${
                        props.value.includes(option.value)
                          ? "text-primary"
                          : " text-black dark:text-white"
                      } `}
                    >
                      {option.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
          {/* <select
            id="countries"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, options, ...o }) => o)(props)}
            ref={ref}
          >
            {props.options.map((option, index) => (
              <option value={option.value} key={option.value + index}>
                {option.label}
              </option>
            ))}
          </select> */}
        </>
      );

    case "checkbox":
      return (
        <div class="flex items-center pl-3">
          <input
            type="checkbox"
            className="w-6 h-6 rounded"
            {...(({ className, ...o }) => o)(props)}
            ref={ref}
          />
          <label
            htmlFor="vue-checkbox"
            className="w-full py-3 ml-2 text-sm font-medium leading-none"
          >
            {props?.label}
          </label>
        </div>
      );
    case "phone":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            type="phone"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
            ref={ref}
          />
          {/* <PhoneInput
            country={"us"}
            
            inputProps={{...props}}
          /> */}
        </>
      );
    case "textarea":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={props?.name}
            >
              {props?.label}
            </label>
          )}
          <textarea
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
            ref={ref}
          ></textarea>
        </>
      );

    case "time":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={props?.name}
            >
              {props?.label}
              ref={ref}
            </label>
          )}
          <input
            type="time"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
            ref={ref}
          />
        </>
      );

    case "url":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            type="url"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
            ref={ref}
          />
        </>
      );
    case "file":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            type="file"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
            ref={ref}
          />
        </>
      );

    default:
      return (
        <>
          {props?.label && (
            <label
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
            ref={ref}
          />
        </>
      );
  }
};

export default React.forwardRef(FormItem);

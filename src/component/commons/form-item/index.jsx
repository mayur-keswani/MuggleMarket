import React from "react";

const FormItem = (props) => {
  switch (props?.type) {
    case "text":
      return (
        <>
          {props?.label && (
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
          />
        </>
      );
    case "phone":
      return (
        <>
          {props?.label && (
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            type="phone"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
          />
        </>
      );
    case "textarea":
      return (
        <>
          {props?.label && (
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <textarea
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
          ></textarea>
        </>
      );

    case "time":
      return (
        <>
          {props?.label && (
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            type="time"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
          />
        </>
      );
    case "phone":
      return (
        <>
          {props?.label && (
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            type="phone"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
          />
        </>
      );

    case "url":
      return (
        <>
          {props?.label && (
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            type="url"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
          />
        </>
      );
    case "file":
      return (
        <>
          {props?.label && (
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            type="file"
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
          />
        </>
      );

    default:
      return (
        <>
          {props?.label && (
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark${props?.className &&
              props?.className}`}
            {...(({ className, ...o }) => o)(props)}
          />
        </>
      );
  }
};

export default FormItem;

import React from "react";

const FormItem = (props,ref) => {
  switch (props?.type) {
    case "text":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
            >
              {props?.label}
            </label>
          )}
          <input
            className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark ${props?.className &&
              props?.className}`}
            {...(props)}
            ref={ref}
          />
        </>
      );
    case "phone":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
            ref={ref}
          />
        </>
      );
    case "textarea":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for={props?.name}
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
              for={props?.name}
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
    case "phone":
      return (
        <>
          {props?.label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
              for={props?.name}
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

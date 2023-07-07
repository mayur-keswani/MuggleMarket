import React, { lazy, Suspense } from "react";
import Guide from "../../component/create-store/Guide";
import { useParams } from "react-router-dom";
import "./CreateStore.css";
const OutletInformationForm = lazy(() =>
  import("../../component/create-store/OutletInformationForm")
);
const OutletTimingsForm = lazy(() =>
  import("../../component/create-store/OutletTimingsForm")
);
const OutletItemsForm = lazy(() =>
  import("../../component/create-store/OutletItemsForm")
);

const CreateStore = () => {
  const { page } = useParams();

  const InputForm = () => {
    if (+page === 1) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <main>
            <div className="text-xl">Outlet Details</div>
            <hr />

            <OutletInformationForm />
          </main>
        </Suspense>
      );
    } else if (+page === 2) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <main>
            <div className="text-2xl">Outlet Details</div>
            <hr />

            <OutletTimingsForm />
          </main>
        </Suspense>
      );
    } else if (+page === 3) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <OutletItemsForm />
        </Suspense>
      );
    }
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col m-3">
        <div className="create-store-guide">
          <Guide page={page} />
        </div>
        <div className="create-store-form">{InputForm()}</div>
        <div className="flex items-center justify-around flex-row w-full mt-2">
          <button className="btn btn-outline py-3 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2 h-4 w-4"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Previous
          </button>
          <button className="btn btn-outline py-3 px-4">
            Next{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2 h-4 w-4"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
        {/* <Button
        animated
        size="huge"
        className="my-5"
        color="blue"
        onClick={submitFormHandler}
      >
        <Button.Content visible>Create Store</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button> */}
      </div>
    </>
  );
};

export default CreateStore;

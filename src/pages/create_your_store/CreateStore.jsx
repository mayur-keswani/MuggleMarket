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
    }
    else if (+page === 3) {
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
      </div>
    </>
  );
};

export default CreateStore;

import React, { useEffect, useState, useContext } from "react";
import Store from "../../component/store/Store";
import { UserContext } from "../../context/user-context";
import { SET_LOADING } from "../../context/action-types";
// import { Header, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../component/commons/skeleton/card";
import { fetchStoresAPI } from "../../lib/market.api";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const { globalState, dispatch } = useContext(UserContext);
  const { isLoading } = globalState;

  const fetchStores = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const { data } = await fetchStoresAPI();
      setStores(data.stores);
      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  useEffect(() => {
    fetchStores();
    return () => {
      setStores([]); // This worked for me
    };
  }, []);

  return (
    <main className="m-2 min-h-[400px]">
      {isLoading ? (
        <Skeleton items={4} />
      ) : stores.length ? (
        <>
          <h2 className="mx-4 text-muted">Top brands in spotlight</h2>
          <div className="row mt-3 ">
            {stores.map((store) => (
              <div
                className="col-lg-2 col-md-4 col-6 d-flex justify-content-center"
                key={store._id}
              >
                <Store store={store} />
              </div>
            ))}
          </div>
          <div
            className="m-4 p-4 bg-light"
            style={{ border: "2px dotted black" }}
          >
            <div className="m-2 h2">Partner with Muggle-Market</div>
            <p className="h5 mx-3 text-lead">
              for free and get more customers!
            </p>
            <div>
              <Button
                as={Link}
                to="/partner_with_us"
                positive
                size="large"
                className="mx-3 px-5"
              >
                Register Your Store
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex align-middle items-center justify-center font-bold">
          {" "}
          No Stores Found Near By...
        </div>
      )}
    </main>
  );
};

export default Stores;

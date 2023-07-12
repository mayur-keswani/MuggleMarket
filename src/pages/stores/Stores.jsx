import React, { useEffect, useState, useContext } from "react";
import Store from "../../component/store/Store";
// import { Header, Image, Button } from "semantic-ui-react";
import { Skeleton } from "../../component/commons/skeleton/card";
import { fetchStoresAPI } from "../../lib/market.api";
import StoreImage from "./store.png";
import { useNavigate } from "react-router-dom";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchStoresAPI();
      setStores(data.stores);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
    return () => {
      setStores([]); 
    };
  }, []);

  return (
    <main className="m-2 min-h-[400px]">
      {stores?.length === 0 ? (
        <div className="flex align-middle items-center justify-center flex-col">
          <img src={StoreImage} alt={"No Store"} />
          <span className="text-xl font-extralight text-gray-600">
            Oops!, No Stores Found!{" "}
          </span>
        </div>
      ) : (
        <div>
          <div className="text-2xl mx-4 text-muted">
            Top brands in spotlight
          </div>
          {isLoading ? (
            <Skeleton items={5} />
          ) : (
            <div className="flex overflow-x-auto space-x-8  my-3 mx-5 box-border">
              {stores.map((store) => (
                <div
                  className="flex-shrink-0 flex min-w-[300px]"
                  key={store._id}
                  onClick={() => navigate(`/store/${store?._id}`)}
                >
                  <Store store={store} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Stores;

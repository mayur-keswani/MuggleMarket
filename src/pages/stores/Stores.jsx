import React, { useEffect, useState, useContext } from "react";
import Store from "../../component/store/Store";
// import { Header, Image, Button } from "semantic-ui-react";
import { Skeleton } from "../../component/commons/skeleton/card";
import { fetchStoresAPI } from "../../lib/market.api";
import StoreImage from "../../public/store.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { setStores } from "../../context/action-creators";

const Stores = () => {
  const [filteredStores, setFilteredStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    globalState: { searchedStore,stores },
    dispatch,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchStoresAPI();
      setFilteredStores(data.stores);
      dispatch(setStores(data.stores));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
    return () => {
      setFilteredStores([]);
    };
  }, []);

  useEffect(() => {
    if (searchedStore) {
      setFilteredStores((prevValue) => {
        return prevValue.filter((store) => store.name.includes(searchedStore));
      });
    } else {
      setFilteredStores(stores)
    }
  }, [searchedStore]);

  return (
    <div className="pt-6 px-4">
      {isLoading ? (
        <Skeleton items={5} />
      ) : filteredStores?.length === 0 ? (
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

          <div className="flex overflow-x-auto space-x-8  my-3 mx-5 box-border">
            {filteredStores.map((store) => (
              <div
                className="flex-shrink-0 flex min-w-[300px]"
                key={store._id}
                onClick={() => navigate(`/store/${store?._id}`)}
              >
                <Store store={store} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores;

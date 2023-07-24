import React, { useEffect, useState, useContext } from "react";
import StoreItem from "./StoreItem";
import { useNavigate, useParams } from "react-router-dom";
import { SET_SHOP_ITEMS } from "../../context/action-types";
import { UserContext } from "../../context/user-context";
import { fetchStoreDetailAPI } from "../../lib/market.api";
import Spinner from "../../component/commons/spinner/Spinner";
import ItemFilters from "../../component/item-filters/ItemFilters";
import Cart from "../../component/cart/Cart";

const StoreDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [storeDetails, setStoreDetails] = useState({
    social: {
      personal_website: "",
      instagram: "",
      youtube: "",
      facebook: "",
    },
    store_items: [],
    _id: "64a7bc61ab5984003f276add",
    ownerID: "649e295280701b003ed1cda1",
    name: "The Toy Station",
    description: " A place to buy toys, gifts for your loved ones",
    address: "Ahmedabad",
    city: "Ahmedabad",
    storeType: "Gifts & Accessories",
    contactNo: 7896452314,
    landline_no: null,
    openingTime: "08:00",
    closingTime: "20:00",
    yearOfEstablish: null,
    owner: "Mayur",
    personal_no: null,
    picture:
      "http://res.cloudinary.com/dra5wny0w/image/upload/v1688714337/covy23lajkhsfcadoxyc.jpg",
    createdAt: "2023-07-07T07:18:57.459Z",
    updatedAt: "2023-07-07T07:18:57.459Z",
    __v: 0,
  });
  const [storeItems, setStoreItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const {
    globalState: { cart },
    dispatch,
  } = useContext(UserContext);

  const fetchStoreData = async (id) => {
    try {
      setIsLoading(true);
      const { data: result } = await fetchStoreDetailAPI(id);
      const { store } = result;
      dispatch({ type: SET_SHOP_ITEMS, payload: store.store_items });
      setIsLoading(false);
      setStoreDetails(store);
      setStoreItems(store?.store_items);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const updateFilters = (name, isChecked) => {
    if (isChecked) setFilters((prevState) => prevState.concat(name));
    else {
      // debugger;
      setFilters((prevState) => prevState.filter((filt) => filt !== name));
    }
  };

  useEffect(() => {
    if (id) {
      fetchStoreData(id);
    }
  }, [id]);

  useEffect(() => {
    if (storeDetails && storeDetails.store_items) {
      let filteredItems = [];
      if (filters && filters.length > 0) {
        filteredItems = storeDetails.store_items.filter(
          (item) => !!filters.includes(item.filterType)
        );
      } else {
        filteredItems = storeDetails.store_items;
      }
      setStoreItems(filteredItems);
    }

  }, [filters]);

  console.log({ storeItems });
  return (
    <div className="p-2 flex items-center justify-center">
      {isLoading || !storeDetails ? (
        <Spinner />
      ) : (
        <section className="w-full md:py-8 lg:py-10">
          <div className="relative h-32 flex justify-center items-end dark:bg-gray-dark">
            <div className="absolute -top-10 left-1/2 transform  -translate-x-1/2 h-[100px] after:absolute after:top-0 after:w-full after:h-full after:block  after:content-['']">
              <img
                src={storeDetails.picture}
                alt="store-thumbnail"
                className="h-full object-full rounded-full"
                width={"100px"}
                height={"100px"}
              />
            </div>
            <div className="font-bold flex flex-col justify-center items-center">
              <p className="text-2xl">{storeDetails?.name}</p>
              <p className="text-muted">{storeDetails?.description}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="store-items grid md:grid-cols-4 space-x-1">
              <ItemFilters
                storeItems={storeItems}
                filters={filters}
                updateFilters={updateFilters}
              />
              {storeItems.length > 0 ? (
                <div
                  className="md:col-span-3 items-list"
                  style={{ border: "1px dotted black" }}
                >
                  <div className="grid grid-cols-1">
                    {storeItems.map((item) => (
                      <StoreItem item={item} key={item?._id} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="md:col-span-3 text-2xl text-mutted text-center mt-6">
                  No Items!
                </div>
              )}
            </div>
          </div>
          
        </section>
      )}
    </div>
  );
};

export default StoreDetails;

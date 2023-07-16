import React, { useEffect, useState, useContext } from "react";
import StoreItem from "./StoreItem";
import { useNavigate, useParams } from "react-router-dom";
import { SET_SHOP_ITEMS } from "../../context/action-types";
import { UserContext } from "../../context/user-context";
import { fetchStoreDetailAPI } from "../../lib/market.api";
import Spinner from "../../component/commons/spinner/Spinner";
import ItemFilters from "../../component/item-filters/ItemFilters";
import Cart from "../../component/order-summary/Cart";

const StoreDetails = () => {
  const [navItem, setnavItem] = useState({ activeItem: "about-store" });
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [StoreDetails, setStoreDetails] = useState({
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
    store_type: "Gifts & Accessories",
    contact_no: 7896452314,
    landline_no: null,
    opening_time: "08:00",
    closing_time: "20:00",
    year_of_establish: null,
    owner: "Mayur",
    personal_no: null,
    store_picture:
      "http://res.cloudinary.com/dra5wny0w/image/upload/v1688714337/covy23lajkhsfcadoxyc.jpg",
    createdAt: "2023-07-07T07:18:57.459Z",
    updatedAt: "2023-07-07T07:18:57.459Z",
    __v: 0,
  });
  const { globalState:{cart,shopItems}, dispatch } = useContext(UserContext);

  const handleItemClick = (e, { name }) => {
    setnavItem({ activeItem: name });
    navigate("/store/" + id + "/" + name);
  };

  const fetchStoreData = async (id) => {
    try {
      setIsLoading(true);
      const { data: result } = await fetchStoreDetailAPI(id);
      const { store } = result;
      dispatch({ type: SET_SHOP_ITEMS, payload: store.store_items });
      setIsLoading(false);

      setStoreDetails(store);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStoreData(id);
    }
  }, [id]);

  const { activeItem } = navItem;

  console.log(cart)
  return (
    <div className="m-2">
      {isLoading || !StoreDetails ? (
        <Spinner />
      ) : (
        <section className="">
          <div className="relative h-24">
            <div
              className="absolute top-0 left-0 w-full h-full after:absolute after:top-0 after:w-full after:h-full  after:shadow-inner after:block  after:content-['']"
              style={{ border: "1px solid" }}
            >
              <img
                src={StoreDetails.store_picture}
                alt="store-thumbnail"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div>
            {StoreDetails.store_items.length > 0 ? (
              <div className="store-items grid md:grid-cols-4 space-x-1">
                <ItemFilters store={StoreDetails} />
                <div
                  className="md:col-span-3 items-list"
                  style={{ border: "1px dotted black" }}
                >
                  <div className="grid grid-cols-1">
                    {shopItems.map((item) => (
                      <StoreItem item={item} key={item?._id} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-2xl text-mutted text-center mt-6">
                No Items Added Yet!
              </div>
            )}
          </div>
          {cart.items.length > 0 && <Cart totalItems={cart} />}
        </section>
      )}
    </div>
  );
};

export default StoreDetails;

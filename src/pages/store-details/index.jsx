import React, { useEffect, useState, useContext } from "react";
import StoreItem from "../../component/store-details/StoreItem";
import { useNavigate, useParams } from "react-router-dom";
import { SET_SHOP_ITEMS } from "../../context/action-types";
import { UserContext } from "../../context/user-context";
import {
  fetchCategoriesAPI,
  fetchStoreDetailAPI,
} from "../../lib/market.api";
import Spinner from "../../component/commons/spinner/Spinner";
import ProductCategories from "../../component/store-details/ProductsFilters";
import Cart from "../../component/cart/Cart";
import { toast } from "react-toastify";

const StoreDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [storeDetails, setStoreDetails] = useState({});
  const [storeItems, setStoreItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    globalState: { cart },
    dispatch,
  } = useContext(UserContext);

  const fetchStoreData = async (id) => {
    try {
      setIsLoading(true);
      const { data: result } = await fetchStoreDetailAPI(id);
      const { store } = result;
      setIsLoading(false);
      setStoreDetails(store);
      setStoreItems(store?.products);
      setCategories(store?.categories);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // const fetchCategories = async (id) => {
  //   try {
  //     const {
  //       data: { categrories },
  //     } = await fetchCategoriesAPI(id);
  //     setCategories(categrories);
  //   } catch (error) {
  //     toast.error("Something went wrong!", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  const updateSelectedCategories = (category, isChecked) => {
    if (isChecked)
      setSelectedCategories((prevState) => prevState.concat(category));
    else {
      setSelectedCategories((prevState) =>
        prevState.filter((filt) => filt._id !== category._id)
      );
    }
  };

  useEffect(() => {
    if (id) {
      fetchStoreData(id);
      // fetchCategories(id);
    }
  }, [id]);

  useEffect(() => {
    if (storeDetails && selectedCategories.length > 0) {
      let filteredItems = [];
      if (selectedCategories && selectedCategories.length > 0) {
        let selectedCategoriesIds = selectedCategories.map(
          (category) => category._id
        );
        console.log({ selectedCategoriesIds });
        filteredItems = storeDetails.products.filter((item) =>
          item.categories.some((category) =>
            selectedCategoriesIds.includes(category)
          )
        );
      } else {
        filteredItems = storeDetails.products;
      }
      setStoreItems(filteredItems);
    } else {
      if (storeDetails) {
        setStoreItems(storeDetails.products);
      }
    }
  }, [selectedCategories]);

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
              <ProductCategories
                categories={categories}
                selectedCategories={selectedCategories}
                updateSelectedCategories={updateSelectedCategories}
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

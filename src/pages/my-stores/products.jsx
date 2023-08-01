import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddCategoryModal from "../../component/modals/AddCategoryModal";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import FormItem from "../../component/commons/form-item";
import {
  deleteCategoryAPI,
  deleteProductAPI,
  fetchCategoriesAPI,
  fetchStoreDetailAPI,
} from "../../lib/market.api";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../component/commons/spinner/Spinner";
import MyStoreProducts from "../../component/my-store-products/MyStoreProducts";
import AddProductModal from "../../component/modals/AddProductModal";
import { AiFillEdit } from "react-icons/ai";

const StoreProducts = () => {
  const [categories, setCategories] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState([]);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [disableProductId, setDisableProductId] = useState(null);
  const [updatingProductData, setUpdatingProductData] = useState(null);
  const [updatingCategoryData, setUpdatingCategoryData] = useState(null);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const { data: result } = await fetchStoreDetailAPI(id);
      const { store } = result;
      setIsLoadingProducts(false);
      setStoreProducts(store?.products);
    } catch (error) {
      setIsLoadingProducts(false);
    }
  }

  async function fetchCategories() {
    try {
      setIsLoadingCategories(true);
      const { data: result } = await fetchCategoriesAPI(id);
      setIsLoadingCategories(false);
      setCategories(result.categories);
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function deleteCategory(storeId, categoryId) {
    try {
      let isAlreadyMapped = storeProducts.some((product) =>
        product.categories.includes(categoryId)
      );
      if (isAlreadyMapped) {
        toast.warn("Category already mapped with Products", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      setIsLoadingCategories(true);
      await deleteCategoryAPI(storeId, categoryId);
      setIsLoadingCategories(false);

      setCategories((prevState) =>
        prevState.filter((c) => c._id !== categoryId)
      );
      toast.success("Category deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      setIsLoadingCategories(false);
    }
  }

  async function deleteProduct(storeId, productId) {
    try {
      setDisableProductId(productId);
      setIsDeletingProduct(true);
      const { data: result } = await deleteProductAPI(storeId, productId);
      setDisableProductId(null);
      toast.success("Product deleted successfully!", {
        position: toast.position.TOP_RIGHT,
      });
      setIsDeletingProduct(false);
      setStoreProducts((prevState) =>
        prevState.filter((c) => c._id !== productId)
      );
    } catch (error) {
      toast.success("Failed to delete product", {
        position: toast.position.TOP_RIGHT,
      });
      setDisableProductId(null);
      setIsDeletingProduct(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={handleSubmit()} className="mx-3 my-2 w-full">
        {showAddCategoryModal && (
          <AddCategoryModal
            storeId={id}
            isOpen={showAddCategoryModal}
            closeModal={() => {
              setShowAddCategoryModal(false);
            }}
            data={updatingCategoryData}
            onSubmit={async (value) => {
              if (categories.find((category) => category.name == value.name)) {
                toast.error(`Category with this name already existed`, {
                  position: toast.POSITION.TOP_RIGHT,
                });
              } else {
                toast.success("New Category Added!", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                await fetchCategories();
              }
            }}
          />
        )}
        {showAddItemModal && (
          <AddProductModal
            storeId={id}
            data={updatingProductData}
            isOpen={showAddItemModal}
            closeModal={() => {
              setShowAddItemModal(false);
            }}
            categories={categories}
            onSuccess={() => {
              fetchProducts();
            }}
          />
        )}
        {/* <FormItem
            type="text"
            {...register("avgExpense", { required: true })}
            placeholder="Mobile number at store"
            label="Average Expense"
          />
          {errors?.storeName?.type === "required" && (
            <p className="error">Average expense is required!</p>
          )} */}

        <div className="menu-items-entry py-4 ">
          <div className="flex flex-col space-x-3 mb-3">
            <span className="font-semibold">Categories</span>
            <div className="flex flex-wrap m-2 space-x-2">
              {isLoadingCategories ? (
                <Spinner />
              ) : (
                categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center justify-between flex-row rounded-md bg-gray-dark px-3 py-1 font-medium"
                  >
                    <span className="mr-3">{category.name}</span>
                    <span className="flex items-center">
                      <span>
                        <AiFillEdit
                          className="mx-1 h-4 w-4 cursor-pointer"
                          onClick={() => {
                            setUpdatingCategoryData(category);
                            setShowAddCategoryModal(true);
                          }}
                        />
                      </span>
                      <span>
                        <GrClose
                          className="mx-1 h-4 w-4 cursor-pointer"
                          onClick={() => {
                            deleteCategory(id, category._id);
                          }}
                        />
                      </span>
                    </span>
                  </div>
                ))
              )}
            </div>
            <div className="text-center">
              <button
                className="btn btn-outline-primary text-center p-2 mx-3"
                onClick={() => {
                  setShowAddCategoryModal(true);
                }}
              >
                Add Category
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between my-1">
              <p className="font-semibold">Products</p>
              <div className="mr-3">
                <button
                  className="btn btn-outline-primary p-2"
                  onClick={() => {
                    setShowAddItemModal(true);
                  }}
                >
                  Add New Item
                </button>
              </div>
            </div>

            <MyStoreProducts
              isLoading={isLoadingProducts}
              isDeleting={isDeletingProduct}
              products={storeProducts}
              categories={categories}
              updateProduct={(product) => {
                setUpdatingProductData(product);
                setShowAddItemModal(true);
              }}
              deletingProductKey={disableProductId}
              deleteProduct={(productId) => {
                deleteProduct(id, productId);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center flex-row w-full mt-2">
          <button
            className="btn btn-primary py-3 px-5"
            type="button"
            onClick={() => {
              navigate("/partner-with-us/my-stores/");
            }}
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};
export default StoreProducts;

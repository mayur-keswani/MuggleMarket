import axios from "./interceptors";

const endpoint = "http://localhost:5000";

// const endpoint = "https://muggle-market.onrender.com";

/******** Authentication ******************/

export const loginAPI = (payload) => {
  return axios.post(`${endpoint}/auth/login`, payload);
};

export const signupAPI = (payload) => {
  return axios.post(`${endpoint}/auth/signup`, payload);
};

/******** Users **********************/

export const FetchUserDetailsAPI = () => {
  return axios.get(`${endpoint}/auth-details`);
};

export const addToCartAPI = (payload) => {
  return axios.post(`${endpoint}/cart/add`, payload);
};
export const updateToCartAPI = (payload) => {
  return axios.post(`${endpoint}/cart/update`, payload);
};
export const removeFromCartAPI = (payload) => {
  return axios.post(`${endpoint}/cart/remove`, payload);
};
export const getCartAPI = () => {
  return axios.get(`${endpoint}/cart`);
};

export const checkoutAPI = (payload) => {
  return axios.post(`${endpoint}/checkout`, payload);
};

export const placeOrderAPI = (payload) => {
  return axios.post(`${endpoint}/place-order`, payload);
};

export const createStripeSessionAPI = (payload) => {
  return axios.post(`${endpoint}/create-checkout-session`, payload);
};

export const fetchMyOrdersAPI = async () => {
  return axios.get(`${endpoint}/my-orders`);
};
/******* Stores  *************************/
export const fetchStoresAPI = async () => {
  return axios.get(`${endpoint}/stores`);
};

export const uploadItemToStoreAPI = (storeId, payload) => {
  return axios.post(`${endpoint}/upload-items/${storeId}`, payload);
};

export const createStoreAPI = (payload) => {
  return axios.post(`${endpoint}/store/create`, payload);
};
export const editStoreAPI = (id, payload) => {
  return axios.post(`${endpoint}/store/update/${id}`, payload);
};

export const fetchStoreDetailAPI = (storeId) => {
  return axios.get(`${endpoint}/store/${storeId}`);
};

export const fetchMyStoresAPI = () => {
  return axios.get(`${endpoint}/my-stores`);
};

export const fetchMyStoresCategoriesAPI = (id) => {
  return axios.get(`${endpoint}/my-stores/${id}/categories`);
};
export const fetchMyStoresProductsAPI = (id) => {
  return axios.get(`${endpoint}/my-stores/${id}/products`);
};
export const addStoreCategoryAPI = (id, payload) => {
  return axios.post(`${endpoint}/my-stores/${id}/categories`, payload);
};
export const deleteCategoryAPI = (storeId, categoryId) => {
  return axios.delete(
    `${endpoint}/my-stores/${storeId}/categories/${categoryId}`
  );
};

export const addStoresProductAPI = (id, payload) => {
  return axios.post(`${endpoint}/my-stores/${id}/products`, payload);
};
export const updateStoreProductAPI = (storeId, productId, payload) => {
  return axios.put(
    `${endpoint}/my-stores/${storeId}/products/${productId}`,
    payload
  );
};
export const deleteProductAPI = (storeId, productId) => {
  return axios.delete(`${endpoint}/my-stores/${storeId}/products/${productId}`);
};

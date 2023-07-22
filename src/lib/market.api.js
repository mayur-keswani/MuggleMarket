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

export const checkoutAPI = () => {
  return axios.post(`${endpoint}/checkout`);
};

export const placeOrderAPI = (payload) => {
  return axios.post(`${endpoint}/place-order`, payload);
};

export const createStripeSessionAPI = (payload) => {
  return axios.post(`${endpoint}/create-checkout-session`, payload);
};

export const fetchMyOrders = async () => {
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
  return axios.post(`${endpoint}/create-your-store/`, payload);
};
export const editStoreAPI = (storeId, payload) => {
  return axios.post(`${endpoint}/edit-your-store/${storeId}`, payload);
};

export const fetchStoreDetailAPI = (storeId) => {
  return axios.get(`${endpoint}/store/${storeId}`);
};

export const fetchMyStoresAPI = () => {
  return axios.get(`${endpoint}/my-stores`);
};

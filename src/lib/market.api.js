import axios from "axios"

const endpoint = "https://muggle-market.onrender.com";

/******** Authentication ******************/

export const loginAPI = (payload)=>{
    return axios.post(`${endpoint}/auth/login`,payload);
}

export const signupAPI = (payload) => {
  return axios.post(`${endpoint}/auth/signup`, payload);
};

/******** Users **********************/
 
export const FetchUserDetailsAPI = ()=>{
    return axios.get(`${endpoint}/auth-details`);
}
export const checkoutAPI = (payload)=>{
  return axios.post(`${endpoint}/checkout`, payload);
}

export const placeOrderAPI = (payload)=>{
    return axios.post(`${endpoint}/place-order`, payload);
}

export const processPaymentAPI = (payload) => {
  return axios.post(`${endpoint}/make-online-payment`, payload);
};

export const fetchMyOrders = async()=>{
    return axios.get(`${endpoint}/my-orders`);
}
/******* Stores  *************************/
export const fetchStoresAPI=async()=>{
    return axios.get(`${endpoint}/stores`)
}

export const uploadItemToStore=(storeId,payload)=>{
    return axios.post(`${endpoint}/upload-items/${storeId}`, payload);
}

export const createStoreAPI = (payload)=>{
    return axios.post(`${endpoint}/create-your-store/`, payload);

}
export const editStoreAPI = (storeId,payload)=>{
    return axios.post(`${endpoint}/edit-your-store/${storeId}`, payload);
}

export const fetchStoreDetailAPI = (storeId)=>{
    return axios.get(`${endpoint}/store/${storeId}`);
}

export const fetchMyStores = ()=>{
    return axios.get(`${endpoint}/my-stores`);   
}
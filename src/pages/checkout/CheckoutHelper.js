import {
  FetchUserDetailsAPI,
  placeOrderAPI,
  processPaymentAPI,
} from "../../lib/market.api";

export const FetchUserDetails = async (token, cb) => {
  try {
    const { data: response } = await FetchUserDetailsAPI();
    console.log(response.user);
    cb(response);
  } catch (error) {}
};

export const PlaceOrder = async (data, token, cb) => {
  try {
    const { data: result } = await placeOrderAPI(data);
    let message = result.message;
    cb(true, message);
  } catch (error) {
    let message = error.message;
    cb(false, message);
  }
};

export const ProcessCardPayment = async (payload, token, cb) => {
  try {
    const { data: result } = await processPaymentAPI(payload);
    cb(result);
  } catch (error) {}
};

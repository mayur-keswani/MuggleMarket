import React, { useState, useEffect, useContext } from "react";
import { Skeleton } from "../../component/commons/skeleton/card";
import ModalWrapper from "../../component/commons/modal-wrapper/ModalWrapper";
import OrderPlaceResult from "../../component/order-place-result/OrderPlaceResult";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
// import {Button,Icon,Divider,Grid,Message} from 'semantic-ui-react'
import StripeCheckout from "react-stripe-checkout";
import {
  FetchUserDetailsAPI,
  placeOrderAPI,
  processPaymentAPI,
} from "../../lib/market.api";
import CheckoutSummary from "../../component/checkout/checkout-summary";
import CheckoutForm from "../../component/checkout/checkout-form";
import { values } from "lodash";

const Checkout = () => {
  const [user, setUser] = useState();
  const [cartItems, setCartItem] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [charges, setCharges] = useState(0);
  const [selectedAddress, onSelectAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [ordered, onOrderPlaced] = useState({
    flag: false,
    status: null,
    message: null,
  });
  const [invoice, setInvoice] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { globalState } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const { data: response } = await FetchUserDetailsAPI();
      setUser(response.user);
      setCartItem(response.user.cart);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const taxCalculator = (subtotal) => {
    const temp = (10 * subtotal) / 100;
    setCharges(temp);
    return temp;
  };
  const grandTotalCalculator = (subtotal) => {
    setGrandTotal(subtotal + charges);
    return grandTotal;
  };

  const updateItemsHandler = (itemID, type) => {
    setCartItem((prevState) => {
      const updatedItems = prevState.map((item) => {
        if (item._id.toString() === itemID.toString()) {
          type === "ADD" ? (item.quantity += 1) : (item.quantity -= 1);
          return item;
        } else {
          return item;
        }
      });
      return updatedItems;
    });
  };

  const onOrderSumbit = async (stripe_token,values) => {
    try {
      const items = cartItems.map((item) => {
        return {
          productID: item.productID._id,
          name: item.productID.name,
          quantity: item.quantity,
          price: item.productID.price,
          storeID: item.productID.storeID,
        };
      });
      const payload = {
        token: stripe_token,
        address: values.address,
        price: 100,
        username: values.username,
        items,
      };

      setIsPlacingOrder(true);
      const {
        data: {
          result: { receipt_url },
        },
      } = await processPaymentAPI(payload);

      const orderItems = cartItems.map((item) => {
        return {
          productID: item.productID._id,
          name: item.productID.name,
          description: item.productID.description,
          product_pic: item.productID.product_pic,
          quantity: item.quantity,
          price: item.productID.price,
          storeID: item.productID.storeID,
        };
      });
      const data = {
        address: selectedAddress,
        charges: charges,
        grandTotal: grandTotal,
        username: user.username,
        items: orderItems,
      };

      const { data: {message} } = await placeOrderAPI(data);
      setIsPlacingOrder(false);
      onOrderPlaced({ flag: true, status: "success", message });
      receipt_url ? setInvoice(receipt_url) : setInvoice("");
    } catch (error) {
      let message = error.message;
      setIsPlacingOrder(false);
      onOrderPlaced({ flag: true, status: "fail", message });
    }
  };



  return (
    <>
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="overflow-hidden  rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CheckoutSummary />
            <CheckoutForm onOrderSumbit={onOrderSumbit} />
          </div>
        </div>
      </div>
      {/* <Grid> */}
      {/* <Grid.Column mobile={16} tablet={11} computer={11}> */}
      {/* <UserDetails
                username={user.username}
                email={user.email}
                selectedAddress={selectedAddress}
                onSelectAddress={(address) => onSelectAddress(address)}
                changePaymentMethod={setPaymentMethod}
              /> */}
      {/* </Grid.Column> */}

      {/* <Grid.Column
              mobile={16}
              tablet={4}
              computer={5}
              className="text-center"
            >
              <CheckoutSummary
                cartItems={cartItems}
                updateItemsHandler={(itemID, type) =>
                  updateItemsHandler(itemID, type)
                }
                taxCalculator={taxCalculator}
                grandTotalCalculator={grandTotalCalculator}
              />
              <Message warning>
                <Message.Header>Note:</Message.Header>
                <span>
                  Order once placed cannot be cancelled and it is non-refundable
                </span>
              </Message>
              {/* <Button primary size='huge' onClick={orderHandler}>Place Order</Button> */}
      {/* {PaymentMethod()} */}
      {/* </Grid.Column> */}
      {/* </Grid> */}
      {/* <ModalWrapper
        isOpen={ordered.flag}
        closeModal={() =>
          onOrderPlaced({ flag: false, message: null, status: null })
        }
      >
        <OrderPlaceResult
          status={ordered.status}
          message={ordered.message}
          invoice={invoice}
          closeModal={() =>
            onOrderPlaced({ flag: false, message: null, status: null })
          }
        />
      </ModalWrapper> */}
    </>
  );
};

export default Checkout;

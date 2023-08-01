import React, { useState, useEffect, useContext } from "react";
import MyOrder from "../../component/my-order/MyOrder";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../../component/commons/skeleton/card";
import { fetchMyOrdersAPI } from "../../lib/market.api";
import Spinner from "../../component/commons/spinner/Spinner";

const MyOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchMyOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchMyOrdersAPI();
      setIsLoading(false);
      setOrders(data.orders);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <>
      My orders
      {isLoading ? (
        <Spinner size="Large" />
      ) : orders.length === 0 ? (
        <div> No Orders Yet </div>
      ) : (
        <div>
          {orders.map((order) => (
            <MyOrder order={order} key={order._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyOrders;

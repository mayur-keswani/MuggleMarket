import React, { useState, useEffect, useContext } from "react";
import MyOrder from "../../component/my-order/MyOrder";
import { useNavigate } from "react-router-dom";
// import { Header, Icon, Button, Divider, Item } from "semantic-ui-react";
import { Skeleton } from "../../component/commons/skeleton/card";
import { fetchMyOrdersAPI } from "../../lib/market.api";
import { set } from "lodash";

const MyOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
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
      {/* <div className="checkout-header px-5 py-2 my-0 d-flex align-items-center">
        <Button animated basic size="small" onClick={() => navigate(-1)}>
          <Button.Content visible>Back to Home</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
        <span className="h4 mx-5">
          <b>MuggleMarket</b>
        </span>
      </div>
      <Divider />
      <Header as="h2" className="m-2 px-3">
        <Icon name="opencart" />
        <Header.Content>
          Your Orders
          <Header.Subheader>with MuggleMarket</Header.Subheader>
        </Header.Content>
      </Header>

      {!orders ? (
        <Skeleton />
      ) : !orders.length ? (
        <div> No Orders Yet </div>
      ) : (
        <Item.Group relaxed>
          {orders.map((order) => (
            <>
              <MyOrder order={order} key={order._id} />
            </>
          ))}
        </Item.Group>
      )} */}
    </>
  );
};

export default MyOrders;

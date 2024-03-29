import React, { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { AiFillDelete } from "react-icons/ai";
import useCart from "../../hooks/useCart";

const OrderSummary = () => {
  
  const {
    globalState: { cart },
  } = useContext(UserContext);

  const {
    addQuantityHandler,
    reduceQuantityHandler,
    removeFromCartHandler,
  } = useCart();

  function getTotalPrice() {
    let totalPrice = 0;
    cart?.forEach((cartItem) => {
      totalPrice = cartItem?.quantity * cartItem?.product?.price;
    });
    return totalPrice;
  }

  return (
    <>
      {cart.length > 0 ? (
        <ul className="flex flex-col divide-y divide-gray-200">
          {cart.map((cartItem) => (
            <li
              key={cartItem._id}
              className="flex flex-col py-6 sm:flex-row sm:justify-between"
            >
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="h-20 w-20 flex-shrink-0 rounded object-cover outline-none dark:border-transparent sm:h-32 sm:w-32"
                  src={cartItem.product.picture}
                  alt={cartItem.product.name}
                />
                <div className="flex w-full flex-col justify-between pb-4">
                  <div className="flex w-full justify-between space-x-2 pb-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                        {cartItem.product.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {cartItem.product.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-sm">
                    <button
                      type="button"
                      className="h-7 w-7"
                      onClick={() => {
                        reduceQuantityHandler(
                          cartItem?.product?._id,
                          cartItem?.quantity
                        );
                      }}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="mx-1 h-7 w-9 rounded-md border text-center"
                      value={cartItem?.quantity}
                    />
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center"
                      onClick={() => {
                        addQuantityHandler(
                          cartItem?.product?._id,
                          cartItem?.quantity
                        );
                      }}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2  mx-5 px-2 py-1 pl-0"
                      onClick={() => {
                        removeFromCartHandler(cartItem?.product?._id);
                      }}
                    >
                      <AiFillDelete />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center text-muted ">
          No Products Added{" "}
        </div>
      )}
      <div className="space-y-1 text-right px-3">
        <p>
          Total amount:
          <span className="font-semibold"> ₹{getTotalPrice()}</span>
        </p>
      </div>

      {/* <Table
        unstackable
        style={{
          backgroundColor: "transparent",
          width: "80%",
          margin: "auto",
          color: "white",
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{ backgroundColor: "transparent" }}
              textAlign="center"
            >
              Item No.
            </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "transparent" }}>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "transparent" }}>
              Price
            </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "transparent" }}>
              Quantity
            </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "transparent" }}>
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orderItems.map((item, i) => (
            <Table.Row key={item.productID}>
              <Table.Cell textAlign="center">{i + 1}</Table.Cell>
              <Table.Cell>{item.productName}</Table.Cell>
              <Table.Cell>{item.productPrice}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.productPrice * item.quantity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              textAlign="center"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              Sub-Total
            </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "transparent" }}>
              {" "}
            </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "transparent" }}>
              {" "}
            </Table.HeaderCell>
            <Table.HeaderCell style={{ backgroundColor: "transparent" }}>
              {" "}
            </Table.HeaderCell>
            <Table.HeaderCell className="h5 text-danger">
              {totalPrice}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table> */}
    </>
  );
};

export default OrderSummary;

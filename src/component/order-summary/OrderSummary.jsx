import React, { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { AiFillDelete } from "react-icons/ai";
import { addQuantity, removeFromCart, removeQuantity } from "../../context/action-creators";

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    href: "#",
    price: "₹47,199",
    originalPrice: "₹48,900",
    discount: "5% Off",
    color: "Orange",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
  },
  {
    id: 2,
    name: "Nike Blazer Low 77 SE",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    color: "White",
    leadTime: "3-4 weeks",
    size: "8 UK",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    href: "#",
    price: "₹2219 ",
    originalPrice: "₹999",
    discount: "78% off",
    color: "Black",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
  },
];

const OrderSummary = () => {
  const {
    globalState: { cart },
    dispatch
  } = useContext(UserContext);

  function getTotalPrice() {
    let totalPrice = 0;
    cart?.items.forEach((cartItem) => {
      totalPrice = cartItem?.quantity * cartItem?.item?.price;
    });
    return totalPrice;
  }
  return (
    <>
      <div className="mx-auto flex w-full flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
        <h2 className="text-3xl font-bold">Your cart</h2>

        <ul className="flex flex-col divide-y divide-gray-200">
          {cart.items.map((cartItem) => (
            <li
              key={cartItem.id}
              className="flex flex-col py-6 sm:flex-row sm:justify-between"
            >
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="h-20 w-20 flex-shrink-0 rounded object-cover outline-none dark:border-transparent sm:h-32 sm:w-32"
                  src={cartItem.item.product_pic}
                  alt={cartItem.item.name}
                />
                <div className="flex w-full flex-col justify-between pb-4">
                  <div className="flex w-full justify-between space-x-2 pb-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                        {cartItem.item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {cartItem.item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-sm">
                    <button
                      type="button"
                      class="h-7 w-7"
                      onClick={() => {
                        dispatch(
                          removeQuantity(cartItem?.item?._id, cartItem?.item)
                        );
                      }}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      class="mx-1 h-7 w-9 rounded-md border text-center"
                      value={cartItem?.quantity}
                    />
                    <button
                      type="button"
                      class="flex h-7 w-7 items-center justify-center"
                      onClick={() => {
                        dispatch(
                          addQuantity(cartItem?.item?._id, cartItem?.item)
                        );
                      }}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2  mx-5 px-2 py-1 pl-0"
                      onClick={() => {
                        dispatch(
                          removeFromCart(cartItem?.item?._id)
                        );
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
        <div className="space-y-1 text-right">
          <p>
            Total amount:
            <span className="font-semibold"> ₹{getTotalPrice()}</span>
          </p>
        </div>
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

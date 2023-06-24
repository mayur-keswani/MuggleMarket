import React, { useContext } from "react";
import ItemFilters from "../../component/item-filters/ItemFilters";
import Cart from "../../component/order-summary/Cart";
import OrderButton from "../../component/orderButton/OrderButton";
import { UserContext } from "../../context/user-context";

const StoreItems = ({ store }) => {
  const { globalState } = useContext(UserContext);
  const { selectedItems, shopItems } = globalState;

  let totalItems = 0;
  for (let i in selectedItems) {
    totalItems += +selectedItems[i];
  }

  return store.store_items.length ? (
    <>
      <div className="store-items d-flex flex-row ">
        <ItemFilters store={store} />
        <div
          className="items-list"
          style={{ width: "80%", border: "1px dotted black" }}
        >
          {/*shopItems.map((item) => (
            <Item.Group relaxed key={item._id}>
              <Item>
                <Item.Image
                  size="small"
                  src={
                    item.product_pic ||
                    "https://react.semantic-ui.com/images/wireframe/image.png"
                  }
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header>{item.name}</Item.Header>
                  <Item.Description>{item.description}</Item.Description>
                  <Item.Extra className="text-lead text-danger h4">
                    <Icon name="inr" />
                    {item.price}
                  </Item.Extra>
                  <OrderButton item={item} />
                </Item.Content>
              </Item>
            </Item.Group>
				))*/}
        </div>
      </div>
      {totalItems ? <Cart totalItems={totalItems} /> : ""}
    </>
  ) : (
    <h4>No Items Added Yet!</h4>
  );
};

export default StoreItems;

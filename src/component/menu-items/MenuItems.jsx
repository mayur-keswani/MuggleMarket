import React, { useState, useContext } from "react";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../commons/skeleton/card";
import { uploadItemToStore } from "../../lib/market.api";
import FormItem from "../commons/form-item";

const MenuItems = (props) => {
  const navigate = useNavigate();
  const { globalState, dispatch } = useContext(UserContext);
  const { token, editStoreKey } = globalState;
  const [items, setItems] = useState([]);
  const [menuItem, setMenuItem] = useState({
    id: 1,
    name: "",
    description: "",
    product_pic: "",
    price: "",
  });
  const [newItemSlot, setNewItemSlot] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const addNewItemHandler = async () =>{
  //   await setItems((prevState)=>{
  //     return prevState.concat(menuItem)
  //   })
  // }

  const uploadItemHandler = async () => {
    const formData = new FormData();
    formData.append("name", menuItem.name);
    formData.append("description", menuItem.description);
    formData.append("storeImage", menuItem.product_pic);
    console.log(formData.get("storeImage"));
    formData.append("price", menuItem.price);
    try {
      setIsLoading(true);
      const { data: result } = await uploadItemToStore(editStoreKey, formData);
      setItems((prevState) => {
        return prevState.concat(result.product);
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className=" border border-gray-200 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-dark dark:text-gray-400">
          <tr scope="col" className="bg-gray-50">
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Items No.
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Product Image
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
            ></th>
          </tr>
        </thead>

        <tbody>
          {/* {items.map((item) => {
            return (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="">{item._id}</td>
                <td className="">{item.name}</td>
                <td className="">{item.description}</td>
                <td className="">{item.product_pic}</td>
                <td className="">{item.price}</td>
              </tr>
            );
          })} */}
          {true && (
            <tr >
              <td>
                <span className="text-danger">{menuItem.id}</span>
              </td>
              <td className="my-4">
                <FormItem
                  type="text"
                  name="name"
                  rows="5"
                  cols="20"
                  value={menuItem.name}
                  onChange={(event) =>
                    setMenuItem({ ...menuItem, name: event.target.value })
                  }
                />
              </td>
              <td style={{ height: "100%" }}>
                <FormItem
                  type="textarea"
                  name="description"
                  rows="5"
                  cols="10"
                  value={menuItem.description}
                  onChange={(event) =>
                    setMenuItem({
                      ...menuItem,
                      description: event.target.value,
                    })
                  }
                />
              </td>
              <td>
                <div className="text-xl" image>
                  {/* <Icon name="picture" size="huge" /> */}
                </div>
                <FormItem
                  type="file"
                  name="picture"
                  onChange={(event) =>
                    setMenuItem({
                      ...menuItem,
                      product_pic: event.target.files[0],
                    })
                  }
                />
              </td>
              <td>
                <FormItem
                  type="text"
                  name="price"
                  rows="2"
                  cols="10"
                  value={menuItem.price}
                  onChange={(event) =>
                    setMenuItem({ ...menuItem, price: event.target.value })
                  }
                />

              </td>
              <td>
                <button default onClick={() => uploadItemHandler()}>
                  ADD
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    // {/* <Button  className="mb-5" onClick={addNewItemHandler}><Icon name="add"/></Button> */}
    // {/* <Button  className="mt-p" onClick={addNewItemHandler}><Icon name="Submit Menu"/></Button> */}
    // {/* <Form className="text-center mt-4"> */}
    // {/* <button
    //   animated
    //   size="huge"
    //   className=""
    //   color="green"
    //   onClick={() => navigate("/store/" + editStoreKey + "/items")}
    // > */}
    //   {/* <Button.Content visible>Check Store</Button.Content>
    //   <Button.Content hidden>
    //     <Icon name="arrow right" />
    //   </Button.Content> */}
    // {/* </button> */}
    // {/* </Form> */}
  );
};

export default MenuItems;

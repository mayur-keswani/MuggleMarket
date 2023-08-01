import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import NotFound from "../../public/notFound.png";
import { deleteStoreAPI, fetchMyStoresAPI } from "../../lib/market.api";
import Spinner from "../../component/commons/spinner/Spinner";
import { toast } from "react-toastify";

const MyStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { dispatch } = useContext(UserContext);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  const fetchMyStores = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchMyStoresAPI();
      setStores(data.stores);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const deleteStoreHandler = async(id)=>{
    try {
      setIsDeleting(true);
      setStores((prevState)=> prevState.filter(store=> store._id !== id));
      setIsDeleting(false);
      toast.success("Store Deleted Successfully",{position:toast.POSITION.TOP_RIGHT})
    } catch (error) {
      toast.error("Something went wrong!,Please contact Administrator", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    fetchMyStores();
  }, []);


  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center py-6 px-2">
          <Spinner size="large" />
        </div>
      ) : !stores.length ? (
        <div className="flex align-middle items-center justify-center flex-col">
          <img src={NotFound} alt={"NoStore"} />
          <span className="text-xl font-extralight text-gray-600">
            You haven't registered your store
          </span>
        </div>
      ) : (
        <div className="m-2 p-3">
          {stores.map((store, index) => (
            <div
              className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row "
              key={index}
            >
              <div className="h-full w-full md:h-[200px] md:w-[300px]">
                <img
                  src={store.picture}
                  alt="Laptop"
                  className="h-full w-full rounded-md object-cover"
                  height="250px"
                />
              </div>
              <div>
                <div className="p-4">
                  <h1 className="inline-flex items-center text-2xl font-semibold">
                    {store.name}
                  </h1>
                  <p className="">{store?.description}</p>
                  <div className="mt-4">
                    <div>
                      <span className="font-semibold"> Store Type : </span>
                      <span className="mb-1 mr-2 inline-block">
                        {store?.storeType}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold"> City : </span>
                      <span className="mb-1 mr-2 inline-block">
                        {store?.location?.city}
                      </span>
                    </div>
                    <div>
                      <span className="mb-1 mr-2 inline-block rounded-full font-semibold ">
                        {store?.openingTime} - {store?.closingTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-2 mt-1">
                    <button
                      className="btn btn-outline-primary p-2"
                      onClick={() =>
                        navigate(
                          `/partner-with-us/create-your-store/${store?._id}`
                        )
                      }
                    >
                      Edit Store
                    </button>
                    <button
                      className="btn btn-outline-primary p-2"
                      onClick={() =>
                        navigate(
                          `/partner-with-us/my-stores/${store?._id}/products`
                        )
                      }
                    >
                      Add Products
                    </button>
                    <button
                      className="btn btn-primary p-2"
                      onClick={() =>{
                       deleteStoreHandler(store?._id);
                      }}
                    >
                     {isDeleting?<Spinner/>:"Delete Store"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
    // <>
    //   <Header as="h2" className="mb-5 p-5 bg-light">
    //     <Icon name="shop" />
    //     <Header.Content>
    //       My Stores
    //       <Header.Subheader>Manage your stores</Header.Subheader>
    //     </Header.Content>
    //   </Header>

    //   {isLoading ? (
    //     <Skeleton />
    //   ) : !stores.length ? (
    //     <h4 className="text-danger">You Have No Store!</h4>
    //   ) : (
    //     <Item.Group relaxed className="mystore-section">
    //       {stores.map((store) => (
    //         <Item
    //           className="mx-2"
    //           style={{ width: "100%", borderBottom: "1px dotted black" }}
    //           key={store._id}
    //         >
    //           <Item.Image
    //             src={
    //               store.picture ||
    //               "https://react.semantic-ui.com/images/wireframe/image.png"
    //             }
    //             size="small"
    //             className="rounded img-fluid"
    //           />
    //           <Item.Content verticalAlign="middle">
    //             <Item.Header as="a">{store.name}</Item.Header>
    //             <Item.Meta>
    //               <span className="cinema">{store.store_type}</span>
    //             </Item.Meta>
    //             <Item.Description> {store.description}</Item.Description>
    //             <Item.Extra className="mt-1">
    //               <Button
    //                 animated
    //                 primary
    //                 size="large"
    //                 onClick={() => showStoreHandler(store._id)}
    //               >
    //                 <Button.Content visible>Look inside</Button.Content>
    //                 <Button.Content hidden>
    //                   <Icon name="arrow right" />
    //                 </Button.Content>
    //               </Button>
    //             </Item.Extra>
    //           </Item.Content>
    //         </Item>
    //       ))}
    //     </Item.Group>
    //   )}
    // </>
  );
};

export default MyStore;

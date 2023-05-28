import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "../../component/ui/spinner/Spinner";
import userContext from "../../context/user-context";
import { useHistory, useParams } from "react-router-dom";
import { Divider, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { EDIT_STORE, SET_LOADING } from "../../context/action-types";
import { fetchStoreDetail, fetchStoreDetailAPI } from "../../lib/market.api";

const EditStore = () => {
  const history = useHistory();
  const { id } = useParams();
  const { globalState, dispatch } = useContext(userContext);
  const { token, isLoading } = globalState;
  const [store, setStore] = useState();

  const optionPreferred = (option) => {
    dispatch({ type: EDIT_STORE, payload: { id: id, store: store } });
    if (option === "edit-store-details") history.push("/create-your-store/1");
    else if (option === "add-items") history.push("/create-your-store/3");
  };
  const fetchStore = async (id) => {
    try {
      const { data } = dispatch({ type: SET_LOADING, payload: true });
      await fetchStoreDetailAPI(id);
      setStore(data.store);
      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  useEffect(() => {
    fetchStore(id);
  }, [id]);
  return isLoading ? (
    <Spinner />
  ) : !store ? (
    <h3>No Store Found</h3>
  ) : (
    <>
      <div className="zumbotron">
        <div className="m-2 h1">{store.name}</div>
        <p className="h5 mx-3 text-lead"> Since {store.year_of_establish}</p>
      </div>

      <div className="to-edit-page d-flex justify-content-center mt-5">
        <Segment
          placeholder
          style={{ width: "60%", borderRadius: "20px" }}
          color="teal"
        >
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column
                onClick={() => optionPreferred("edit-store-details")}
              >
                <Header icon>
                  <Icon name="edit" />
                  Edit Store-Details
                </Header>
                {/* <Search placeholder='Search countries...' /> */}
              </Grid.Column>

              <Grid.Column onClick={() => optionPreferred("add-items")}>
                <Header icon>
                  <Icon name="add circle" />
                  Add Store-Items
                </Header>
                {/* <Button primary onClick={()=>history.push('/create-your-store/1')}>Create</Button> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    </>
  );
};
export default EditStore;

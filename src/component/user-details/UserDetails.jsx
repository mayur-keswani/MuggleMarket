import React, { useState } from "react";
import {
  Message,
  Accordion,
  Button,
  Form,
  Radio,
} from "semantic-ui-react";
import "./UserDetails.css";

const UserDetails = (props) => {
  const [state, setState] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [isAddressPanelOpen, toggleAddressPanel] = useState(false);
  const [new_address, setNewAddress] = useState("");
  // const [ paymentMethod,setPaymentMethod]= useState("cash")

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const activeIndex = state;
    const newIndex = activeIndex === index ? -1 : index;
    setState(newIndex);
  };
  const selectAddressHandler = (args) => {
    console.log(args);
    props.onSelectAddress(args);
  };

  const activeIndex = state;

  return (
    <>
      <Message
        success
        header={props.username + " (" + props.email + ") "}
        content="You are securely logged un"
      />

      <Accordion styled fluid className="px-3 pb-3">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
          className="accordion-title"
        >
          Address
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === 0}
          className="accordion-content mb-2 pb-2"
        >
          {!addresses.length ? (
            <div className="bg-warning p-3">
              You dont have any saved address:(
            </div>
          ) : (
            addresses.map((address, i) => (
              <div
                className="p-3"
                key={i}
                style={{
                  backgroundColor:
                    props.selectedAddress === address ? "teal" : "grey",
                }}
              >
                <Radio
                  label={address}
                  name="checkboxRadioGroup"
                  size="large"
                  onClick={() => selectAddressHandler(address)}
                />
              </div>
            ))
          )}

          <Form className="mb-2">
            {isAddressPanelOpen ? (
              <>
                <Form.TextArea
                  placeholder="add something here..."
                  value={new_address}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <Button
                  attached="bottom"
                  onClick={() => {
                    setAddresses((prevState) => prevState.concat(new_address));
                    toggleAddressPanel(false);
                  }}
                >
                  Submit
                </Button>
              </>
            ) : (
              <Button
                attached="bottom"
                onClick={() => toggleAddressPanel(true)}
              >
                Add New Address
              </Button>
            )}
          </Form>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
          className="accordion-title"
        >
          Mode Of Payment
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === 1}
          className="accordion-content mb-2 bg-light"
        >
          <div>
            <Message color="yellow">
              Right Now, We are only accepting cash!
            </Message>
          </div>

          <div className="mt-2">
            <div className="m-2">
              <input
                type="radio"
                name="payment-method"
                className="mx-2"
                id="btnradio1"
                autocomplete="off"
                onChange={() => props.changePaymentMethod("cash")}
              />
              <label
                class="text-primary"
                className="fw-bold fs-6"
                for="btnradio1"
              >
                Cash
              </label>
            </div>

            <div className="m-2">
              <input
                type="radio"
                name="payment-method"
                className="mx-2"
                id="btnradio2"
                autocomplete="off"
                onChange={() => props.changePaymentMethod("card")}
              />
              <label
                class="text-primary"
                for="btnradio2"
                className="fw-bold fs-6"
              >
                Pay Using Card
              </label>
            </div>
          </div>
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default UserDetails;

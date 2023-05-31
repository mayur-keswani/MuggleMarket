import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Icon,Header,Button} from 'semantic-ui-react'

const OrderPlaceResult  = ({status,message,invoice,closeModal}) =>{
	console.log(invoice)
	const navigate= useNavigate()
	return status === "success" ? (
    <div className="text-center">
      <Header as="h2" icon textAlign="center" color="teal">
        <Icon name="cloud upload" circular />
        Order Status
        <Header.Subheader>{message}</Header.Subheader>
      </Header>
      {invoice ? (
        <a
          href={invoice}
          target="_blank"
          className="btn btn-success btn-lg text-dark ml-3 px-4"
        >
          Check Invoice
        </a>
      ) : (
        <></>
      )}

      <button
        className="btn btn-lg btn-primary mx-2"
        size="huge"
        onClick={() => navigate("/")}
      >
        Continue Shopping!
      </button>
    </div>
  ) : (
    <div className="text-center">
      <Header as="h2" icon textAlign="center" color="grey">
        <Icon name="warning" circular />
        Order Status
        <Header.Subheader>{message}</Header.Subheader>
      </Header>
      <Button size="huge" color="red" onClick={closeModal}>
        Try Again
      </Button>
    </div>
  );
}
export default OrderPlaceResult
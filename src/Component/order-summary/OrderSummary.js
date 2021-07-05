import React,{useContext} from 'react';
import userContext from '../../context/user-context'
import { Table , Button} from 'semantic-ui-react'

const OrderSummary = () =>{
	const {globalState} = useContext(userContext)
	const {orderItems,totalPrice} = globalState;
	console.log(orderItems)
  return(
	  <>
	  <Table unstackable style={{backgroundColor:"transparent",width:"80%",margin:"auto",color:"black"}}  >
		<Table.Header >
		  <Table.Row >
			<Table.HeaderCell  style={{backgroundColor:"transparent"}} textAlign="center">Item No.</Table.HeaderCell>
			<Table.HeaderCell  style={{backgroundColor:"transparent"}}>Name</Table.HeaderCell>
			<Table.HeaderCell  style={{backgroundColor:"transparent"}}>Price</Table.HeaderCell>
			<Table.HeaderCell  style={{backgroundColor:"transparent"}}>Quantity</Table.HeaderCell>
			<Table.HeaderCell  style={{backgroundColor:"transparent"}}>Total</Table.HeaderCell>
		  </Table.Row>
		</Table.Header>
	
		<Table.Body>
		{
			orderItems.map((item,i)=>
				 
				 <Table.Row key={item.productID}>
					<Table.Cell textAlign="center">{i+1}</Table.Cell>
					<Table.Cell>{item.productName}</Table.Cell>
					<Table.Cell >{item.productPrice}</Table.Cell>
					<Table.Cell>{item.quantity}</Table.Cell>
					<Table.Cell >{item.productPrice * item.quantity}</Table.Cell>
		  		</Table.Row>
		
			)
		}
			</Table.Body>
			<Table.Header>
      			<Table.Row >
      			  <Table.HeaderCell textAlign="center" style={{backgroundColor:"transparent"}}>Sub-Total</Table.HeaderCell>
      			  <Table.HeaderCell style={{backgroundColor:"transparent"}}> </Table.HeaderCell>
      			  <Table.HeaderCell style={{backgroundColor:"transparent"}}> </Table.HeaderCell>
				  <Table.HeaderCell style={{backgroundColor:"transparent"}}> </Table.HeaderCell>
  				  <Table.HeaderCell className="h5 text-danger">{totalPrice}</Table.HeaderCell>
      			</Table.Row>
			</Table.Header>
    		
		

	  </Table>
	 	
	  </>
	)
	
}

export default OrderSummary
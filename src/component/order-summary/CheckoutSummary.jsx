import React from 'react'
import { Header, Icon, Button, Item,Table } from 'semantic-ui-react'
import './CheckoutSummary.css'

const CheckoutSummary = ({cartItems,updateItemsHandler,taxCalculator,grandTotalCalculator}) =>{
	
	let subtotal=0;
	
	return(
		<div className="checkout-summary">
		<Header as='h4' icon textAlign='center'>
   			 <Icon name='cart arrow down' circular/>
    			Order Summary
 		</Header>
		 <Item.Group divided>
		 {
			cartItems.map(item=>{
				subtotal+=item.productID.price * item.quantity
			
				return <Item  key={item._id} className="px-2 m-0 py-2">
				 <Item.Content >
        			<Item.Header as='a'>{item.productID.name}</Item.Header>
        			<Item.Description  className="text-muted p-0 m-0" >
						{item.productID.description}
					</Item.Description>
        		 </Item.Content>		
          		 <Button.Group floated='right'>
      				<Button icon onClick={()=>updateItemsHandler(item._id,'ADD')}>
        				<Icon name='add' />
      				</Button>
      				<Button basic icon>
					  {item.quantity}
     				</Button>
      				<Button icon>
        				<Icon name='minus'  onClick={()=>updateItemsHandler(item._id,'MINUS')} />
      				</Button>
    			 </Button.Group>	
   				</Item>
			})
		 }
		 </Item.Group>
		
		
		<Table attached>
		 	<Table.Body>
		 	<Table.Row>
		 		<Table.Cell textAlign='right'>Subtotal</Table.Cell>
      			<Table.Cell textAlign='center'>₹ {subtotal}</Table.Cell>
			</Table.Row>
			<Table.Row>
		 		<Table.Cell textAlign='right'>Taxes & Charges</Table.Cell>
      			<Table.Cell textAlign='center'>{taxCalculator(subtotal)}</Table.Cell>
			</Table.Row>
			<Table.Row>
		 		<Table.Cell textAlign='right' className="h5">Grand Total</Table.Cell>
      			<Table.Cell textAlign='center' className="h5 text-danger">₹ {grandTotalCalculator(subtotal)}</Table.Cell>
			</Table.Row>
			</Table.Body>
         </Table>
		</div>
	)
}

export default CheckoutSummary
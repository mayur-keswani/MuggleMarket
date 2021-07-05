import React from 'react'
import { Header, Icon, Button, Item, Divider,Table } from 'semantic-ui-react'
import './CheckoutSummary.css'

const CheckoutSummary = ({cartItems,updateItemsHandler}) =>{
	let subtotal = 0;
	let grandTotal=0;
	const taxCalculator = (total) =>{
		const charges= (10*total)/100;
		grandTotal=subtotal+charges;
		return charges
	}

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
        			<Item.Description  className="text-muted p-0 m-0" verticalAlign='middle'>
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
		 	<Table.Row>
		 		<Table.HeaderCell textAlign='right'>Subtotal</Table.HeaderCell>
      			<Table.Cell textAlign='center'>₹ {subtotal}</Table.Cell>
			</Table.Row>
			<Table.Row>
		 		<Table.HeaderCell textAlign='right'>Taxes & Charges</Table.HeaderCell>
      			<Table.Cell textAlign='center'>{taxCalculator(subtotal)}</Table.Cell>
			</Table.Row>
			<Table.Row>
		 		<Table.HeaderCell textAlign='right' className="h5">Grand Total</Table.HeaderCell>
      			<Table.Cell textAlign='center' className="h5 text-danger">₹ {grandTotal}</Table.Cell>
			</Table.Row>
         </Table>
		</div>
	)
}

export default CheckoutSummary
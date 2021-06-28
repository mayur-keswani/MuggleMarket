import React,{useState,useContext} from 'react';
import OrderSummary from './OrderSummary'
import userContext from '../../context/user-context'
import './Cart.css'
import {Button,Grid} from 'semantic-ui-react'

const Cart = ({totalItems}) =>{
	const [showCartItems,toggleCart] = useState(false)
	const {globalState} = useContext(userContext)
	const {totalPrice} = globalState
	
	return(
		showCartItems?
		<div className="bg-dark fixed-bottom" style={{height:"50vh"}}>
			<Button circular icon="chevron circle down" 
				size="massive" 
				className="" 
				color="teal"
				onClick={()=>toggleCart(false)} />
			<OrderSummary/>
			<Button className="d-block my-3 mx-auto" size="massive" color="green">Continue</Button>
		</div>
		:

		<Grid className="order-summary fixed-bottom m-0 p-0" padded color="teal" columns='equal' >
      		<Grid.Column color="teal" style={{boxSizing:"border-box"}} >
				  <Button circular 
					icon="chevron circle up" 
					size="massive" 
					className="cart-toggler mx-4 p-0" 
					color="teal"
					onClick={()=>toggleCart(true)}  />
				  <span className="text-lead "> Your Order ({totalItems})</span>		
				</Grid.Column>
				
				<Grid.Column 
					color="teal" 
					textAlign='left' 
					style={{boxSizing:"border-box"}}>
						<p className="text-lead"> Subtotal : 
							<span className="text-danger"> {totalPrice}</span> 
						</p>
				</Grid.Column>
				<Grid.Column textAlign='left' color="teal">
					<Button floated='right'  className="my-0" size="large" color="green">Continue</Button>	
				</Grid.Column>
			</Grid>

	)
}

export default Cart
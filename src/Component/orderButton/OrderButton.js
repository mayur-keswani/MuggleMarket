import React,{useContext} from 'react'
import userContext from '../../context/user-context'
import {Item,Button,Icon} from 'semantic-ui-react'
import { ADD_TO_CART,REMOVE_FROM_CART } from '../../context/action-types'


const OrderButton = (props) =>{
	const {globalState,dispatch} = useContext(userContext)
	const{ selectedItems } = globalState;

	const addToCart = (id,price) =>{
		console.log(id)
		dispatch({type:ADD_TO_CART,payload:{id:id,price:price}})
	}
	const removeFromCart = (id,price) =>{
		dispatch({type:REMOVE_FROM_CART,payload:{id:id,price:price} })
	}

	return (
		selectedItems.hasOwnProperty(props.pid.toString()) 
		?
			<Button.Group floated='right' className="mx-5" color="teal" >
				<Button  icon='add' onClick={()=>addToCart(props.pid,props.price)}/>
				<Button content>{selectedItems[props.pid.toString()]}</Button>
				<Button icon='minus' 
					disabled={selectedItems[props.pid.toString()]<=0} 
					onClick={()=>removeFromCart(props.pid,props.price)}/>
			</Button.Group> 
		:
		<Item.Extra >
			<Button animated='vertical' floated='right' className="mx-5" 
				onClick={()=>addToCart(props.pid,props.price)}>
				<Button.Content hidden><Icon name='shop' /></Button.Content>
				<Button.Content visible>ADD TO CART</Button.Content>
			</Button>     	
		</Item.Extra>
	)
}


export default OrderButton
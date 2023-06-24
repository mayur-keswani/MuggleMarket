import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom' 
import { ADD_TO_CART } from '../../context/action-types'
import {UserContext} from '../../context/user-context'

const MyOrder = ({order}) =>{
	const {dispatch} = useContext(UserContext)
	const navigate = useNavigate()

	const orderAgainHandler= (product) =>{
		dispatch({type:ADD_TO_CART,payload:{id:product._id,name:product.name,price:product.price}})
		navigate('/store/'+product.storeID)
	}
	return(
	<div className="order-section mx-3 px-2">
	 <h6><b>Order id: </b><span className="text-secondary">{order._id}</span></h6>
	 <p><b>By: </b>{order.user.username}</p>
	 <p><b>Deliver At: </b>{order.user.address}</p>
	 <p><b>Amount (grand-total): </b>
	 	<span className="text-danger h6">₹{order.grand_total} (including ₹{order.charges} taxes/charges)</span>
	 </p>
	  {/* <Item.Group>
		{
			order.items.map(item=>
			<Item className="mx-3" key={item._id}>
			<Item.Image size="small" src={item.product_pic}/>
      		<Item.Content verticalAlign='middle'>
        		<Item.Header>{item.name}</Item.Header>
        		<Item.Description>{item.description}</Item.Description>
				<Item.Description className="text-danger h6">{item.price}*{item.quantity} = {item.price*item.quantity}</Item.Description>
        		<Item.Extra className="mx-5">
         		 <Button color="teal" onClick={()=>orderAgainHandler(item.productID)}>Buy Again</Button>
        		</Item.Extra>
      		</Item.Content>
    		</Item>
			)
		}		
		<Divider/>
	  </Item.Group> */}
	</div>
	
	)
}

export default MyOrder
import React,{useState,useEffect,useContext} from 'react';
import UserDetails from '../../component/user-details/UserDetails';
import userContext from '../../context/user-context';
import {Button,Icon,Divider,Grid,Message} from 'semantic-ui-react'
import { Spinner } from '../../component/ui/spinner/Spinner';
import CheckoutSummary from '../../component/order-summary/CheckoutSummary';
const Checkout = () =>{
	const [user,setUser] = useState()
	const [cartItems,setCartItem] = useState([])
	const {globalState}= useContext(userContext)
	const {token} = globalState;
	const fetchUserDetails= () =>{
		fetch('http://localhost:8080/auth-details/',{
			method: 'GET',
			headers: {
				'Authorization':token,
				'Content-Type': 'application/json',		
			}
		})
		.then(response=>{
			if(response.status!==200)
				throw new Error("Couldn't able to fetch details'")

			return response.json()
		})
		.then(response=>{
			console.log(response.user)
			setUser(response.user)
			setCartItem(response.user.cart)
		})
		.catch(error=>{
			console.log(error)
		})
	}
	useEffect(()=>{
		fetchUserDetails()
	},[])
	 
	const updateItemsHandler = (itemID,type)=>{
		
			setCartItem((prevState)=>{
				const updatedItems=prevState.map(item=>{
					if(item._id.toString()===itemID.toString()){
						type==='ADD'? item.quantity+=1 : item.quantity-=1
						return item
					}else{
						return item
					}
				})

				return updatedItems
			})
		
	}
	return(
		<>
		<div className="checkout-header px-5 py-2 my-0 d-flex align-items-center">
		<Button animated  basic size="small">
      		<Button.Content visible>Back to Home</Button.Content>
      		<Button.Content hidden>
        	<Icon name='arrow left' />
      		</Button.Content>
    	</Button>
		<span className="h4 mx-5">MuggleMarket</span>
		</div>
		<Divider/>
		{
			!user?
			<Spinner/>
			:
			<Grid>
      			<Grid.Column mobile={16} tablet={11} computer={11}>
        			<UserDetails username={user.username} email={user.email}/>
      			</Grid.Column>


      			<Grid.Column mobile={16} tablet={4} computer={5} className='text-center'>
        			<CheckoutSummary cartItems={cartItems} updateItemsHandler={updateItemsHandler}/>
					<Message warning>
    					<Message.Header>Note:</Message.Header>
    					<p>Order once placed cannot be cancelled and it is non-refundable</p>
  					</Message>
					<Button primary size='huge'>Place Order</Button>
      			</Grid.Column>
			</Grid>
		}


		{/* <OrderSummary/> */}
		
		</>
	)
}

export default Checkout
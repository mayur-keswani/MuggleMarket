import React,{useState,useEffect,useContext} from 'react';
import UserDetails from '../../component/user-details/UserDetails';
import { Spinner } from '../../component/ui/spinner/Spinner';
import ModalWrapper from '../../component/ui/modal-wrapper/ModalWrapper'
import CheckoutSummary from '../../component/order-summary/CheckoutSummary';
import OrderPlaceResult from '../../component/order-place-result/OrderPlaceResult';
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../context/user-context';
import {Button,Icon,Divider,Grid,Message} from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import { FetchUserDetails, PlaceOrder, ProcessCardPayment } from './CheckoutHelper';


const Checkout = () =>{
	const [user,setUser] = useState()
	const [cartItems,setCartItem] = useState([])
	const [grandTotal,setGrandTotal]= useState(0);
	const [charges,setCharges] = useState(0);
	const [selectedAddress,onSelectAddress] = useState("")
	const [ paymentMethod,setPaymentMethod]= useState("cash")
	const [ordered,onOrderPlaced]=useState({flag:false,status:null,message:null});
	const [invoice,setInvoice]=useState("")
	

	const {globalState}= useContext(UserContext)
	const {token} = globalState;
	const navigate = useNavigate()

	const fetchUserDetails= () =>{

		FetchUserDetails(token,(response)=>{
			setUser(response.user)
			setCartItem(response.user.cart)
		})
	}
	useEffect(()=>{
		fetchUserDetails()
	},[])
	 
	

	const taxCalculator = (subtotal) =>{
		const temp= (10*subtotal)/100;
		setCharges(temp)
		return temp
		
		
	}
	const grandTotalCalculator = ( subtotal )=>{
		setGrandTotal(subtotal+charges);
		return (grandTotal)
	} 

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
   
	

	
	const orderHandler = (receipt_url) =>{
		
		const orderItems=cartItems.map(item=>{
			return {  
					productID:item.productID._id,
					name:item.productID.name,
					description:item.productID.description,
					product_pic:item.productID.product_pic,
					quantity:item.quantity,
					price:item.productID.price,
					storeID:item.productID.storeID,	
			}
		})
		const data = {
			address:selectedAddress,
			charges:charges,
			grandTotal:grandTotal,
			username:user.username,
			items:(orderItems)
		}
		
		PlaceOrder(data,token,(flag,message)=>{
			if(flag){
				onOrderPlaced({flag:true,status:"success",message:message})
				receipt_url?setInvoice(receipt_url):setInvoice("")
			}else{
				onOrderPlaced({flag:true,status:"fail",message:message})
			}
		})

	}


	const tokenHandler=(stripe_token)=>{
	
		const items=cartItems.map(item=>{
			return {  
					productID:item.productID._id,
					name:item.productID.name,
					quantity:item.quantity,
					price:item.productID.price,
					storeID:item.productID.storeID,	
			}
		})
		const payload = {
			token:stripe_token,
			address:selectedAddress,
			price:(grandTotal),
			username:user.username,
			items:(items)
		}
		
		ProcessCardPayment(payload,token,(result)=>{
			orderHandler(result.result.receipt_url)
		})
	
	}


	const PaymentMethod=()=>{
		if(paymentMethod==='card')
		  return (
		  	<StripeCheckout 
			  stripeKey="pk_test_51HVGjHGKjVBYc4dGvOFKHshkMEK5GYzoBEH6KyBWv5n4m67Z7rQ4lvA4wdb7NJdVXT9U2f6mIaExZ3EjX1paeHrc00qf5KTKsK"
			  name="Muggle Market"
			  token={tokenHandler}
			  amount={(grandTotal*100)}
			  shippingAddress
			  billingAddress>
			 <button className="btn btn-warning px-3 py-2 btn-lg fw-bold" size='huge'>Enter Card-Details</button> 
		  	</StripeCheckout>)
		
		else 
		  return  (
		  	<Button primary size='huge' onClick={()=>orderHandler("")}>Place Order</Button>
		 )
	}


	return(
		<>
		<div className="checkout-header px-5 py-2 my-0 d-flex align-items-center">
		<Button animated  basic size="small" onClick={()=> navigate(-1)}>
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
        			<UserDetails username={user.username} 
						email={user.email} 
						selectedAddress={selectedAddress} 
						onSelectAddress={(address)=>onSelectAddress(address)}
						changePaymentMethod={setPaymentMethod}
						/>
      			</Grid.Column>


      			<Grid.Column mobile={16} tablet={4} computer={5} className='text-center'>
        			<CheckoutSummary 
						cartItems={cartItems} 
						updateItemsHandler={(itemID,type)=>updateItemsHandler(itemID,type)} 
						taxCalculator={taxCalculator}
						grandTotalCalculator={grandTotalCalculator}
						/>
					<Message warning>
    					<Message.Header>Note:</Message.Header>
    					<span>Order once placed cannot be cancelled and it is non-refundable</span>
  					</Message>
					{/* <Button primary size='huge' onClick={orderHandler}>Place Order</Button> */}
					{PaymentMethod()}
      			</Grid.Column>
			</Grid>
		
		}
			<ModalWrapper isOpen={ordered.flag} closeModal={()=>onOrderPlaced({flag:false,message:null,status:null})}>
					<OrderPlaceResult  
						status={ordered.status} 
						message={ordered.message} 
						invoice={invoice}
						closeModal={()=>onOrderPlaced({flag:false,message:null,status:null})}/>
			</ModalWrapper>
		
		</>
	)
}

export default Checkout
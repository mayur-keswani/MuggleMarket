import React,{useState,useEffect,useContext} from 'react'
import MyOrder from '../../component/my-order/MyOrder'
import {useHistory} from 'react-router-dom'
import {Header,Icon,Button,Divider,Item} from 'semantic-ui-react'
import userContext from '../../context/user-context'
import { Spinner } from '../../component/ui/spinner/Spinner'


const MyOrders = () =>{
	const [orders,setOrders] = useState(null)
	const history = useHistory()
	const {globalState} = useContext(userContext)
	const {token} = globalState;

	const fetchMyOrders = () =>{
		fetch('/my-orders',{
			method:"GET",
			headers:{
				'Authorization' :token || JSON.parse(localStorage.getItem('token'))
			}
		}).then(response=>{
			if(response.status!==200)
				throw new Error("Couldnt able to fetch orders");

			return response.json()
		}).then(result=>{
			setOrders(result.orders)
		}).catch(error=>{
			console.log(error)
		})
	}
	useEffect(()=>{
		fetchMyOrders()
	},[])
	return(
		<>
		<div className="checkout-header px-5 py-2 my-0 d-flex align-items-center">
		<Button animated  basic size="small" onClick={()=> history.goBack()}>
      		<Button.Content visible>Back to Home</Button.Content>
      		<Button.Content hidden>
        	<Icon name='arrow left' />
      		</Button.Content>
    	</Button>
		<span className="h4 mx-5"><b>MuggleMarket</b></span>
		</div>
		<Divider/>
		<Header as='h2' className='m-2 px-3'>
			<Icon name='opencart' />
			<Header.Content>
		 		 Your Orders
		  		<Header.Subheader>with MuggleMarket</Header.Subheader>
			</Header.Content>
	  	</Header>

		{
			(!orders)
			?
				<Spinner/>
			:
			 (!orders.length)
			  ?
			   <div> No Orders Yet </div>
			  :
			  <Item.Group relaxed >
			  {
				orders.map(order=>
					<>
					<MyOrder order={order} key={order._id}/>
			
					</>
				 )
			  }
			  </Item.Group>
			 
			 	
		}
			
		</>
	)
}

export default MyOrders
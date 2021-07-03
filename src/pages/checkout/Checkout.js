import React,{useState,useEffect,useContext} from 'react';
import UserDetails from '../../component/user-details/UserDetails';
import userContext from '../../context/user-context';
import {Button,Icon,Divider,Grid,Image} from 'semantic-ui-react'
import { Spinner } from '../../component/ui/spinner/Spinner';
const Checkout = () =>{
	const [user,setUser] = useState()
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
		})
		.catch(error=>{
			console.log(error)
		})
	}
	useEffect(()=>{
		fetchUserDetails()
	},[])
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
      			<Grid.Column mobile={16} tablet={4} computer={5}>
        			<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      			</Grid.Column>
			</Grid>
		}


		{/* <OrderSummary/> */}
		
		</>
	)
}

export default Checkout
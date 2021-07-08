import React, { useEffect, useState, useContext } from 'react'
import Store from '../../component/store/Store'
import userContext from '../../context/user-context'
import {SET_LOADING} from '../../context/action-types'
import {Header,Grid, Segment,Image,Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import empty_state from './empty_state.svg'
import {Spinner} from '../../component/ui/spinner/Spinner'

const Stores = () =>{
	const [stores,setStores] = useState([])
	const {globalState,dispatch}= useContext(userContext)
	const { isLoading }= globalState;

	const fetchStores =()=>{
		dispatch({type:SET_LOADING,payload:true})
		fetch('https://mugglemarket.herokuapp.com/',{
			method:"GET"
		}).then(response=>{
			if(response.status!==200){
				throw new Error("Could'nt able to Fetch Stores")
			}
			else
				return response.json()
		}).then(result=>{
			dispatch({type:SET_LOADING,payload:false})
			setStores(result.stores)
		}).catch(error=>{
			dispatch({type:SET_LOADING,payload:false})
			console.log(error)
		})
	}
	useEffect(()=>{
		fetchStores()
		return () => {
			setStores([]); // This worked for me
		  };
	},[])
	
	return(
		isLoading?
		<Spinner/>
		:
		stores.length?
			<>
			<h2 className="mx-4 text-muted">Top brands in spotlight</h2>
			<Grid stackable columns={5} className="mt-3">
			{		
		  	 stores.map(store=>
			 	<Grid.Column key={store._id} className="mx-3">
					<Segment className="d-flex justify-content-center m-0 p-0">
						<Store store={store}/>
					</Segment>
			   	</Grid.Column>
			 )
		 	}
			</Grid>
			<div className="m-4 p-4 bg-light" style={{border:"2px dotted black"}}>
			<div className='m-2 h2'>Partner with Muggle-Market</div>
			<p className="h5 mx-3 text-lead">for free and get more customers!</p>
			<div>
    			<Button as={Link} to="/partner_with_us"  positive  size='large' className="mx-3 px-5">Register Your Store</Button>	
  			</div>
	    	</div>
			</>
			:
			<>
			<Image src={empty_state} centered style={{height:"35vh"}}/>
			<Header textAlign='center' className="text-muted ">Oops! No Store Found</Header>
			</>
		
    )

}

export default Stores
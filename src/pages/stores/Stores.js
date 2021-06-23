import React, { useEffect, useState, useContext } from 'react'
import Store from '../../Component/Store/Store'
import userContext from '../../context/user-context'
import {SET_LOADING} from '../../context/action-types'
import {Header,Grid, Segment,Image} from 'semantic-ui-react'
import empty_state from './empty_state.svg'
import {Spinner} from '../../Component/UI/Spinner/Spinner'

const Stores = () =>{
	const [stores,setStores] = useState([])
	const {globalState,dispatch}= useContext(userContext)
	const { isLoading }= globalState;

	const fetchStores =()=>{
		dispatch({type:SET_LOADING,payload:true})
		fetch('http://localhost:8080/',{
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
			<Grid stackable columns={4}>
			{		
		  	 stores.map(store=>
			 	<Grid.Column key={store._id}>
					<Segment className="d-flex justify-content-center mx-0 px-0">
						<Store store={store}/>
					</Segment>
			   	</Grid.Column>
			 )
		 	}
			</Grid>
			:
			<>
			<Image src={empty_state} centered style={{height:"35vh"}}/>
			<Header textAlign='center' className="text-muted ">Oops! No Store Found</Header>
			</>
		
		

		
    )
}

export default Stores
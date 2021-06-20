import React, { useEffect, useState } from 'react'
import Store from '../../Component/Store/Store'
import {Header,Grid, Segment,Image} from 'semantic-ui-react'
import empty_state from './empty_state.svg'


const Stores = () =>{
	const [stores,setStores] = useState([])
	const fetchStores =()=>{
		fetch('http://localhost:8080/',{
			method:"GET"
		}).then(response=>{
			if(response.status!==200){
				throw new Error("Could'nt able to Fetch Stores")
			}
			else
				return response.json()
		}).then(result=>{
			setStores(result.stores)
		}).catch(error=>{

		})
	}
	useEffect(()=>{
		fetchStores()
	},[])
	
	return(
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
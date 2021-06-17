import React, { useEffect, useState } from 'react'
import Store from '../../Component/Store/Store'
import {Grid, Segment} from 'semantic-ui-react'

const Stores = () =>{
	const [stores,setStores] = useState("")
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
		<Grid stackable columns={4} >
		{
			stores?
			stores.map(store=>
				<Grid.Column key={store._id}>
		    		<Segment>
						<Store store={store}/>
					</Segment>
		  		</Grid.Column>
			)
			:
			<h2>No stores detected</h2>
		}
		
		</Grid>
		
    )
}

export default Stores
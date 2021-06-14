import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
const SubmitForm = () =>{

	const history=useHistory()
	const submitFormHandler = () =>{
	//	const outletDetails=JSON.parse(localStorage.getItem('outletDetails'))
		axios.post('localhost:8080/create-your-store',{"storeName":"Mayur Store"})
			.then(response=>{
					console.log(response)
			}).catch(error=>{
				console.log(error)
			})
		history.push('/')
	}
	return(
		<Segment placeholder>
    		<Header icon>
      			<Icon name='shopping bag' />
      			Only One-step to Go 🚀:-
    		</Header>
    		<Button primary onClick={submitFormHandler}>Create Store</Button>
	  	</Segment>
	)
}

export default SubmitForm
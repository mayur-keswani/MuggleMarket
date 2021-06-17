import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import userContext from '../../context/user-context'
const SubmitForm = () =>{
	const [errorMessage,setErrorMessage] = useState("")
	const history=useHistory()
	const {globalState} = useContext(userContext)
	const {token} = globalState

	const submitFormHandler = () =>{
		const outletDetails=JSON.parse(localStorage.getItem('outletDetails'))
		console.log(JSON.stringify(outletDetails))
		fetch('http://localhost:8080/create-your-store',{
			method:"POST",
			body:JSON.stringify(outletDetails),
			headers:{
				'Authorization':token,
				'Content-Type':'application/json'
			}
		})
		.then(response=>{
			if(response.status===422){
				throw new Error("Validation Failed")
			}
			if(response.status!==200 && response.status!==201){
				throw new Error("Couldn't able to create store")
			}
			else{
				return response.json()
			}
		}).then(store=>{
			console.log(store)
			history.push('/')
		}).catch(error=>{
			setErrorMessage(error.message)
		})
		
	}

	
	return(
		<Segment placeholder>
			{errorMessage?<div className="text-center text-danger h3">{errorMessage}</div>:""}
    		<Header icon>
      			<Icon name='shopping bag' />
      			Only One-step to Go 🚀
    		</Header>
    		<Button primary onClick={submitFormHandler}>Proceed</Button>
	  	</Segment>
	)
}

export default SubmitForm
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Header, Icon, Segment, Image } from 'semantic-ui-react'

import userContext from '../../context/user-context'

const SubmitForm = () =>{
	const [errorMessage,setErrorMessage] = useState("")
	const [storeImage,setStoreImage] = useState("")
	const history=useHistory()
	const {globalState} = useContext(userContext)
	const {token} = globalState

	const submitFormHandler = () =>{
		console.log(token)
		const outletDetails=JSON.parse(localStorage.getItem('outletDetails'))

		const formData = new FormData();
		formData.append('description',outletDetails.description)
		formData.append('address',outletDetails.address)
		formData.append('storeName',outletDetails.storeName)
		formData.append('city',outletDetails.city)
		formData.append('openingTime',outletDetails.openingTime)
		formData.append('closingTime',outletDetails.closingTime)
		formData.append('contactNo',outletDetails.contactNo)	
		formData.append('landlineNo',outletDetails.landlineNo)	
		formData.append('ownerName',outletDetails.ownerName)
		formData.append('personalNo',outletDetails.personalNo)
		formData.append('storeType',outletDetails.storeType)
		formData.append('yearOfEstablishment',outletDetails.yearOfEstablishment)
		formData.append('personalWebsite',outletDetails.personalWebsite)
		formData.append('facebook',outletDetails.facebook)
		formData.append('instagram',outletDetails.instagram)
		formData.append('youtube',outletDetails.youtube)
		formData.append('storeImage',storeImage)
		console.log(formData.get('storeImage'))

		fetch('http://localhost:8080/create-your-store',{
			method:"POST",
			body:formData,
			headers:{
				'Authorization':token.token,	
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

	let imageURL;
	if(storeImage){
		imageURL = URL.createObjectURL(storeImage)
	}else{
		imageURL=""
	}
	return(
		<Segment placeholder>
			{errorMessage?<div className="text-center text-danger h3">{errorMessage}</div>:null}


    		<Header icon>
      			<Icon name='shopping bag' />
      			Only One-step to Go 🚀
    		</Header>
			<div  className='text-center'> 		
				<Image
      			 centered
				 className="store_image rounded-circle"
      			 src={imageURL}/>
			<br/>
			&nbsp;
			<input type="file" name="storeImage"
				onChange={(e)=>
					setStoreImage(e.target.files[0])
					}/>
     	 	<p className="text-muted" style={{fontSize:"1.5rem"}}>Store Image</p>	
    	    </div>
    		<Button primary onClick={submitFormHandler}>Proceed</Button>
	  	</Segment>
	)
}

export default SubmitForm
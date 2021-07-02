import React ,{useState} from 'react'
import ModalWrapper from '../ui/modal-wrapper/ModalWrapper'
import SubmitForm from '../../pages/create_your_store/SubmitForm'
import {Header,Form,Divider,Button,Icon,Input} from 'semantic-ui-react'



const InputForm2 = () =>{
	const [outletDetails,setOutletDetails] = useState({
		storeType:"",
		yearOfEstablishment:"",
		openingTime:"",
		closingTime:"",
		personalWebsite:"",
		instagram:"",
		facebook:"",
		youtube:""

	})
	const [showConfirmBox,toggleConfirmBox] = useState(false)


	const submitFormHandler = () =>{
		let prevDetails=JSON.parse(localStorage.getItem('outletDetails'))
		let newDetails={...prevDetails,...outletDetails}
		localStorage.setItem('outletDetails',JSON.stringify(newDetails))

		toggleConfirmBox(true);
	}


	return(<>
	 <div>
		 {
			showConfirmBox?
			<ModalWrapper 
				isOpen={showConfirmBox} 
				closeModal={()=>toggleConfirmBox((prevState)=> !prevState)}
				title="">
				<SubmitForm/>
			</ModalWrapper>:""
		}
		<Header as="h1">Outlet Type & Timings</Header>
		<Divider/>
		
		
		
		<Form>	
			<Form.Field>
    		  <input placeholder='Store type (eg.Clothes,Cafe,Cosmetics)' 
			  	value={outletDetails.storeType}
				onChange={(event)=>setOutletDetails({...outletDetails,storeType:event.target.value}) }
				  />
    		</Form.Field>
			<Form.Field>
    		  <input type="text" placeholder='Your year of Establishment? (optional)' 
			  	value={outletDetails.yearOfEstablishment}
				onChange={(event)=>setOutletDetails({...outletDetails,yearOfEstablishment:event.target.value}) }
			  />
    		</Form.Field>

			<Form.Field>
    		  <Form.Input type="time" label="Opening Time" placeholder='Opening time'  
			  	value={outletDetails.openingTime} 
				onChange={(event)=>setOutletDetails({...outletDetails,openingTime:event.target.value}) }	  
				/>
    		</Form.Field>
    		<Form.Field>
				<Form.Input type="time" label="Closing Time" placeholder='Closing time' 
					value={outletDetails.closingTime}
					onChange={(event)=>setOutletDetails({...outletDetails,closingTime:event.target.value}) }
				 />
    		</Form.Field>

			<Divider/>
			<h3>Social</h3>
			<Form.Group widths='equal'>
			  <Form.Field>
    		    <Input type="url" label="Personal Website" placeholder='eg: www.yourStore.com' 
			    	value={outletDetails.personalWebsite}
			  		onChange={(event)=>setOutletDetails({...outletDetails,personalWebsite:event.target.value}) }
			    />
    		  </Form.Field>
			  <Form.Field>
    		      <Input type="url" label='Instagram' placeholder="eg: https://www.instagram.com/yourName/" 
			    	value={outletDetails.instagram}
			  		onChange={(event)=>setOutletDetails({...outletDetails,instagram:event.target.value}) }
			    />
    		  </Form.Field>
			</Form.Group>

			<Form.Group widths='equal'>
			  <Form.Field>
    		    <Input type="url" label='Facebook' placeholder="eg: https://www.facebook.com/yourName" 
			    	value={outletDetails.facebook}
			  		onChange={(event)=>setOutletDetails({...outletDetails,facebook:event.target.value}) }
			    />
    		  </Form.Field>
			  <Form.Field>
    		    <Input type="url" label='Youtube' 
			    	value={outletDetails.youtube}
			 	 	onChange={(event)=>setOutletDetails({...outletDetails,youtube:event.target.value}) }
			    />
    		  </Form.Field>

			</Form.Group>


			
			<Button animated   size="huge" className="my-5" color='blue' onClick={submitFormHandler}>
     			<Button.Content visible>Create Store</Button.Content>
      			<Button.Content hidden>
        			<Icon name='arrow right' />
      			</Button.Content>
    		</Button>

		</Form>
	 </div>
	</>)
}

export default InputForm2
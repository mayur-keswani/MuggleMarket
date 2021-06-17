import React ,{useState} from 'react'
import ModalWrapper from '../UI/ModalWrapper/ModalWrapper'
import SubmitForm from '../../pages/create_your_store/SubmitForm'
import {Header,Form,Divider,Button,Icon,Image} from 'semantic-ui-react'



const InputForm2 = () =>{
	const [outletDetails,setOutletDetails] = useState({
		storeType:"",
		yearOfEstablishment:"",
		openingTime:"",
		closingTime:"",
	})
	const [showConfirmBox,toggleConfirmBox] = useState(false)


	const submitFormHandler = () =>{
		let prevDetails=JSON.parse(localStorage.getItem('outletDetails'))
		let newDetails={...prevDetails,...outletDetails}
		console.log(newDetails)
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
		
		<div  className='text-center'>
			<Image
      			centered
				className="store_image rounded-circle"
      			src='https://st2.depositphotos.com/3682225/11139/v/600/depositphotos_111391738-stock-illustration-store-icon-retail-vector-front.jpg'
				alt="store"
    		/><br/>
			&nbsp;<i><b>update</b></i><Icon name="edit" size="large"/>
     	 	<p className="text-muted" style={{fontSize:"1.5rem"}}>Store Image</p>	
    	</div>
		
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

			<Button animated centered  size="huge" className="my-5" color='blue' onClick={submitFormHandler}>
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
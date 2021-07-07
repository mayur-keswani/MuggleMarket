import React ,{ useState,useContext, useEffect} from 'react'
import userContext from '../../context/user-context'
import {Header,Form,Divider,Button,Icon} from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const InputForm1 = () =>{

	const [outletDetails,setOutletDetails] = useState({
		storeName:"",
		description:"",
		city:"",
		address:"",
		contactNo:"",
		landlineNo:"",
		ownerName:"",
		personalNo:"",
	})

	const {globalState} = useContext(userContext)
	const {editStoreKey,editStore} = globalState;

	useEffect(()=>{
		if(editStoreKey){
			console.log(editStoreKey)
			setOutletDetails({
				storeName:editStore.name||"",
				description:editStore.description||"",
				city:editStore.city||"",
				address:editStore.address||"",
				contactNo:editStore.contact_no||"",
				landlineNo:editStore.landline_no||"",
				ownerName:editStore.owner||"",
				personalNo:editStore.personal_no||"",
			})
		}
	},[])
	const history = useHistory()
	const submitFormHandler = () =>{
		localStorage.setItem('outletDetails',JSON.stringify(outletDetails))
		history.push('/create-your-store/2')
	}

	return(<>
	 <div>
		<Header as="h1">Outlet Details</Header>
		<Divider/>
		<h3>Store Details</h3>
		<p className="text-muted">
			Name, address, Location
		</p>
		
		<Form>
    		<Form.Field>
    		  <input placeholder='Store Name' 
			  	value={outletDetails.storeName}
				onChange={(event)=>setOutletDetails({...outletDetails,storeName:event.target.value})} />
    		</Form.Field>
			<Form.Field>
				<Form.TextArea placeholder='Brief Description' 
					value={outletDetails.description}
					onChange={(event)=>setOutletDetails({...outletDetails,description:event.target.value})} />
    		</Form.Field>
			<Form.Field>
    		  <input placeholder='City' 
			  	value={outletDetails.city}
				onChange={(event)=>setOutletDetails({...outletDetails,city:event.target.value})} />
    		</Form.Field>
    		<Form.Field>
				<Form.TextArea placeholder='Store complete address' 
					value={outletDetails.address}
					onChange={(event)=>setOutletDetails({...outletDetails,address:event.target.value})} />
    		</Form.Field>


			<h3>Contact number at store</h3>
			<p className="text-muted">
				Your customer will call on this number for general enquiries
			</p>
			<Form.Field>
    		  <input placeholder='Mobile number at store' 
			  	value={outletDetails.contactNo}
				onChange={(event)=>setOutletDetails({...outletDetails,contactNo:event.target.value})}
				  />
    		</Form.Field>
			<Divider horizontal>Or want to share landline number</Divider>
			<Form.Field>
    		  <input placeholder='landline number with std code' 
			  	value={outletDetails.landlineNo}
				onChange={(event)=>setOutletDetails({...outletDetails,landlineNo:event.target.value})}
			  />
    		</Form.Field>

			<h3>Outlet owner details</h3>
			<p className="text-muted">
				These will be used to share revenue related communications
			</p>

    		<Form.Group width="equal">
				<Form.Input  placeholder='Outlet owner fullname' 
					value={outletDetails.ownerName}
					onChange={(event)=>setOutletDetails({...outletDetails,ownerName:event.target.value})}
				/>
				<Form.Input  placeholder='Personal no.' 
					value={outletDetails.personalNo}
					onChange={(event)=>setOutletDetails({...outletDetails,personalNo:event.target.value})}
					/>
    		</Form.Group>

			<Button animated floated="right" size="huge" className="mx-5" color='blue' onClick={submitFormHandler}>
     			<Button.Content visible>Next</Button.Content>
      			<Button.Content hidden>
        			<Icon name='arrow right' />
      			</Button.Content>
    		</Button>
		</Form>
	 </div>
	</>)
}

export default InputForm1
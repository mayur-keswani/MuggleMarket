import React , {useState} from 'react'
import MenuItems from '../MenuItems/MenuItems'
import ModalWrapper from '../UI/ModalWrapper/ModalWrapper'
import {Header,Image,Divider,Icon} from 'semantic-ui-react'
import SubmitForm from '../../pages/create_your_store/SubmitForm'

const InputForm3 = () =>{
	const [showConfirmBox,toggleConfirmBox] = useState(false)
	
	const submitFormHandler = (items) =>{
		let prevDetails=JSON.parse(localStorage.getItem('outletDetails'))
		let newDetails={...prevDetails,items}
		console.log(newDetails)
		localStorage.setItem('outletDetails',JSON.stringify(newDetails))

		toggleConfirmBox(true);
	}
	// console.log(showConfirmBox)
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
		<Header as="h2">Upload Photos</Header>
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
		<div className="menu-items-entry p-4 text-center" style={{overflowX: "scroll"}}>
			<h3>Add Items</h3>
			<MenuItems submitForm={submitFormHandler}/>
		</div>
		
	 </div>
	</>)
}

export default InputForm3
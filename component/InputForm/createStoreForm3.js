import React , {useState} from 'react'
import MenuItems from '../menu-items/MenuItems'
import {Form,Input} from 'semantic-ui-react'


const InputForm3 = () =>{
	
	const [avgExpense,setAvgExpense] = useState("200")
	const submitFormHandler = (items) =>{
		let prevDetails=JSON.parse(localStorage.getItem('outletDetails'))
		let newDetails={...prevDetails,items,avgExpense}
		console.log(newDetails)
		localStorage.setItem('outletDetails',JSON.stringify(newDetails))

	}
	// console.log(showConfirmBox)
	return(<>
	 <div>	
		
		<Form>
		<Form.Field>
    		  <Input placeholder='Mobile number at store' 
			  	label="Average Expense"
			  	value={avgExpense}
				onChange={(event)=>setAvgExpense(event.target.value)}
				  />
    	</Form.Field>
		</Form>
		<div className="menu-items-entry p-4 text-center" style={{overflowX: "scroll"}}>
			<h3>Add Items</h3>
			<MenuItems submitForm={submitFormHandler}/>
		</div>
		
	 </div>
	</>)
}

export default InputForm3
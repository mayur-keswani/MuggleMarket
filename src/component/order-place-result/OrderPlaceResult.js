import React from 'react'
import { useHistory } from 'react-router-dom'
import {Icon,Header,Button} from 'semantic-ui-react'

const OrderPlaceResult  = ({status,message,closeModal}) =>{
	console.log(status,message)
	const history= useHistory()
	return (
		status==='success'?
			
		<div className="text-center">
    		<Header as='h2' icon textAlign='center'  color='teal'>
      			<Icon name='cloud upload' circular />
     	 			Order Status
				<Header.Subheader>
      				{message}
    			</Header.Subheader>
    		</Header>
			<Button size='huge' color='green' onClick={()=>history.push('/')}>Continue Shopping!</Button>
  		</div>
		:
		<div className="text-center">
    		<Header as='h2' icon textAlign='center'  color='grey'>
      			<Icon name='warning' circular />
     	 			Order Status
				<Header.Subheader>
      				{message}
    			</Header.Subheader>
    		</Header>
			<Button size='huge' color='red' onClick={closeModal}>Try Again</Button>
  		</div>
	)
}
export default OrderPlaceResult
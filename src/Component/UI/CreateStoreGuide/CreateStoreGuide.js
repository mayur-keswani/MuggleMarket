import React from 'react'
import { Icon, Step } from 'semantic-ui-react'

const CreateStoreGuide = (props) =>{
    const isCompleted=(step_no)=>{
		if(step_no<props.page){
			return true
		}
		else{
			return false
		}
	}


	return(
		<Step.Group vertical>
		<Step completed={isCompleted(1)}>
		  <Icon name='info' />
		  <Step.Content>
			<Step.Title>Outlet Information</Step.Title>
			<Step.Description>Store name, address, contact no.,<br/> owner details</Step.Description>
		  </Step.Content>
		</Step>
		<Step completed={isCompleted(2)}>
		  <Icon name='time' />
		  <Step.Content>
			<Step.Title>Outlet Type & Timings</Step.Title>
			<Step.Description>Establishment and Opening hours</Step.Description>
		  </Step.Content>
		</Step>
	
		<Step completed={isCompleted(3)}>
		  <Icon name='photo' />
		  <Step.Content>
			<Step.Title>Upload Items</Step.Title>
			<Step.Description>store-items,product images</Step.Description>
		  </Step.Content>
		</Step>
	  </Step.Group>
	)
}
export default CreateStoreGuide
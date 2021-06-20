import React from 'react'
import CreateStoreGuide from '../../Component/UI/CreateStoreGuide/CreateStoreGuide'

import InputForm1 from '../../Component/InputForm/createStoreForm1'
import InputForm2 from '../../Component/InputForm/createStoreForm2'
import InputForm3 from '../../Component/InputForm/createStoreForm3'

import {useParams } from 'react-router-dom'
import { Header , Grid } from 'semantic-ui-react'
import './CreateStore.css'

const CreateStore = () =>{
	const {page} = useParams()

	const InputForm = () =>{
		if(+page===1){
			console.log("here")
			return <InputForm1/>
		}
		else if(+page===2){
			return <InputForm2/>
		}
		else if(+page===3){
			return <InputForm3/>
		}
	}
	return(
		<>
		 <Header
   			 as='h2'
			 color='red'
    		 content='MuggleMarket'
   			 subheader='For Business'
			 className="p-3 mx-5"
  		/>
		
		 <Grid style={{boxSizing:"border-box"}}>
      		<Grid.Column mobile={16} tablet={6} computer={4} className="create-store-guide">
				<CreateStoreGuide page={page}/>
			</Grid.Column>
			<Grid.Column mobile={16} tablet={10} computer={12} className="create-store-form">
				{InputForm()}
			</Grid.Column>

         </Grid>
		 </>
		
	)
}

export default CreateStore
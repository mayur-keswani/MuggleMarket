import React,{lazy,Suspense}from 'react'
import CreateStoreGuide from '../../Component/UI/CreateStoreGuide/CreateStoreGuide'

import {useParams } from 'react-router-dom'
import { Header , Grid } from 'semantic-ui-react'
import './CreateStore.css'
const InputForm1 = lazy(()=>import('../../Component/InputForm/createStoreForm1'))
const InputForm2 = lazy(()=>import('../../Component/InputForm/createStoreForm2')) 
const InputForm3 = lazy(()=>import( '../../Component/InputForm/createStoreForm3'))



const CreateStore = () =>{
	const {page} = useParams()

	const InputForm = () =>{
		if(+page===1){
			console.log("here")
			return <Suspense fallback={<div>Loading...</div>}>
				<InputForm1/>
			</Suspense>
		}
		else if(+page===2){
			return <Suspense fallback={<div>Loading...</div>}><InputForm2/></Suspense>
		}
		else if(+page===3){
			return  <Suspense fallback={<div>Loading...</div>}><InputForm3/></Suspense>
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
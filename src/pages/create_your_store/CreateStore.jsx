import React,{lazy,Suspense}from 'react'
import CreateStoreGuide from '../../component/create-store-guide/CreateStoreGuide'
import {useParams } from 'react-router-dom'
import './CreateStore.css'
const InputForm1 = lazy(()=>import('../../component/InputForm/createStoreForm1'))
const InputForm2 = lazy(()=>import('../../component/InputForm/createStoreForm2')) 
const InputForm3 = lazy(()=>import( '../../component/InputForm/createStoreForm3'))



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
		 <div className='grid grid-cols-2 space-x-2'>
      		<div  className="create-store-guide">
				<CreateStoreGuide page={page}/>
			</div>
			<div className="create-store-form">
				{/* {InputForm()} */}
			</div>

         </div>
		 </>
		
	)
}

export default CreateStore
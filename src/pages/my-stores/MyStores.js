import React,{useContext,useEffect,useState} from 'react'
import userContext from '../../context/user-context'
import { useHistory } from 'react-router-dom'
import { Button,Item,Icon,Header} from 'semantic-ui-react'
import { SET_LOADING } from '../../context/action-types'
import { Spinner } from '../../component/ui/spinner/Spinner'
import './MyStore.css'

const MyStore = () =>{
	const {globalState,dispatch}= useContext(userContext)
	const {isLoading} = globalState
	const [stores,setStores] = useState([])
	const history = useHistory()
	
	const fetchMySTORE =()=>{
		const token = JSON.parse(localStorage.getItem('token'))
		console.log(token)
		dispatch({type:SET_LOADING,payload:true})
		fetch('http://localhost:8080/my-stores',{
			method: 'GET',
			headers: {
				'Authorization':token,
			},
		})
		.then(response => {
			if(response.status!==200)
				throw new Error('Couldnt abled to fetched Stores')

			return response.json()
		}).then(result=>{
			dispatch({type:SET_LOADING,payload:false})
			setStores(result.stores)
		}).catch(error => {
			dispatch({type:SET_LOADING,payload:false})
			console.log(error)
		})
	}

	const showStoreHandler = (id) =>{
		history.push('/my-store/'+id)
	}
	useEffect(()=>{
		fetchMySTORE()

		return(()=>{
			setStores([]); // This worked for me
		  })
	},[])

	return (
		<>
		<Header as='h2' className="mb-5 p-5 bg-light">
    		<Icon name='shop' />
   		    <Header.Content>
      			My Stores
      			<Header.Subheader>Manage your stores</Header.Subheader>
    		</Header.Content>
  		</Header>

		{
		isLoading ?
		<Spinner/>
		:
		!stores.length?
		 <h4 className="text-danger">You Have No Store!</h4>
		:
		<Item.Group relaxed className="mystore-section" >
		{
		stores.map(store =>
			<Item className="mx-2" style={{width:"100%",borderBottom:"1px dotted black"}} key={store._id}>
      		<Item.Image src={store.store_picture||'https://react.semantic-ui.com/images/wireframe/image.png'}
			  size="small" className="rounded img-fluid"/>
  		    <Item.Content verticalAlign='middle'>
     		   <Item.Header as='a'>{store.name}</Item.Header>
        	   <Item.Meta>
          			<span className='cinema'>{store.store_type}</span>
        		</Item.Meta>
        		<Item.Description> {store.description}</Item.Description>
        		<Item.Extra className="mt-1">
					<Button animated primary size="large" onClick={()=>showStoreHandler(store._id)}>
      					<Button.Content visible>Look inside</Button.Content>
      					<Button.Content hidden>
        				<Icon name='arrow right' />
     					</Button.Content>
    				</Button>
        		</Item.Extra>
      		</Item.Content>
    		</Item>
		)
		}
		</Item.Group>
	   }


		

		</>
	)
}

export default MyStore
import React, { useState , useContext} from 'react'
import userContext from '../../context/user-context'
import {SET_LOADING} from '../../context/action-types'
import {useHistory} from 'react-router-dom'
import {Form, Header, Icon, Label, Table, Button} from 'semantic-ui-react'
import { Spinner } from '../UI/Spinner/Spinner'

const MenuItems = (props) => {
  const history = useHistory();
  const {globalState,dispatch} = useContext(userContext)
  const {token,editStoreKey,isLoading} = globalState
  const [items,setItems]=useState([])
  const [menuItem,setMenuItem] = useState({
    id:1,
    name:"",
    description:"",
    product_pic:"",
    price:""
  })
  const [newItemSlot,setNewItemSlot] = useState(true)
  
  // const addNewItemHandler = async () =>{
  //   await setItems((prevState)=>{
  //     return prevState.concat(menuItem)
  //   })
  // }

  const uploadItemHandler = () =>{
    
    const formData = new FormData()
    formData.append('name',menuItem.name)
    formData.append('description',menuItem.description)
    formData.append('storeImage',menuItem.product_pic)
    console.log(formData.get('storeImage'))
    formData.append('price',menuItem.price)
    console.log(editStoreKey)
    dispatch({type:SET_LOADING,payload:true})
    fetch('http://localhost:8080/upload-items/'+editStoreKey,{
      method:"POST",
      body:formData,
      headers:{
        'Authorization':token
      }
    }).then(response =>{
      if(response.status===422){
        throw new Error("Validation Failed")
      }
      if(response.status!==200 && response.status!==201){
        throw new Error("Couldnt able to Store-item")
      }
      else
        return response.json()
    })
    .then(result =>{
      dispatch({type:SET_LOADING,payload:false})
        // console.log(result.product)
        console.log("Item Stored Succeessfully")
        setItems((prevState)=>{
          return prevState.concat(result.product)})
    })
    .catch(error =>{
      console.log(error)
      dispatch({type:SET_LOADING,payload:false})
      
    })
  }
 
 return(
  isLoading?
    <Spinner/>:
  <>
  <Table unstackable style={{width:"100%"}} className="m-0">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Items No.</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Product Image</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell> 
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {
     items.map((item)=> {
      return <Table.Row key={item._id}>
        <Table.Cell>
          {item._id}
        </Table.Cell>
        <Table.Cell className="my-4">{item.name}</Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell>{item.product_pic}</Table.Cell>
        <Table.Cell>{item.price}</Table.Cell>
      </Table.Row>
     })
    }
    {
      newItemSlot?
      (
       <Table.Row>
        <Table.Cell>
          <h4 className="text-danger">{menuItem.id}</h4>
        </Table.Cell>
        <Table.Cell className="my-4">
          <textarea name="name" rows="5" cols="20"
            value={menuItem.name}
            onChange={(event)=>setMenuItem({...menuItem,name:event.target.value})}
            />
        </Table.Cell>
        <Table.Cell  style={{height:"100%"}}>
          <textarea name="description" rows="5" cols="30"
            value={menuItem.description}
            onChange={(event)=>setMenuItem({...menuItem,description:event.target.value})}
            />
        </Table.Cell>
        <Table.Cell>
          <Header as='h4' image>
            <Icon name='picture'  size='huge' />
          </Header><br/>
          <input type="file" name="picture" 
            onChange={(event)=>setMenuItem({...menuItem,product_pic:event.target.files[0]})}
            />
        </Table.Cell>
        <Table.Cell>
          <textarea name="price" rows="2" cols="20"
             value={menuItem.price}
              onChange={(event)=>setMenuItem({...menuItem,price:event.target.value})}
             />

          <div className="text-muted text-center">Enter Price In INR(₹)</div>
        </Table.Cell>
        <Table.Cell>
          <Button default onClick={()=>uploadItemHandler()}>ADD</Button>
        </Table.Cell>
    
      </Table.Row>)
    :
    ""
    }
    </Table.Body>
   </Table>

   {/* <Button  className="mb-5" onClick={addNewItemHandler}><Icon name="add"/></Button> */}
    {/* <Button  className="mt-p" onClick={addNewItemHandler}><Icon name="Submit Menu"/></Button> */}
   <Form className="text-center mt-4" >	
			  <Button animated  size="huge" className="" color='green' onClick={()=>history.push('/')}>
     			<Button.Content visible>Submit Menu</Button.Content>
      			<Button.Content hidden>
        			<Icon name='arrow right' />
      			</Button.Content>
    		</Button>
	 </Form>
  </>
)
}

export default MenuItems
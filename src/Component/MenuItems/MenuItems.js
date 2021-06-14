import React, { useState } from 'react'
import {Form, Header, Icon, Label, Table, Button} from 'semantic-ui-react'

const MenuItems = (props) => {
  
  const [items,setItems]=useState([])
  const [menuItem,setMenuItem] = useState({
    id:1,
    name:"",
    description:"",
    product_pic:"",
    price:""
  })
  const [newItemSlot,setNewItemSlot] = useState(true)
  
  const addNewItemHandler = () =>{
    console.log(menuItem)
    setItems((prevState)=>{
      return prevState.concat(menuItem)
    })
    setMenuItem({id:++menuItem.id,name:"",description:"",product_pic:"",price:""})
  }
  const addImage=(event)=>{
    console.log(event.target.files[0])
  }
  return(
  <>
 
  <Table unstackable style={{width:"100%"}} className="m-0">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Items No.</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Product Image</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {
    
     
     items.map((i,item)=>   
      <Table.Row key={i}>
        <Table.Cell>
          <Label ribbon>First</Label>
          1
        </Table.Cell>
        <Table.Cell className="my-4">{item.name}</Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell>{item.product_pic}</Table.Cell>
        <Table.Cell>{item.price}</Table.Cell>
      </Table.Row>
     )
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
            <Icon name='picture' rounded size='huge' />
          </Header><br/>
          <input type="file" name="picture" 
            value={menuItem.product_pic}
            onChange={(event)=>addImage(event)}
            />
        </Table.Cell>
        <Table.Cell>
          <textarea name="price" rows="2" cols="20"
             value={menuItem.price}
              onChange={(event)=>setMenuItem({...menuItem,price:event.target.value})}
             />

          <div className="text-muted text-center">Enter Price In INR(₹)</div>
        </Table.Cell>
    
      </Table.Row>)
    :
    ""
    }
    </Table.Body>
  </Table>

  <Button  className="mb-5" onClick={addNewItemHandler}><Icon name="add"/></Button>
  {/* <Button  className="mt-p" onClick={addNewItemHandler}><Icon name="Submit Menu"/></Button> */}
  <Form className="text-center" >	
			<Button animated  size="huge" className="" color='green' onClick={()=>props.submitForm(items)}>
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
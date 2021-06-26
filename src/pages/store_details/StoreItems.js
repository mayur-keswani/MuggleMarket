import React,{useState} from 'react'
import {Header, Menu , Button, Image, Item } from 'semantic-ui-react'


const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />


const StoreItems = ({store}) =>{
	const [state,setState] = useState({ activeItem: 'home' })

	const handleItemClick = (e, { name }) => setState({ activeItem: name })
  
	const { activeItem } = state
  
	return (
		<>
		  <div className="store-items d-flex flex-row ">
			<div className="items-filter " 
				style={{height:"45vh",width:"40%",borderRight: "1px dotted black"}}>
			<Header as='h3'className="p-2">Filters</Header>
			<Menu fluid vertical >
        		<Menu.Item
          			name='home'
          			active={activeItem === 'home'}
          			onClick={handleItemClick}>
					  First Filter
				</Menu.Item>
        		<Menu.Item
          			name='messages'
          			active={activeItem === 'messages'}
          			onClick={handleItemClick}>
			  		  Second Filter
		  		</Menu.Item>
        		<Menu.Item
          			name='friends'
          			active={activeItem === 'friends'}
          			onClick={handleItemClick}>
				</Menu.Item>
      		</Menu>
			</div>

			<div className="items-list" style={{width:"80%",border: "1px dotted black"}}>
			{
				store.store_items.length?
				store.store_items.map((item) =>(
					<Item.Group relaxed>
    					<Item>
      						<Item.Image size='small' src={item.product_pic||'https://react.semantic-ui.com/images/wireframe/image.png'} />
      				  		  <Item.Content verticalAlign='middle'>
       								<Item.Header>{item.name}</Item.Header>
        							<Item.Description>{item.description}</Item.Description>
        							<Item.Extra>
          								<Button floated='right'>ADD TO CART</Button>
        							</Item.Extra>
      				  		  </Item.Content>
    					</Item>
					</Item.Group>
				))
				
				:
				<h4>No Items Added Yet!</h4>
			}		

			</div>

		</div>
	</>
	)
}
export default StoreItems
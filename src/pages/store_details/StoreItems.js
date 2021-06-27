import React,{useState,useContext} from 'react'
import userContext from '../../context/user-context';
import {Header, Menu , Item, Icon} from 'semantic-ui-react'
import Cart from '../../Component/order-summary/Cart';
import OrderButton from '../../Component/orderButton/OrderButton'

const StoreItems = ({store}) =>{
	const [state,setState] = useState({ activeItem: 'home' })
	const {globalState} = useContext(userContext)
	const {selectedItems} = globalState

	const handleItemClick = (e, { name }) => setState({ activeItem: name })
  
	const { activeItem } = state

	let totalItems=0;
	for(let i in selectedItems){	
		totalItems += +selectedItems[i]
	}
  
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
					<Item.Group relaxed key={item._id}>
    					<Item>
      						<Item.Image size='small' src={item.product_pic||'https://react.semantic-ui.com/images/wireframe/image.png'} />
      				  		  <Item.Content verticalAlign='middle'>
       								<Item.Header>{item.name}</Item.Header>
        							<Item.Description>{item.description}</Item.Description>
									<Item.Extra className="text-lead text-danger h4">
										<Icon name="inr"/>{item.price}
									</Item.Extra>
									<OrderButton pid={item._id} price={item.price}/>
      				  		  </Item.Content>
    					</Item>
					</Item.Group>
				))
				
				:
				<h4>No Items Added Yet!</h4>
			}		
			</div>

		</div>
		{
			totalItems?
			<Cart totalItems={totalItems}/>
			:""
		}
		
	</>
	)
}
export default StoreItems
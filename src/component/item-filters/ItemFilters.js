import React,{useContext, useState} from 'react'
import { Header,Menu } from 'semantic-ui-react'
import { SET_SHOP_ITEMS } from '../../context/action-types'
import userContext from '../../context/user-context'

const ItemFilters = ({store}) =>{
	const [state,setState] = useState({ activeItem: 'Boys' })
	const {dispatch} = useContext(userContext)

	const handleItemClick = (e, { name }) => { 
			let filteredItems;
			if(name==='ALL'){
				filteredItems=store.store_items
			}
			else{
				 filteredItems=store.store_items.filter(item=>
					item.filterType===name
				)
			}
			
			dispatch({type:SET_SHOP_ITEMS,payload:filteredItems})
			setState({ activeItem: name })
	}
	const { activeItem } = state

	const filterList=store.store_items.map(item=>item.filterType)
	const distinctFilter=filterList.filter((filter,index)=> filterList.indexOf(filter)===index)

	return(
		<div className="items-filter " 
				style={{height:"45vh",width:"40%",borderRight: "1px dotted black"}}>
			<Header as='h3'className="p-2">Filters</Header>
			<Menu fluid vertical tabular>
			<Menu.Item
				name="ALL"
          		active={activeItem === "ALL"}
				onClick={handleItemClick}>
						ALL
			</Menu.Item>
			{
				distinctFilter.map(filterType=>{
					return <Menu.Item
								key={filterType}
          						name={filterType}
          						active={activeItem === filterType}
          						onClick={handleItemClick}>
					  				{filterType}
							</Menu.Item>
				})
			}
			
        		
      		</Menu>
		</div>
	)
}

export default ItemFilters
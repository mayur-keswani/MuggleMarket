import React,{useState} from 'react'
import {Header, Menu , Button, Image, Item } from 'semantic-ui-react'


const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

const StoreItems = () =>{
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
				<Item.Group relaxed>
    			<Item>
      				<Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />

      				  <Item.Content verticalAlign='middle'>
       					<Item.Header>Content A</Item.Header>
        				<Item.Description>{paragraph}</Item.Description>
        				<Item.Extra>
          					<Button floated='right'>Action</Button>
        				</Item.Extra>
      				  </Item.Content>
    			</Item>

    			<Item>
      				<Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
    				  <Item.Content verticalAlign='middle'>
    				    <Item.Header>Content B</Item.Header>
    				    <Item.Description>{paragraph}</Item.Description>
    				    <Item.Extra>
    				     <Button floated='right'>Action</Button>
    				    </Item.Extra>
    				  </Item.Content>
    			</Item>
				<Item>
      				<Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
    				  <Item.Content verticalAlign='middle'>
    				    <Item.Header>Content B</Item.Header>
    				    <Item.Description>{paragraph}</Item.Description>
    				    <Item.Extra>
    				     <Button floated='right'>Action</Button>
    				    </Item.Extra>
    				  </Item.Content>
    			</Item>
				<Item>
      				<Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
    				  <Item.Content verticalAlign='middle'>
    				    <Item.Header>Content B</Item.Header>
    				    <Item.Description>{paragraph}</Item.Description>
    				    <Item.Extra>
    				     <Button floated='right'>Action</Button>
    				    </Item.Extra>
    				  </Item.Content>
    			</Item>
				<Item>
      				<Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
    				  <Item.Content verticalAlign='middle'>
    				    <Item.Header>Content B</Item.Header>
    				    <Item.Description>{paragraph}</Item.Description>
    				    <Item.Extra>
    				     <Button floated='right'>Action</Button>
    				    </Item.Extra>
    				  </Item.Content>
    			</Item>
				<Item>
      				<Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
    				  <Item.Content verticalAlign='middle'>
    				    <Item.Header>Content B</Item.Header>
    				    <Item.Description>{paragraph}</Item.Description>
    				    <Item.Extra>
    				     <Button floated='right'>Action</Button>
    				    </Item.Extra>
    				  </Item.Content>
    			</Item>
				<Item>
      				<Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
    				  <Item.Content verticalAlign='middle'>
    				    <Item.Header>Content B</Item.Header>
    				    <Item.Description>{paragraph}</Item.Description>
    				    <Item.Extra>
    				     <Button floated='right'>Action</Button>
    				    </Item.Extra>
    				  </Item.Content>
    			</Item>
  				</Item.Group>
			</div>

		</div>
	</>
	)
}
export default StoreItems
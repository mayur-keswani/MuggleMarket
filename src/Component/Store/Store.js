import React from 'react'
import { Card, Icon} from 'semantic-ui-react'

const Store = ({store}) =>{
	
	return(
		<Card href={`store/${store._id}`} style={{height:"330px"}}>
    		<img src={store.store_picture || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80'} 
			 alt={store.name} height="250"/>
    		<Card.Content>
      			<Card.Header>{store.name}</Card.Header>
    		</Card.Content>
    		<Card.Content extra>
      			
        			<Icon name='user' />
        			{store.owner}
      			
   	 		</Card.Content>
  		  </Card>
	)
}

export default Store
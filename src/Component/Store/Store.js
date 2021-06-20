import React from 'react'
import { Card, Icon} from 'semantic-ui-react'

const Store = ({store}) =>{
<<<<<<< HEAD
	
	return(
		<Card href={`store/${store._id}`}>
    		<img src={store.store_picture || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80'} 
			 alt={store.name}/>
=======
	return(
		<Card>
    		<Image src='https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80' wrapped ui={false} />
>>>>>>> origin/main
    		<Card.Content>
      			<Card.Header>{store.name}</Card.Header>
      			<Card.Meta>EST : {store.year_of_establish}</Card.Meta>
      			<Card.Description>
        			{store.description}
      			</Card.Description>
    		</Card.Content>
    		<Card.Content extra>
      			<a href="/">
        			<Icon name='user' />
        			{store.owner}
      			</a>
   	 		</Card.Content>
  		  </Card>
	)
}

export default Store
import React from 'react'
import {Segment,Loader,Dimmer,Image} from 'semantic-ui-react'

export const Spinner = () =>{
	return(    
	  <Segment>
		<Dimmer active inverted>
		  <Loader size='large'>Loading</Loader>
		</Dimmer>
  
		<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
	  </Segment>)
}


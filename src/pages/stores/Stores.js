import React from 'react'
import Store from '../../Component/Store/Store'
import {Grid, Segment} from 'semantic-ui-react'

const Stores = () =>{
	return(
		<Grid stackable columns={4} >
		
		  <Grid.Column>
		    <Segment>
				<Store/>
			</Segment>
		  </Grid.Column>
		  <Grid.Column>
		  	<Segment>
				<Store/>
			</Segment>
		  </Grid.Column>
		  <Grid.Column>
		  	<Segment>
				<Store/>
			</Segment>
		  </Grid.Column>
		
		</Grid>
		
    )
}

export default Stores
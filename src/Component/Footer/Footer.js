import React from 'react'
import './Footer.css'
import { Divider, Header, List, Segment ,Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Footer= () =>{
  return(	
  	<div className="footer-section fixed-bottom bg-light py-1">
    	<Header as='h2' floated='right' className="logo">
      		Muggle Market
    	</Header>
    	<Divider clearing />
		<Grid stackable columns={5} className="text-center">
			    <Grid.Column >
					<Segment className="info-box">
					<List link>
    				 <List.Item active>Company</List.Item>
    				 <List.Item as='a'>About</List.Item>
    				 <List.Item as='a'>Jobs</List.Item>
    				 <List.Item as='a'>Team</List.Item>
  					</List>
					</Segment>  
      			</Grid.Column>
      			<Grid.Column>
				  <Segment  className="info-box">
				  <List link>
    				 <List.Item active>For Buyer</List.Item>
    				 <List.Item as='a'>Code Of Conduct</List.Item>
    				 <List.Item as='a'>Community</List.Item>
    				 <List.Item as='a'>Blogger Help</List.Item>
					 <List.Item as='a'>Other Products</List.Item>
  				  </List>
                  </Segment>	
      			</Grid.Column>

      			<Grid.Column>
				  <Segment  className="info-box">
				  <List link>
    				 <List.Item active>For Stores</List.Item>
    				 <List.Item as={Link} to="/partner_with_us">Add Store</List.Item>
    				 <List.Item as='a'>Store Widget</List.Item>
    				 <List.Item as='a'>Products for Business</List.Item>
  				  </List>
				  </Segment>	
      			</Grid.Column>

				<Grid.Column>
				  <Segment  className="info-box">
					<List link>
    				 <List.Item active>For you</List.Item>
    				 <List.Item as='a'>Privacy</List.Item>
    				 <List.Item as='a'>Terms</List.Item>
    				 <List.Item as='a'>Security</List.Item>
					 <List.Item as='a'>Site Map</List.Item>
  				  </List>
				  </Segment>	
      			</Grid.Column> 

				<Grid.Column>
				 <Segment  className="info-box">
				  <List>
    				<List.Item>
      					<List.Icon name='users' />
      					<List.Content>Mayur keswani</List.Content>
    				</List.Item>
    				<List.Item>
      					<List.Icon name='marker' />
      					<List.Content>Gujarat,India</List.Content>
    				</List.Item>
    				<List.Item>
      					<List.Icon name='mail' />
      					<List.Content>
        					<a href='mayurkeswani2001@gmail.com'>mayurkeswani2001@gmail.com</a>
      					</List.Content>
    				</List.Item>
    				<List.Item>
      					<List.Icon name='twitter' />
      					<List.Content>
        					<a href='https://twitter.com/Mayur_keswani_'>Mayur_keswani_</a>
      						</List.Content>
    				</List.Item>
 				 </List>
				 </Segment>
      			</Grid.Column>
		</Grid>
  	</div>
   )
}

export default Footer
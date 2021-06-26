import React from 'react';
import {Header, Icon} from 'semantic-ui-react'
import './StoreDetails.css'

const AboutStore = ({store}) =>{
	
	return(
		<>
		<div className="about-store p-5">
		<Header as='h3' dividing>
   			Description
  		</Header>
		<p className="text-muted"> {store.description}</p>
		<p className="text-success"><i>Serving Since : {store.year_of_establish}</i></p>
		<Header as='h3' dividing>
   			 Address
  		</Header>
		<p className="text-muted">{store.address}</p>

		<Header as='h3' dividing>
   			 Contact No. 
		</Header>
		<p className="text-muted"><Icon name="phone"/>+{store.contact_no}</p>
		Owner: <span className="text-muted"><u> {store.owner}</u></span>
		
		<Header as='h3' dividing>
   			 Social Handles
		</Header>
		<a className="text-muted"  href={store.social.instagram}><Icon name="instagram"/></a>
		<a className="text-muted"  href={store.social.facebook}><Icon name="facebook"/></a>
		<a className="text-muted"  href={store.social.youtube}><Icon name="youtube" /></a>

		</div>

		{/* <Footer/> */}
		</>
	)
}

export default AboutStore
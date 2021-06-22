import React from 'react';
import {Header, Icon} from 'semantic-ui-react'
import './StoreDetails.css'

const AboutStore = () =>{
	return(
		<>
		<div className="about-store p-5">
		<Header as='h3' dividing>
   			 Description
  		</Header>
		<p className="text-muted">We offer sweat escape from world</p>
		<p className="text-success"><i>Serving Since : 2020</i></p>
		<Header as='h3' dividing>
   			 Address
  		</Header>
		<p className="text-muted">471/A Sindhi colony nr Shanti-prakash Hospital Sardarnagar</p>

		<Header as='h3' dividing>
   			 Contact No. 
		</Header>
		<p className="text-muted"><Icon name="phone"/>+91 9106963839</p>
		Owner: <span className="text-muted"><u> Mayur Keswani</u></span>
		
		<Header as='h3' dividing>
   			 Social Handles
		</Header>
		<span className="text-muted"><Icon name="instagram"/></span>
		<span className="text-muted"><Icon name="facebook"/></span>
		<span className="text-muted"><Icon name="youtube"/></span>

		</div>

		{/* <Footer/> */}
		</>
	)
}

export default AboutStore
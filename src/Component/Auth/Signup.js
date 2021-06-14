import React from 'react'
import {Form,Input,Divider,Checkbox,Button} from 'semantic-ui-react'
const Signup = () =>{
	return(
		<Form >
        	<Form.Group widths='equal'>
         		<Form.Field>
				 <Input icon="mail" iconPosition='left' placeholder='Email' />
				</Form.Field>
			</Form.Group> 
			<Form.Group widths='equal'>
				<Form.Field>
				 <Input icon="password" iconPosition='left' placeholder='Password' />
				</Form.Field>
			</Form.Group> 
			<Form.Field>
      			<Checkbox label='I agree to the Terms and Conditions' />
    		</Form.Field>
			<Button fluid type='submit' size="huge" >Create Account</Button>
			<Divider horizontal>Or</Divider>
			<Button fluid basic
			     size="large"
      			 content='Continue with Google'
      			 icon='google'
      			 iconPosition='left'/>
			<Divider/>
			<div className="d-flex"><h3><b>Already a member! </b></h3><span className="text-muted">Login</span></div>
		</Form> 
	)
}

export default Signup
import React from 'react'
import {Form,Input,Divider ,Button} from 'semantic-ui-react'
const Login = () =>{
	return(
		<Form >
        	<Form.Group widths='equal'>
         		<Form.Field>
				 <Input icon="phone" iconPosition='left' placeholder='Phone number' />
				</Form.Field>
			</Form.Group> 
			<Button fluid type='submit' size="huge" >Send OTP</Button>
			<Divider horizontal>Or</Divider>
			<Button fluid basic
				 size="large"
      			 content='Continue with Email'
      			 icon='mail'
      			 iconPosition='left'/>
				<br/>
			<Button fluid basic
			     size="large"
      			 content='Continue with Google'
      			 icon='google'
      			 iconPosition='left'/>
			<Divider/>
			<div className="d-flex"><h3><b>New to MuggleMarket? </b></h3><span className="text-muted"> Create account</span></div>
		</Form> 
	)
}

export default Login
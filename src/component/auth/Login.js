import React, { useContext, useState } from 'react'
import {Form,Input,Divider ,Button} from 'semantic-ui-react'

import userContext from '../../context/user-context'
import { onAuthentication } from '../../context/action-types'

const Login = (props) =>{
	const [phoneNo,setPhoneNo] = useState("")
	const [loginWithEmail,setEmailPrefernce] = useState(false)
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [errorMessage,setErrorMessage] = useState("")
	
	const {dispatch} = useContext(userContext);

	const onLoginHandler=()=>{
		fetch('https://mugglemarket.herokuapp.com/auth/login',{
			method:"POST",
			body:JSON.stringify({email:email,password:password}),
			headers:{
				"Content-Type":"application/json"
			}
		}).then(response=>{
			if(response.status === 422){
				throw new Error("Validation Failed")
			}
			if(response.status !==200 && response.status!==201){
				throw new Error("Could not Authenticate You!")
			}
			else 
			 return response.json()
		})
		.then(result=>{
			//console.log(result.user)
		
			const expiresIN=new Date(new Date().getTime()+3600000)
			localStorage.setItem('token',JSON.stringify(result.token))
			localStorage.setItem('username',JSON.stringify(result.username))
			localStorage.setItem('expiresIn',expiresIN.toISOString())
			const payload ={
				token:result.token,
				username:result.username
			}
			dispatch({type:onAuthentication,payload:payload})
			props.closeModal()
		}).catch(error=>{
			setErrorMessage(error.message)
		})
	}
	return(
		<Form >

		{
			loginWithEmail?
			<>
			{errorMessage?<div className="text-center h3 text-danger">{errorMessage}</div>:""}
			  <Form.Group widths='equal'>
         	  	<Form.Field>
			  	 <Input icon="mail" placeholder='Email' 
				   value={email} onChange={(e)=>setEmail(e.target.value)} />
			  	</Form.Field>
			  </Form.Group> 
			  <Form.Group widths='equal'>
			  	<Form.Field>
			  	 <Input placeholder='Password' 
				   value={password} onChange={(e)=>setPassword(e.target.value)}  />
			  	</Form.Field>
			  </Form.Group> 
			  <Button fluid basic
				 size="large"
      			 content='Submit'
				 onClick={onLoginHandler}/>
			  
			</>
			:
			<>
        	<Form.Group widths='equal'>
         		<Form.Field>
				 <Input icon="phone" iconposition='left' placeholder='Phone number'
				 	 value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/>
				</Form.Field>
			</Form.Group> 
			<Button fluid type='submit' size="huge" >Send OTP</Button>
			<Divider horizontal>Or</Divider>
			<Button fluid basic
				 size="large"
      			 content='Continue with Email'
      			 icon='mail'
      			 iconposition='left'
				 onClick={()=>setEmailPrefernce(true)}
				   />
				<br/>
			<Button fluid basic
			     size="large"
      			 content='Continue with Google'
      			 icon='google'
      			 iconposition='left'/>
			<Divider/>
			<div className="d-flex"><h3><b>New to MuggleMarket? </b></h3><span className="text-muted"> Create account</span></div>
		  </>
		}
		</Form> 
	)
}

export default Login
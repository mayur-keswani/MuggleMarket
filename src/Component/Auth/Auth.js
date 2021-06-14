import React from 'react'
import {Button} from 'semantic-ui-react'
import './Auth.css'
const Auth = ({toggleLoginModal,toggleSignUpModal})=>{
	return (
	<div className="auth-flow">
		<Button className="btn-login" onClick={toggleLoginModal}>Login</Button>
		<Button className="btn-signup" onClick={toggleSignUpModal}>SignUp</Button>
    </div>
	
 )
}

export default Auth
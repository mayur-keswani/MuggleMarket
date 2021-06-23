import React ,{useContext} from 'react'
import userContext from '../../context/user-context'
import {onLogout} from '../../context/action-types'
import {Button} from 'semantic-ui-react'
import './Auth.css'
const Auth = ({toggleLoginModal,toggleSignUpModal})=>{
	const {globalState,dispatch} = useContext(userContext)
	const {isAuth} = globalState

	const logoutHandler=()=>{
		localStorage.removeItem('token');
		localStorage.removeItem('expiresIn');
		localStorage.removeItem('username');

		dispatch({type:onLogout})
	}
	
	console.log(isAuth)
	return (
	<div className="auth-flow">
	
		{
			isAuth?
			<>
			<Button className="btn-signup" onClick={logoutHandler}>logout</Button>
			
			</>
			:
			<>	
			<Button className="btn-login" onClick={toggleLoginModal}>Login</Button>
			<Button className="btn-signup" onClick={toggleSignUpModal}>SignUp</Button>			
			</>
		}
    </div>
	
 )
}

export default Auth
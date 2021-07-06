import React ,{useContext} from 'react'
import userContext from '../../context/user-context'
import {onLogout} from '../../context/action-types'
import {Button,Dropdown,Menu} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import './Auth.css'

const options = [
	{ key: 'my-orders', icon: '', text: 'My Orders', value: 'my-orders' },
	{ key: 'create-store', icon: '', text: 'Create Store', value: 'create-store' },
	{ key: 'your-store', icon: '', text: 'Your Store', value: 'your-store' },
	{ key: 'logout', icon: '', text: 'Logout', value: 'logout' },
  ]
const Auth = ({toggleLoginModal,toggleSignUpModal})=>{
	const {globalState,dispatch} = useContext(userContext)
	const {isAuth,username} = globalState
	const history = useHistory()

	const logoutHandler=()=>{
		localStorage.removeItem('token');
		localStorage.removeItem('expiresIn');
		localStorage.removeItem('username');

		dispatch({type:onLogout})
	}
	
	const menuEventHandler =(e,{value})=>{
		console.log(value==="logout");
		if(value==="logout") logoutHandler()

		else if(value==="your-store")
			history.push('/my-stores')

		else if(value==="create-store")
			history.push('/partner_with_us')

		else if(value==='my-orders')
			history.push('/my-orders')
	}

	return (
	<div className="auth-flow">
	
		{
			isAuth?
			<>
			{/* <Button className="btn-signup" onClick={logoutHandler}>logout</Button> */}
			<Menu compact className="mx-3" id="menu" >
    			<Dropdown text={username} options={options}  item onChange={menuEventHandler}/>
  			</Menu>
			<Button basic className="m-3 px-5" size="huge" icon="shop" onClick={()=>history.push('/checkout')}></Button>
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
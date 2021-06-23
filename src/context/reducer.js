import { onAuthentication , SET_LOADING  } from "./action-types";
import { onLogout } from "./action-types";
const reducer = (state,action) =>{
	switch (action.type) {
		case onAuthentication:
			return {...state,isAuth:true,token:action.payload}
		case onLogout:{
			return {...state,isAuth:false,token:action.payload}
		}
		case SET_LOADING:{
			return {...state,isLoading:action.payload}
		}
		default:
			break;
	}
}

export default reducer
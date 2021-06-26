import { onAuthentication , SET_LOADING, EDIT_STORE  } from "./action-types";
import { onLogout } from "./action-types";
const reducer = (state,action) =>{
	switch (action.type) {
		case onAuthentication:{
			console.log(action.payload)
			return {...state,isAuth:true,token:action.payload.token,username:action.payload.username}
		}
		case onLogout:{
			return {...state,isAuth:false,token:null,expiryDate:null,username:null}
		}
		case SET_LOADING:{
			return {...state,isLoading:action.payload}
		}
		case EDIT_STORE:{
			return { ...state,editStoreKey:action.payload.id,editStore:action.payload.store}
		}
		case SET_LOADING:{
			return {...state,isLoading:action.payload}
		}
		default:
			break;
	}
}

export default reducer
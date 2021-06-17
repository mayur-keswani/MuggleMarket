import { onAuthentication } from "./action-types";

const reducer = (state,action) =>{
	switch (action.type) {
		case onAuthentication:
			return {...state,isAuth:!state.isAuth,token:action.payload}
		
		default:
			break;
	}
}

export default reducer
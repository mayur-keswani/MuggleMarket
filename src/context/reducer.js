import { onAuthentication , SET_LOADING, EDIT_STORE , ADD_TO_CART, REMOVE_FROM_CART } from "./action-types";
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

		case ADD_TO_CART:{
			const existingItemIndex=state.orderItems.findIndex(item=> item.productID === action.payload)
			let updatedSelectedGroups={...state.selectedGroups}
			let updatedCart = [...state.orderItems]
			if(existingItemIndex>=0){
				updatedCart[existingItemIndex].quantity = updatedCart[existingItemIndex].quantity +1
				console.log(updatedCart)
				updatedSelectedGroups[action.payload]=updatedSelectedGroups[action.payload] + 1  
			}else{
				updatedCart = updatedCart.concat({productID:action.payload,quantity:1})
				updatedSelectedGroups[action.payload.toString()] = 1
				
			}	
			console.log(updatedSelectedGroups)
			console.log(updatedCart)
			return {...state,orderItems:updatedCart,selectedGroups:updatedSelectedGroups}
		}

		case REMOVE_FROM_CART:{
			const existingItemIndex=state.orderItems.findIndex(item=> item.productID === action.payload)
			let updatedSelectedGroups={...state.selectedGroups}
			let updatedCart = [...state.orderItems]
			updatedCart[existingItemIndex].quantity = updatedCart[existingItemIndex].quantity - 1
			console.log(updatedCart)
			updatedSelectedGroups[action.payload]=updatedSelectedGroups[action.payload] - 1  
			
			return {...state,orderItems:updatedCart,selectedGroups:updatedSelectedGroups}
		}
		default:
			break;
	}
}

export default reducer
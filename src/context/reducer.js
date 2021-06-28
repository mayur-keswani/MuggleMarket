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
			const existingItemIndex=state.orderItems.findIndex(item=> item.productID === action.payload.id)
			let updatedSelectedItems={...state.selectedItems}
			let updatedCart = [...state.orderItems]

			if(existingItemIndex>=0){
				updatedCart[existingItemIndex].quantity = updatedCart[existingItemIndex].quantity +1
				// console.log(updatedCart)
				updatedSelectedItems[action.payload.id]=updatedSelectedItems[action.payload.id] + 1  
			}else{
				updatedCart = updatedCart.concat(
					{
						productID:action.payload.id,
						productName:action.payload.name,
						productPrice:action.payload.price,
						quantity:1})
				updatedSelectedItems[action.payload.id.toString()] = 1
				
			}

			let updatedPrice=state.totalPrice+action.payload.price
			// console.log(updatedSelectedItems)
			// console.log(updatedCart)
			// console.log(updatedPrice)
			return {...state,orderItems:updatedCart,selectedItems:updatedSelectedItems,totalPrice:updatedPrice}
		}

		case REMOVE_FROM_CART:{
			const existingItemIndex=state.orderItems.findIndex(item=> item.productID === action.payload.id)
			let updatedSelectedItems={...state.selectedItems}
			let updatedCart = [...state.orderItems]
			updatedCart[existingItemIndex].quantity = updatedCart[existingItemIndex].quantity - 1
			updatedSelectedItems[action.payload.id]=updatedSelectedItems[action.payload.id] - 1;
			let updatedPrice=state.totalPrice-action.payload.price
			
			return {...state,orderItems:updatedCart,selectedItems:updatedSelectedItems,totalPrice:updatedPrice}
		}
		default:
			break;
	}
}

export default reducer
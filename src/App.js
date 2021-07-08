import React, { useEffect, useReducer } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import 'semantic-ui-css/semantic.min.css'

import Navbar from './component/header/Navigation';
import Footer from './component/footer/Footer';
import Stores from './pages/stores/Stores';
import {Route , Switch} from 'react-router-dom'

import PartnerWithUs from './pages/partner_with_us/PartnerWithUs';
import CreateStore from './pages/create_your_store/CreateStore';
import userContext from './context/user-context';
import reducer from './context/reducer'
import { onAuthentication , onLogout } from './context/action-types';
import StoreDetails from './pages/store_details/StoreDetails';
import MyStore from './pages/my-stores/MyStores'
import EditStore from './pages/edit-store/EditStore';
import Checkout from './pages/checkout/Checkout';
import MyOrders from './pages/my-orders/MyOrders';


const initialState={
  isAuth:false,
  isLoading:false,
  token:null,
  expiryDate:null,
  username:"",
  editStore:null,
  editStoreKey:null,
  orderItems:[],
  selectedItems:{},
  totalPrice:0
}


const App = () => {

  const autoLogoutHandler = (remainingTime) =>{
    console.log(remainingTime)
    setTimeout(()=>{
      localStorage.removeItem('token')
      dispatch({type:onLogout,payload:null,expiresIn:null})
    },remainingTime)
  }

  useEffect(()=>{
    const token=JSON.parse(localStorage.getItem('token'));
    const expiresIn=localStorage.getItem('expiresIn');
    const username=JSON.parse(localStorage.getItem('username'));
    
    console.log(expiresIn)
    if(!token && !expiresIn){
      return 0
    }

    if(new Date(expiresIn)< new Date()){
      dispatch({type:onLogout,payload:null})
      return 0
    }
    const payload={
      token:token,
      username:username
    }
    dispatch({type:onAuthentication,payload})
    let remainingTime=new Date(expiresIn).getTime()- new Date().getTime();

    autoLogoutHandler(remainingTime)
  },[])

  const [globalState,dispatch] = useReducer(reducer,initialState)
  
  return (
   <> 
   <userContext.Provider value={{globalState:globalState,dispatch:dispatch}}>
   <Switch>
   <Route path="/partner_with_us" exact render={()=>
        <>
        <PartnerWithUs/>
        </>
      }/>


   {
     globalState.isAuth ?

     <Route path="/create-your-store/:page" exact component={CreateStore}/> 
      :
      null
   }

   <Route path="/store/:id"  render={()=>
      <>
        <StoreDetails/> 
      </>
   }/>

   <Route path="/my-stores" exact component={MyStore}/>

   <Route path="/my-store/:id"  component={EditStore}/>

   <Route path="/checkout" component={Checkout}/>

   <Route path="/my-orders" render={()=>
     <>
      <MyOrders/>
     </>
    }/>

   <Route path="/"  render={()=>
      <>
        <Navbar/>
        <Stores/> 
        <Footer/>
      </>
   }/>
   </Switch>
   </userContext.Provider>
   </>
  );
}

export default App;

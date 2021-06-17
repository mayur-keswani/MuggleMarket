import React, { useEffect, useReducer } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import 'semantic-ui-css/semantic.min.css'

import Navbar from './Component/Header/Navigation';
import Footer from './Component/Footer/Footer';
import Stores from './pages/stores/Stores';
import {Route} from 'react-router-dom'

import PartnerWithUs from './pages/partner_with_us/PartnerWithUs';
import CreateStore from './pages/create_your_store/CreateStore';
import userContext from './context/user-context';
import reducer from './context/reducer'
import { onAuthentication , onLogout } from './context/action-types';

const initialState={
  isAuth:false,
  loading:false,
  token:null,
  expiryDate:null
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
    console.log(expiresIn)
    if(!token && !expiresIn){
      console.log("HERE")
      return
    }

    if(new Date(expiresIn)< new Date()){
      console.log("HTRE")
      dispatch({type:onLogout,payload:null})
      return
    }

    dispatch({type:onAuthentication,payload:token})
    let remainingTime=new Date(expiresIn).getTime()- new Date().getTime();

    autoLogoutHandler(remainingTime)
  },[])

  const [globalState,dispatch] = useReducer(reducer,initialState)
  return (
   <> 
   <userContext.Provider value={{globalState:globalState,dispatch:dispatch}}>

   <Route path="/partner_with_us" exact render={()=><>
        <PartnerWithUs/>
        </>
      }/>
   <Route path="/create-your-store/:page" exact component={CreateStore}/>  
   <Route path="/" exact render={()=>
      <>
        <Navbar/>
        <Stores/> 
        <Footer/>
      </>
   }/>

   </userContext.Provider>
   </>
  );
}

export default App;

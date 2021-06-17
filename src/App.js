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
import { onAuthentication } from './context/action-types';

const initialState={
  isAuth:false,
  loading:false,
  token:null,
}


const App = () => {
  useEffect(()=>{
    const token=JSON.parse(localStorage.getItem('token'));
    if(token){
      dispatch({type:onAuthentication,payload:token.token})
    }
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

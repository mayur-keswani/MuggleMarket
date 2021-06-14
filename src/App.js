import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import 'semantic-ui-css/semantic.min.css'

import Navbar from './Component/Header/Navigation';
import Footer from './Component/Footer/Footer';
import Stores from './pages/stores/Stores';
import {Route} from 'react-router-dom'

import PartnerWithUs from './pages/partner_with_us/PartnerWithUs';
import CreateStore from './pages/create_your_store/CreateStore';
const App = () => {
  
  return (
   <> 
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

   
   </>
  );
}

export default App;

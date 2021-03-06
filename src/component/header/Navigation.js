import React , { useState} from 'react'
import DetectLocation from '../location-finder/DetectLocation';
import SearchBar from './SearchBar'
import Auth from '../auth/Auth'
import ModalWrapper from '../ui/modal-wrapper/ModalWrapper';
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import './Header.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';



const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen,toggleLoginModal] = useState(false)
  const [isSignUpModalOpen,toggleSignUpModal] = useState(false)
  const toggle = () => setIsOpen(!isOpen);

  return (
  
      <Navbar  light expand="md" >
        <NavbarBrand href="/" className="logo"> Muggle Market</NavbarBrand>
        <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} className="collapse-navbar" navbar style={{zIndex:"100",width:"100%",height:"100%"}}>
            <Nav navbar style={{width:"100%"}} className="mr-auto nav-bar">
              <div className="input-box">
                <DetectLocation/>
                <SearchBar/>
              </div>  
              <Auth toggleLoginModal={()=>toggleLoginModal(true)} toggleSignUpModal={()=>toggleSignUpModal(true)}/>
            </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
          </Collapse>
          {
            isLoginModalOpen?
             
                 <ModalWrapper isOpen={isLoginModalOpen} closeModal={()=>toggleLoginModal(false)} title="Login">
                    <Login  closeModal={()=>toggleLoginModal(false)}/>
                 </ModalWrapper>
              :
              ""
          }
          {
            isSignUpModalOpen?
              <ModalWrapper isOpen={isSignUpModalOpen} closeModal={()=>toggleSignUpModal(false)} title="">
                <Signup closeModal={()=>toggleSignUpModal(false)} />
              </ModalWrapper>:""
          }
      </Navbar>

  );
}

export default Navigation
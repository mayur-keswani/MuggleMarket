import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import {
	Button,
	Dropdown,
	Message,
} from 'semantic-ui-react'
import {BiCurrentLocation} from 'react-icons/bi'
import { result } from 'lodash'
// import { Button } from 'bootstrap'

const DetectLocation = () =>{
	const [location,setLocation] = useState("")
	useEffect(()=>{
		
		if(localStorage.getItem("location")){
			setLocation(JSON.parse(localStorage.getItem("location") ) )
		}
	})
	const fetchLocation=()=>{
	    navigator.geolocation.getCurrentPosition(position=>{
			let latitude=position.coords.latitude;
			let longitude=position.coords.longitude
			axios
			.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.726308e29885c04749be8ff916e042e1&lat=${latitude}&lon=${longitude}&format=json`)
			.then(result=>{
				let city=result.data.address.city
				console.log(result.data.address)
				localStorage.setItem("location",JSON.stringify(city))
				console.log(city)
				setLocation(city)
			})
			.catch(error=>{
				console.log(error)
			})
		    
	   }) 
    }	
	return(
		<div className="detect-location">

				   <Dropdown text={location?location:'Find Your Location'}
				   icon='location arrow'
				   size={"huge"}
				   className="dropdown"
				   floating labeled button className='icon'  >
					
				   <Dropdown.Menu >
					  <Message  error header={<><BiCurrentLocation/><span> Detect your current location</span></>} content='using GPS'  onClick={(e)=>fetchLocation()}/>
					</Dropdown.Menu>
				</Dropdown>
	   </div>
	)
}

export default DetectLocation
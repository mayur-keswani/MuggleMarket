import React,{useState} from 'react';
import {Message,Accordion,Icon,Checkbox,Button,Form,Radio} from 'semantic-ui-react'
import './UserDetails.css'

const UserDetails = (props) =>{

  const [state,setState]=useState(0);
  const [addresses,setAddresses] = useState([])
  const [isAddressPanelOpen,toggleAddressPanel] = useState(false)
  const [new_address,setNewAddress] = useState("")
  const [selectedAddress,onSelectAddress] = useState("")


  
	const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const activeIndex = state
    const newIndex = activeIndex === index ? -1 : index
    setState( newIndex )
  }
  const selectAddressHandler=(args)=>{
    console.log(args)
    onSelectAddress(args)
  }
    const activeIndex= state
	
	return(
		<>
		 <Message success
			 header={props.username +' ('+props.email+') '}
			 content='You are securely logged un'
  			/>

      <Accordion styled fluid className="px-3 pb-3">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
          className="accordion-title">
         Address
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}  className="accordion-content mb-2 pb-2">
          {
            !addresses.length?
            <p className="bg-warning p-3">You dont have any saved address:(</p>
            :
            addresses.map(address=> 
              <p className="p-3" style={{backgroundColor:(selectedAddress===address)?"teal":"grey"}}>
                <Radio  
                  label={address} name='checkboxRadioGroup' 
                  size="large"
                  onClick={()=>selectAddressHandler(address)}
                  /><b></b>
              </p>
            )
          }
          
          <Form className="mb-2">
            {
              isAddressPanelOpen ?
                <>
                  <Form.TextArea 
                    placeholder='add something here...' 
                    value={new_address} 
                    onChange={(e)=>setNewAddress(e.target.value)}/>
                  <Button attached='bottom' 
                    onClick={()=>{
                      setAddresses(prevState=>prevState.concat(new_address))  
                      toggleAddressPanel(false) }
                    }>
                    Submit
                  </Button>
                </>
                :
                <Button attached='bottom' onClick={()=>toggleAddressPanel(true)}>Add New Address</Button>
            }

          </Form>      
              
        </Accordion.Content>
        

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
          className="accordion-title">
          Mode Of Payment
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}  className="accordion-content mb-2 bg-light">
          <p>
            <Message color='yellow'>Right Now, We are only accepting cash!</Message>
          </p>
          <p>
            <Radio label='Cash' size="massive"/>
          </p>
        </Accordion.Content>
      </Accordion>

	 </>
	)
}

export default UserDetails
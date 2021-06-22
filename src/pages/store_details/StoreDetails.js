import React , {useState} from 'react';
import AboutStore from './AboutStore';
import StoreItems from './StoreItems';
import {Route , useHistory } from 'react-router-dom'
import { Grid , Header, Menu} from 'semantic-ui-react';
const StoreDetails = () =>{
	const [navItem,setnavItem] = useState({ activeItem: 'about-store' })
	const history = useHistory()
	const handleItemClick = (e, { name }) => {
		setnavItem({ activeItem: name })
		history.push('/store/id/'+name)
		
	}
  
	const { activeItem } = navItem
	return(
		<>
		<div className="store-thumbnail jumbotron text-center" style={{height:"20vh",zIndex:"200"}}>
			{/* <img src=""  */}
			<Grid >
    			<Grid.Column mobile={8} tablet={6} computer={3}>
					<img 
						src='https://cdn.shopify.com/s/files/1/0969/9128/products/Silicon_Valley_-_Pied_Piper_Logo_8ea7ff79-7f7e-4803-800b-497d27f24f24.jpg?v=1522138335'
						alt="store-thumbnail"
						className="img-fluid img-thumbnail"
						style={{width:"200px",height:"180px",borderRadius:"50%",position:"relative",bottom:"-30%",left:"10%",transform:"translateY(-10%)"}}
						/>
   				</Grid.Column>	
			</Grid>
		</div>

		<div className="bg-light jumbotron d-flex justify-items-start align-items-end" 
			style={{height:"30vh",zIndex:"100"}}>
			<Header as='h2' className="p-2">
    			Pied Piper
    			<Header.Subheader className="text-muted">
     			 A compression company by Richard Hendricks <br/><br/>
				  <p className="text-lead">Ahmedabad</p>
			  	  10:00 - 20:00
    			</Header.Subheader>
  			 </Header>
		</div>

		<div className="store-navbar bg-light">
		 <Menu attached='top' tabular>
          <Menu.Item
            name='about-store'
			className="px-5 mr-2 text-lead h6"
            active={activeItem === 'about-store'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='items'
			className="px-5 mr-2 text-lead h6"
            active={activeItem === 'items'}
            onClick={handleItemClick}
          />
         </Menu>
		</div>

		
		<Route path="/store/id/about-store" exact component={AboutStore}/>
		<Route path="/store/id/items" exact component={StoreItems}/>


		</>

			
		
	)
}

export default StoreDetails
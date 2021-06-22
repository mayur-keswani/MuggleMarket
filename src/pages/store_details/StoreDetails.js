import React , {useState} from 'react';
// import {StoreImage} from '../../Component/Image/Thumbnail'
import { Grid , Header, Menu, Input} from 'semantic-ui-react';
const StoreDetails = () =>{
	const [state,setState] = useState({ activeItem: 'About Store' })

	const handleItemClick = (e, { name }) => setState({ activeItem: name })
  
	const { activeItem } = state
	return(
		<>
		<div className="store-thumbnail jumbotron text-center" style={{height:"20vh",zIndex:"200"}}>
			{/* <img src=""  */}
			<Grid >
    			<Grid.Column mobile={8} tablet={6} computer={3}>
					<img 
						src='https://cdn.shopify.com/s/files/1/0969/9128/products/Silicon_Valley_-_Pied_Piper_Logo_8ea7ff79-7f7e-4803-800b-497d27f24f24.jpg?v=1522138335'
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
            name='About Store'
			className="px-5 mr-2 text-lead h6"
            active={activeItem === 'About Store'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Items'
			className="px-5 mr-2 text-lead h6"
            active={activeItem === 'Items'}
            onClick={handleItemClick}
          />

        </Menu>
		</div>
		</>

			
		
	)
}

export default StoreDetails
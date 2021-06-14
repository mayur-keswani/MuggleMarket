import React from 'react'
import {
	Form,
} from 'semantic-ui-react'

const SearchBar = ()=>{
	return(
		<Form className="search-bar">
			<Form.Field>
			  <input  placeholder='Search for your shop' />
			</Form.Field>
		</Form>

	)
}

export default SearchBar
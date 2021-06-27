import React from 'react';
import userContext from '../../context/user-context'
import { Table } from 'semantic-ui-react'

const OrderSummary = () =>{
  return(

	  <Table unstackable style={{backgroundColor:"transparent"}}>
		<Table.Header >
		  <Table.Row >
			<Table.HeaderCell  style={{backgroundColor:"transparent"}}>Name</Table.HeaderCell>
			<Table.HeaderCell  style={{backgroundColor:"transparent"}}>Status</Table.HeaderCell>
			<Table.HeaderCell  style={{backgroundColor:"transparent"}} textAlign='right'>Notes</Table.HeaderCell>
		  </Table.Row>
		</Table.Header>
	
		<Table.Body>
		  <Table.Row>
			<Table.Cell>John</Table.Cell>
			<Table.Cell>Approved</Table.Cell>
			<Table.Cell textAlign='right'>None</Table.Cell>
		  </Table.Row>
		  <Table.Row>
			<Table.Cell>Jamie</Table.Cell>
			<Table.Cell>Approved</Table.Cell>
			<Table.Cell textAlign='right'>Requires call</Table.Cell>
		  </Table.Row>
		  <Table.Row>
			<Table.Cell>Jill</Table.Cell>
			<Table.Cell>Denied</Table.Cell>
			<Table.Cell textAlign='right'>None</Table.Cell>
		  </Table.Row>
		</Table.Body>
	  </Table>
	)
	
}

export default OrderSummary
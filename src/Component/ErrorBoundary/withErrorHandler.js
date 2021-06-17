import React, { Component } from 'react'
import ModalWrapper from '../UI/ModalWrapper/ModalWrapper'

class withErrorHandler extends Component{
		state={
			hasError:false,
			error:null,
			errorInfo:null
		}

		static getDerivedStateFromError(error){
			return {hasError:true}
		}
		componentDidCatch(error,errorInfo){
			this.setState({error:error,errorInfo:errorInfo})
		}
		render(){
			return(
					(this.state.hasError)?
					<ModalWrapper title={this.state.error} 
						isOpen={this.state.hasError} 
						closeModal={()=>this.setState({hasError:false})}>
							{this.state.errorInfo}
					</ModalWrapper>
					:
					{...this.props}		
			)
		}

	
}


export default withErrorHandler
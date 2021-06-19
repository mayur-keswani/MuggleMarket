import React from 'react'
import Styled from 'styled-components'

export const Image = Styled.div`
	width:200px;
	background-image: url('${(props)=>props.imageUrl}');
	background-size:cover;
	background-repeat:no-repeat;
	background-position:center;
`

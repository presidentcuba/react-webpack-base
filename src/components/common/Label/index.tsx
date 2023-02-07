import React, { CSSProperties, ReactNode } from 'react'
import { CustomLabel } from './styled'

interface ILabel {
	style?: CSSProperties
	label?: ReactNode
}

export const Label: React.FC<ILabel> = (props) => {
	return <CustomLabel style={props?.style}>{props.label}</CustomLabel>
}

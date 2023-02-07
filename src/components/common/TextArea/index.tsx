import { TextAreaProps } from 'antd/lib/input'
import React, { CSSProperties, ReactNode } from 'react'
import { Label } from '../Label'
import { CustomTextArea } from './styled'

interface ITextArea extends TextAreaProps {
	label?: ReactNode
	styleLabel?: CSSProperties
}

export const TextArea: React.FC<ITextArea> = (props) => {
	return (
		<div>
			{props.label ? <Label style={props?.styleLabel} label={props.label} /> : null}
			<CustomTextArea {...props} />
		</div>
	)
}

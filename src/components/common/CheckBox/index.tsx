import { CheckboxProps } from 'antd'
import React, { CSSProperties, ReactNode } from 'react'
import { Label } from '../Label'
import { CustomCheckBox } from './styled'

interface ICheckBox extends CheckboxProps {
	label?: ReactNode
	styleLabel?: CSSProperties
}

export const CheckBox: React.FC<ICheckBox> = (props) => {
	return (
		<CustomCheckBox {...props}>
			{props.label ? <Label style={props?.styleLabel} label={props.label} /> : null}
		</CustomCheckBox>
	)
}

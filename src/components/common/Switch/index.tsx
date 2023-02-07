import React from 'react'
import { Switch, SwitchProps } from 'antd'

interface ISwitchProps extends SwitchProps {
	label?: string
}

export const SwitchCustom: React.FC<ISwitchProps> = (props) => {
	const { label } = props

	return (
		<div>
			{label && <p>{label}</p>}
			<Switch {...props} />
		</div>
	)
}

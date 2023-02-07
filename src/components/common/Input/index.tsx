import { InputProps } from 'antd'
import React from 'react'
import { InputCustom } from './styled'

interface IProps extends InputProps {}

const Input: React.FC<IProps> = (props) => {
	return <InputCustom {...props} />
}

export default Input

import { SelectProps } from 'antd'
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select'
import React from 'react'
import { SelectCustom } from './styled'

interface IProps extends SelectProps<any, BaseOptionType | DefaultOptionType> {}
export const Select: React.FC<IProps> = (props) => {
	return <SelectCustom {...props} />
}

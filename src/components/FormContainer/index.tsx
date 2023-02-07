import { FormModal } from '@/models/form/FormModal'
import { TYPE_COMPONENT } from '@/utility/enum'
import React, { useEffect } from 'react'
import { CheckBox, Select, SwitchCustom } from '../common'
import Input from '../common/Input'

interface IPropsForm {
	dataSource: FormModal[]
}

const FormContainer: React.FC<IPropsForm> = (props) => {
	const { dataSource } = props

	const renderForm = () => {
		return dataSource.map((value) => {
			switch (value.type) {
				case TYPE_COMPONENT.CHECK_BOX:
					return <CheckBox onChange={(e) => value.onChange({ name: value.name, value: e.target.checked })} />
				case TYPE_COMPONENT.SWITCH:
					return <SwitchCustom label={value.label} />
				case TYPE_COMPONENT.SELECT:
					return <Select placeholder='Vui lòng chọn' />
				case TYPE_COMPONENT.INPUT:
					return <Input style={value.styled} width={value.width} />
				default:
					return <Input />
			}
		})
	}

	return <div>{renderForm()}</div>
}

export default FormContainer

import { SwitchCustom } from '@/components/common'
import React from 'react'
import * as yup from 'yup'
import { useValidationForm } from '@/hooks'
import { Button } from 'antd'
import { FormModal } from '@/models/form/FormModal'
import { TYPE_COMPONENT } from '@/utility/enum'
import FormContainer from '@/components/FormContainer'

const yupObject = yup.object().shape({
	fullName: yup.string().required('Yêu cầu fullName'),
	position: yup.string().required('Yêu cầu position'),
	emailOrPhone: yup.string().required('Yêu cầu nhập số điện thoại'),
	permissionGroupId: yup.string().required('permissionGroupId'),
	permissionGroupName: yup.string().required('permissionGroupName'),
	storeId: yup.string().required('storeId'),
})

const FormValidate: React.FC = () => {
	const onChange = (e) => {
		console.log(e)
	}

	const dataForm = {
		fullName: '',
		emailOrPhone: '',
		position: '',
		permissionGroupId: '',
		permissionGroupName: '',
		storeId: '',
	}
	const { errors, onSubmit } = useValidationForm(dataForm, yupObject)
	const handleSubmit = () => {
		console.log(errors)
	}

	const onChangeForm = (e) => {
		console.log(e)
	}

	const styled = {
		background: 'red',
		width: '100px',
		marginRight: '20px',
		marginBottom: '16px',
	}

	const dataSource: FormModal[] = [
		{
			type: TYPE_COMPONENT.INPUT,
			name: 'fieldStatus',
			onChange: onChangeForm,
			styled: styled,
		},
		{
			type: TYPE_COMPONENT.SELECT,
			name: 'fieldStatus',
			onChange: onChangeForm,
			styled: styled,
		},
		{
			type: TYPE_COMPONENT.INPUT,
			name: 'fieldStatus',
			onChange: onChangeForm,
			styled: styled,
		},
		{
			type: TYPE_COMPONENT.INPUT,
			name: 'fieldStatus',
			onChange: onChangeForm,
			styled: styled,
		},
		{
			type: TYPE_COMPONENT.CHECK_BOX,
			name: 'fieldStatus',
			onChange: onChangeForm,
			styled: styled,
		},
		{
			type: TYPE_COMPONENT.INPUT,
			name: 'fieldStatus',
			onChange: onChangeForm,
			styled: styled,
		},
		{
			type: TYPE_COMPONENT.SELECT,
			name: 'fieldStatus',
			onChange: onChangeForm,
			styled: styled,
		},
		{
			type: TYPE_COMPONENT.SWITCH,
			name: 'fieldStatus',
			onChange: onChangeForm,
			label: 'Trạng thái',
		},
	]

	return (
		<div>
			<SwitchCustom
				label='Trạng thái'
				onChange={(checked: boolean) =>
					onChange({
						state: checked,
					})
				}
			/>
			<Button onClick={() => onSubmit(handleSubmit)}>Click me</Button>

			<FormContainer dataSource={dataSource} />
		</div>
	)
}

export default FormValidate

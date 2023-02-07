import { TextArea, Select } from '@/components/common'
import Input from '@/components/common/Input'
import React from 'react'

const option = [
	{ label: 'jack', value: 'jack' },
	{ label: 'lucy', value: 'lucy' },
]

const Page: React.FC = () => {
	const handleChange = (value: { value: string; label: React.ReactNode }) => {
		console.log(value)
	}
	return (
		<div>
			<TextArea />
			<Input style={{ width: 300 }} placeholder='placeholder' />
			<Select
				labelInValue
				defaultValue={{ value: 'lucy', label: 'Lucy (101)' }}
				style={{ width: 120 }}
				onChange={handleChange}
				options={option}
			/>
		</div>
	)
}

export default Page

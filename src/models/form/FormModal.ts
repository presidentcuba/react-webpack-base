import { CSSProperties } from 'react'

export interface FormModal {
	type: string
	onChange: (value) => void
	name: string
	width?: number | string
	row?: number
	showCount?: number
	placeholder?: string
	disable?: boolean
	checked?: boolean
	styled?: CSSProperties
	label?: string
}

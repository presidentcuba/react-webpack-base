export interface Property {
	id: number
	propertyId: number
	productId?: number
	propertyName: string
	originalValue: string
	value: string
	displayOrder: number
	isSystemProperty: boolean
	isOther: boolean
	isVariantConfig?: boolean
	propertyValueId: number
}

export interface PropertyCustomChildren {
	propertyValueId: number
	originalValue: string
	value: string | number
}
export interface PropertyValues {
	propertyValueId: number
	propertyValueCustom: string | null
	propertyValueImage: string | null
}
export interface PropertyCustom {
	categoryId: number
	propertyId: number
	propertyName: string
	propertyValues?: PropertyValues[]
	isMandatory: boolean
	isSystemProperty: boolean
	isVariantConfig: boolean
	order: number
	type: number
	uploadAllowed: boolean
	propertyValueCustom?: string
	children: PropertyCustomChildren[]
}

export interface PropertyAndValue {
	priceMax: number
	priceMin: number
	priceStep: number
	properties?: PropertyCustom[]
}

export interface PropertyValue {
	propertyValueId: number
	propertyValueName: string
	originalValue: string
	value: string
	propertyValueCustom: string
	propertyValueImage: string
	propertyValueType: number
	propertyValueRangeId: number
	propertyValueRangeName: string
	isEnabled: boolean
}

export interface ParamsNewPropertyValue {
	productId: number
	propertyId: number
	isPropertyCustom: boolean
	originalValue: string
}

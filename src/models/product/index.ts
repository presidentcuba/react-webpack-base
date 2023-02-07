import { PropertyValue } from '../property'

export interface Quantities {
	warehouseId: number
	quantity: number
}

export interface Properties {
	content: string
	description: string
	caption: string
}

export interface Image {
	content: string
	description: string
	caption: string
	type: number
	order: number
}

export interface Video {
	content: string
	description: string
	caption: string
}

export interface comboVariation {
	id: number | string
	quantity: number
}

export interface Property {
	imageUrl: string | null
	isSystemProperty: boolean
	isVariantConfig: boolean
	isVariationConfig: boolean
	order: number | null
	partnerPropertyId: number | null
	propertyCustom: string | null
	propertyId: number
	propertyValueCustom: string | null
	propertyValueRangeId: number | null
	propertyValueRangeName: string | null
	propertyValueType: number
	type: number
}

export interface ShippingFrom extends Properties {
	id?: number
}

export interface ShippingTo extends Properties {
	id?: number
}

export interface Configs {
	propertyName?: string
	order: number
	propertyId: number
	type: number
	children?: any[]
	propertyValues: PropertyValue[]
}

export interface VariantConfigs {
	isSingleVariant: boolean
	configs: Configs[]
}

export interface VariationConfigs {
	isSingleVariation: boolean
	configs: Configs[]
}

export interface Warranty {
	warrantyId?: number
	warrantyPolicy?: string
	warrantyForm?: number[]
}

export interface Variations {
	sku: string
	price: number
	variantId: number
	variationId: number
	propertyValueId1: number | null
	propertyValueId2: number | null
	propertyValueName1: string | null
	propertyValueName2: string | null
	quantities: Quantities[]
	totalQuantity: number | null
	isEnabled: boolean
	propertyValue1RangeId: number | null
	propertyValue2RangeId: number | null
	propertyValue1RangeName: string | null
	propertyValue2RangeName: string | null
	propertyValue1Type: number
	propertyValue2Type: number
	promotionPrice?: number | null
	discountPercent?: number | null
	promotionQuantity?: number
	numberUsedEachCustomer?: number
	isActiveCampaign?: boolean
	variantImage: string | null
	variationImage: string | null
	isInputValid?: boolean
	priceStatus: number
	quantitySold: number
}

export interface Product {
	id: number
	title: string
	description: string
	content?: string
	urlSlug?: string
	images: Image[]
	videos: Video[]
	status: number | boolean
	condition: number
	availability: number
	availabilityDate: string
	expirationDate: string
	price: number
	priceTo: number
	categoryId: number
	categoryIds: number[] | null
	categoryName: string
	madeinId: number
	brandId?: number
	brandName: string
	quantityVariation?: number
	modelId: number
	modelName: string
	shippingWeight: number
	shippingLength: number
	shippingWidth: number
	shippingHeight: number
	shippingFrom: ShippingFrom | null
	shippingFromIds: number[] | null
	shippingTo: ShippingTo | null
	shippingToIds: number[] | null
	createdAt: string
	updatedAt: string
	sku: string
	merchantId: number
	properties: Property[]
	variations: Variations[]
	variantConfigs: VariantConfigs
	variationConfigs: VariationConfigs
	totalSold: number
	updatedStatusAt: string | null
	productType: number
	statusBeforeDelete: number | null
	statusReviewing: number | null
	contentScore: number
	priceStatus: number
	hasWarranty: boolean
	warranty: Warranty
	key?: string | number
	promotionPrice?: number
	discountPercent?: number
	promotionQuantity?: number
	numberUsedEachCustomer?: number
	hashtag: string[]
	productSuggestId: number
	comboVariations: comboVariation[]
}

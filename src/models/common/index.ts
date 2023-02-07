export interface QueryParams {
	categoryId?: number[] | number
	productIds?: number[] | string[]
	variantIds?: number[] | string[]
	variationIds?: number[] | string[] | string
	product_ids?: string
	productId?: string | number
	page?: number
	pageSize?: number
	input?: number | number[]
	fullTextSearch?: string
}

export interface ResponseProperties<T> {
	code: string
	message: string
	data: T
	is_error?: boolean
	isError?: boolean
	total_object?: number
	totalObject?: number
	page?: number
	pageSize?: number
	totalPage?: number
	headers?: any
	isEmpty?: boolean
}

export interface Pagination {
	page: number
	pageSize: number
	totalObject: number
	totalPage: number
}

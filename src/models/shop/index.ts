export interface Shop {
	extraInfo: ExtraInfo
	document: Document
	id: string
	merchantId: number
	merchantRef: string
	userId: string
	name: string
	code: string
	companyName: string
	representativeName: string
	representativePosition: string
	portalLink: string
	referralLink: string
	urlSlug: string
	taxCode: string
	address: string
	email: string
	mobilePhone: string
	avatarImage: ImageAvatar
	typeOfBusiness: number
	businessSectors: string
	account: Account
	facebookId: string
	googleId: string
	zaloId: string
	profileProgress: number
	type: number
	status: number
	statusShop: number
	process: number
	requireNote: string
	selled: boolean
	addedProduct: boolean
	description: string | null
	updatedAt: Date
	createdAt: Date
	version: number
	violation?: {
		id: string
		merchantId: number
		reasonLock: number
		description: string
		closed: boolean
		ByStaffNumber: number
		delete: boolean
		updatedBy: string
		updatedAt: Date
		createdBy: string
		createdAt: Date
		version: number
		reasonLockName: string
		staffName: string
	}
	requirement?: {
		id: string
		merchantId: number
		reasonDeny: number
		description: string
		closed: boolean
		ByStaffNumber: number
		delete: boolean
		updatedBy: string
		updatedAt: Date
		createdBy: string
		createdAt: Date
		version: number
		reasonDenyName: string
		staffName: string
	}
	categorynames?: string[]
}

export interface ExtraInfo {
	totalProduct: number
	totalStore: number
	totalLike: number
	totalVisitor: number
	totalFollow: number
	totalRating: number
	averageRating: number
	lastOnline: Date | null
}

export interface ImageAvatar {
	name: string
	description: string
	filePath: string
	fullPath: string
	fileExtension: string
}

export interface Account {
	fullName: string
	gender: number
	mobilePhone: string
	passwordHash: string
	salt: string
}

export interface Document {
	documentId: string
	merchantId: number
	name: string
	typeOfBusinessModel: number
	license: {
		typeOfDocument: number
		isRequire: true
		files: {
			name: string
			description: string
			filePath: string
			fullPath: string
			fileExtension: string
		}[]
		totalFile: number
	}[]
	isDeleted: boolean
	createdAt: Date
	verion: number
}

export interface Staff {
	staffId: string
	userName: string
	userId: string
	merchantId: number
	fullName: string
	fullNameASCII: string
	mobilePhone: string
	email: string
	positionId: number
	roleId: number
	status: number
	storeId: string
	createdAt: string
	version: number
	roleName: string
	positionName: string
	storeName: string
}

export interface MerchantRequirement {
	CreatedBy: string
	UpdatedAt: Date
	UpdatedBy: string
	closed: boolean
	createdAt: Date
	description: string
	merchantId: number
	reasonDeny: number
	requireId: string
	version: number
}

export interface ReasonDeny {
	requireId: string
	merchantId: number
	reasonDeny: number
	description: string
	closed: boolean
	UpdatedBy: string
	UpdatedAt: Date
	CreatedBy: string
	createdAt: Date
	version: number
}

export interface IParamShopRequest {
	keyword?: string
	typeOfBusinesses?: string
	selled?: boolean
	process?: number
	merchantIds?: string
	time?: string
	ratingStars?: string
	staffNumbers?: string
	statusShop?: number
	categoryIds?: string
	page?: number
	pageSize?: number
}

export interface IFilterShopParams {
	keyword?: string
	typeOfBusinesses?: (string | number)[]
	selled?: boolean
	status?: number
	process?: number
	statusShop?: number
	merchantIds?: (string | number)[]
	time?: string
	ratingStars?: [number, number]
	staffNumbers?: (string | number)[]
	categoryIds?: (string | number)[]
	categoryIdsDisplay?: (string | number)[]
	page?: number
	pageSize?: number
}

export interface IDataFilterShop {
	merchantId: number
	typeOfBusiness: number
	name: string
	companyName: string
	representativeName: string
}

export interface Policy {
	id: number
	slogan: string
	typeOfBusiness: number
	policies: {
		title: string
		header: string
		contentReturnTime: string
		returnTimes: {
			time: number
			contentReturnTime: string
			isChoosen: boolean
		}[]
		description: string
		typeOfPolicy: number
		contentShippingFee: string
		shippingFeeBySeller: boolean
		contentAgree: string
		agree: boolean
		isRequire: boolean
	}[]
	createdBy: Date
	createdAt: Date
	merchantId: number
	returnId: string
}

export interface Contract {
	contractId: string
	contractNumber: string
	statusName: string
	nextSign: string
	createdBy: string
	createdByName: string
	createdAt: Date
	merchantId: number
	merchantName: string
	name: string
	note: string
}

export interface ContractInfo {
	createdAt: Date
	number: string
	templateId: number
	fileId: string
	signatureConfigs: SignatureConfig[]
	typeFile: number
	typeFileName: string
}

export interface SignatureConfig {
	pageSign: number
	signatureId?: string
	size: Size
	position: { [key: string]: number }
	signIndex: number
	assignSign: string
	isSigned?: boolean
	signedDate?: Date
}
export interface Size {
	width: number
	height: number
}

export interface ContractDelivery {
	contractId: string
	fullName?: string
	mobilePhone?: string
	address?: string
	createdAt?: Date
	merchantId?: number
}
export interface ContractDetail {
	contractId?: string
	contractNumber?: string
	contractInfos?: ContractInfo[]
	status?: number
	statusName?: string
	nextSign?: string
	createdBy?: string
	createdByName?: string
	createdAt?: Date
	merchantId?: number
	merchantName?: string
	name?: string
	note?: string
	updatedBy?: string
	updatedAt?: Date
	isHardCopyContract?: boolean
	contractDelivery?: ContractDelivery
}

export interface IStore {
	storeId?: string
	merchantId?: number
	name?: string
	code?: string
	provinceId?: number
	districtId?: number
	wardId?: number
	address?: string
	province?: string
	district?: string
	ward?: string
	fullAddress?: string
	typeOfStore?: number
	images?: IImage[]
	description?: string
	location?: {
		lat?: number
		lon?: number
	}
	openTime?: number
	closeTime?: number
	status?: number
	staffId?: string
	isDefault?: boolean
	updatedAt?: Date
	createdAt?: Date
	version?: number
	staffName?: string
	mobilePhone?: string
}

export interface IImage {
	name?: string
	description?: string
	filePath?: string
	fullPath?: string
	fileExtension?: string
}

export interface Hierachy {
	id: number
	level: number
	parentId: number
	name: string
	nameEn: string
	shortName: string
	shortNameEn: string
	title: string
	titleEn: string
	urlSlug: string
	description: string
	descriptionEn: string
	image: string
	tag: string
	tagEn: string
	children: Hierachy[]
	displayOrder: number
	isEnableBuyNow: boolean
}

export interface StaffDropdown {
	id: string
	userId: string
	staffNumber?: number
	fullName?: string
	status?: number
	avatarImage?: string
}

export interface ShippingByPartner {
	id: number
	title?: string
	type?: string
	children?: {
		id: number
		title?: string
		rate?: number
		status?: boolean
		description?: string[]
	}[]
}

export interface ShippingBySelf {
	id: string
	merchantId: number
	shippingPackageId: number
	shippingPartnerData: {
		min: number
		max: number
		type: string
		value: number
		isMin: boolean
	}[]
	description: string
	isActive: boolean
	createdAt: Date
}

export interface Advertiser {
	id: string
	userId: string
	staffNumber?: number
	fullName?: string
	fullNameASCII?: string
	affilateCode?: string
	status?: number
	email?: string
	emailConfirmed?: boolean
	mobilePhone?: string
	phoneNumberConfirmed?: boolean
	avatarImage?: string
	positionId?: number
	roleId?: number
	updatedAt?: Date
	createdAt: Date
	version?: number
}

export interface ReasonLockMerchant {
	id: string
	merchantId: number
	reasonLock: number
	description: string
	closed: boolean
	delete: boolean
	updatedBy: string
	updatedAt: Date
	createdBy: string
	createdAt: Date
	version: number
}

export interface ConstantValues {
	id: number
	name: string
}

export interface StaffSupport {
	id: string
	merchantId: number
	categoryId: number
	staffs: {
		staffNumber: number
		name: string
	}[]
	managers: {
		staffNumber: number
		name: string
	}[]
	categoryName: string
	totalProduct: number
	delete: boolean
	updatedBy: string
	updatedAt: Date
	createdBy: string
	createdAt: Date
	version: number
}

export interface BulkSupport {
	categoryId: number
	staffNumbers?: number[] | null
	managerNumbers?: number[] | null
}

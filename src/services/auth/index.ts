import { getRegisterClientByHostname } from '@/utility'
import { AUTHEN_HOSTNAME } from '@/utility/constants'
import request from '@/utility/request'

const baseURL = process.env.REACT_APP_AUTHEN_API_URL

export const authenticationApi = {
	registerClient: (data) => {
		return request({
			baseURL,
			url: '/RegisterClient/Register',
			method: 'POST',
			data,
		})
	},
	login: (data) => {
		return request({
			baseURL,
			url: '/Authentication/Authenticate',
			method: 'POST',
			data,
		})
	},
	logout: async (data: any = {}) => {
		const dbData = await getRegisterClientByHostname(AUTHEN_HOSTNAME)

		return request({
			baseURL,
			url: '/Authentication/Logout',
			method: 'POST',
			data,
			headers: { clientid: dbData.ClientID },
		})
	},
}

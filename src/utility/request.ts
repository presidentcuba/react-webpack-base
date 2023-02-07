import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LOGIN_INFO_LS_NAME } from './constants'

enum REQUEST_TIMEOUT {
	default = 10000,
}

const request = axios.create({
	baseURL: process.env.REACT_APP_TMS_API_URL,
	timeout: REQUEST_TIMEOUT.default,
})

const InterceptorsRequest = async (config: AxiosRequestConfig) => {
	const loginInfo = localStorage.getItem(LOGIN_INFO_LS_NAME)

	if (loginInfo) {
		const { tokenString } = JSON.parse(loginInfo)

		config.headers = {
			...config.headers,
			authendata: tokenString,
		}
	}

	return config
}

const InterceptorsError = (error) => {
	return Promise.reject(error)
}

const InterceptorResponse = (response: AxiosResponse) => {
	if (response && response.data) {
		return response.data
	}

	return response
}

request.interceptors.request.use(InterceptorsRequest, InterceptorsError)
request.interceptors.response.use(InterceptorResponse, InterceptorsError)

export default request

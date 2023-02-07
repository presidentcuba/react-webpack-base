import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface Errors {
	message?: string
	statusCode?: number
}

export interface AuthState {
	isLoggedIn: boolean
	isLoading: boolean
	token?: string | null
	errors?: Errors
	userInfo: any
	tokenString?: string
}

const initialState: AuthState = {
	isLoggedIn: false,
	isLoading: false,
	token: undefined,
	errors: undefined,
	userInfo: {},
}
const authorizationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		checkRegisterRequest(state, action: PayloadAction<any>) {
			state.isLoading = true
		},
		setClientInfo(state, action: PayloadAction<any>) {
			state.userInfo = action.payload
		},
		registerSuccess(state) {
			state.isLoading = false
		},
		registerFailed(state) {
			state.isLoading = false
		},
		loginSuccess(state, action: PayloadAction<{ userInfo: any; tokenString: string }>) {
			state.isLoggedIn = true
			state.userInfo = action.payload.userInfo
			state.tokenString = action.payload.tokenString
		},
		loginFailed(state) {
			state.isLoggedIn = false
		},
		logoutRequest(state) {},
	},
})

// Action
export const authActions = authorizationSlice.actions

// Selector
export const isLoadingSelector = (state: RootState) => state.authentication.isLoading
export const isLoggedInSelector = (state: RootState) => state.authentication.isLoggedIn
export const userInfoSelector = (state: RootState) => state.authentication.userInfo

// reducer
const authReducer = authorizationSlice.reducer
export default authReducer

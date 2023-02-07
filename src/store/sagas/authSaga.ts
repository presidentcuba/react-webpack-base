import { call, fork, put, takeLatest } from 'redux-saga/effects'
import { authActions } from '@/store/reducers/authSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import indexedDBLib from '@/library/indexedDBLib'
import { CLIENT_INFO_OBJECT_STORENAME, LOGIN_INFO_LS_NAME } from '@/utility/constants'
import { decryptData2, encryptData2, genRSAKey, openNotification } from '@/utility'
import { GUID } from '@/library/AuthenLib'
import { authenticationApi } from '@/services'
import { push } from '@/store/reducers/routerSlice'

function* registerFromServer(hostname, username, password) {
	const key = genRSAKey(1024)
	const clientID = GUID()

	const data = {
		ClientID: clientID,
		UserName: username,
		Password: password,
		ClientPublicKey: key.PublicKey,
	}

	try {
		const response = yield call(authenticationApi.registerClient, data)

		if (response && !response.IsError) {
			const encryptedServerPublicKey = response.ResultObject.ServerPublicKey
			const plainServerPublicKey = decryptData2(key.PrivateKey, 1024, encryptedServerPublicKey)

			const saveRegisterClientData = {
				IsRegisterClientRequest: false,
				IsRegisterClientCompleted: true,
				IsRegisterClientSuccess: true,
				IsRegisterClientError: false,
				ClientID: clientID,
				ClientPublicKey: key.PublicKey,
				ClientPrivateKey: key.PrivateKey,
				ServerPublicKey: plainServerPublicKey,
			}

			const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)
			db.set(hostname, saveRegisterClientData).catch((error) => {
				console.log('callRegisterClientFromServer:', error)
			})

			yield put(authActions.registerSuccess())
			yield login({ username, password, serverPublicKey: plainServerPublicKey, clientID })
		} else {
			yield put(authActions.registerFailed())
		}
	} catch (error) {
		yield put(authActions.registerFailed())
	}
}

function* checkRegister(action: PayloadAction<any>) {
	const { hostname, username, password } = action.payload
	const db = new indexedDBLib(CLIENT_INFO_OBJECT_STORENAME)

	try {
		const result = yield db.get(hostname)

		if (result) {
			yield put(authActions.setClientInfo(result))
			yield login({
				clientID: result.ClientID,
				username,
				password,
				serverPublicKey: result.ServerPublicKey,
			})
		} else {
			yield registerFromServer(hostname, username, password)
		}
	} catch (error) {
		yield registerFromServer(hostname, username, password)
	}
}

function createLoginData(username, password, serverPublicKey) {
	const passowrdMD5 = password
	const loginData = username + '|' + passowrdMD5 + '|100|2|'
	const encryptLoginData = encryptData2(serverPublicKey, 1024, loginData)
	return encryptLoginData
}

function* login({ username, password, serverPublicKey, clientID }) {
	try {
		const loginData = createLoginData(username, password, serverPublicKey)
		const data = { ClientID: clientID, LoginData: loginData }

		const response = yield call(authenticationApi.login, data)
		const userInfo = response.ResultObject.LoginUserInfo
		const tokenString = response.ResultObject.TokenString

		localStorage.setItem(LOGIN_INFO_LS_NAME, JSON.stringify({ userInfo, tokenString }))

		if (response && !response.IsError) {
			yield put(authActions.loginSuccess({ userInfo, tokenString }))
			yield openNotification('success', 'Đăng nhập thành công')
			yield put(push('/home'))
		} else {
			yield put(authActions.loginFailed())
		}
	} catch (error) {
		yield put(authActions.loginFailed())
	}
}

function* logout() {
	try {
		const response = yield call(authenticationApi.logout)

		if (!response.IsError) {
			console.log('Đăng xuất thành công')
			yield put(push('/login'))
		}
	} catch (error) {}
}

function* logoutFlow() {
	const loginInfo = localStorage.getItem(LOGIN_INFO_LS_NAME)

	if (loginInfo) {
		const { userInfo, tokenString } = JSON.parse(loginInfo)
		yield put(authActions.loginSuccess({ userInfo, tokenString }))
	} else {
		yield logout()
	}
}

export default function* () {
	yield fork(logoutFlow)
	yield takeLatest(authActions.checkRegisterRequest.type, checkRegister)
	yield takeLatest(authActions.logoutRequest.type, logout)
}

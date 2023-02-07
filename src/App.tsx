import React, { Suspense } from 'react'
import ProtectedRoutes from '@/routes/ProtectedRoutes'

import 'antd/dist/antd.less'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from 'styled-components'
import { themes } from './styles/themes'
import PrivateRoute from './routes/PrivateRoute'
import { useAppSelector } from './hooks'
import { isLoggedInSelector } from './store/reducers/authSlice'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Auth/Login'
import { HelmetProvider } from 'react-helmet-async'

const App: React.FC = () => {
	const isAuthenticated = useAppSelector(isLoggedInSelector)

	return (
		<Suspense fallback={<div>Loading ...</div>}>
			<HelmetProvider>
				<ThemeProvider theme={themes}>
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route
							path='*'
							element={
								<PrivateRoute isAuthenticated={isAuthenticated}>
									<ProtectedRoutes />
								</PrivateRoute>
							}
						/>
					</Routes>

					<ToastContainer />
				</ThemeProvider>
			</HelmetProvider>
		</Suspense>
	)
}

export default App

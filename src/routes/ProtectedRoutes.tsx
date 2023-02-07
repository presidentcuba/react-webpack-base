import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import localRoutes from './routes'

// import remoteRoutesProfile from 'profile/routes'
const routes = [...localRoutes]

const ProtectedRoutes: React.FC = () => (
	<Suspense fallback={<div>Loading ....</div>}>
		<Routes>
			{routes.map(({ component: Component, path }) => (
				<Route path={path} key={path} element={Component ? <Component /> : <Navigate to={'/'} replace={true} />} />
			))}
		</Routes>
	</Suspense>
)

export default ProtectedRoutes

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export type PrivateRouteProps = {
	children: React.ReactElement
	isAuthenticated?: boolean
}

const PrivateRoute = ({ children, isAuthenticated }: PrivateRouteProps) => {
	const location = useLocation()

	return isAuthenticated ? children : <Navigate to='/login' state={{ from: location }} replace />
}

export default PrivateRoute

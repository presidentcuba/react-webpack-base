import React, { FC } from 'react'

const Page = React.lazy(() => import('@/pages'))
const LoginPage = React.lazy(() => import('@/pages/Auth/Login'))
const FormValidate = React.lazy(() => import('@/pages/FormValidate'))
const Home = React.lazy(() => import('@/pages/Home'))

interface IRoutes {
	path: string
	component?: React.LazyExoticComponent<FC<any>>
}

const routes: IRoutes[] = [
	{
		path: '/',
		component: Page,
	},
	{
		path: '/login',
		component: LoginPage,
	},
	{
		path: '/validate',
		component: FormValidate,
	},
	{
		path: '/home',
		component: Home,
	},
]

export default routes

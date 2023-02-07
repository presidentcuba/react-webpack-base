// For CSS
declare module '*.module.css' {
	const classes: { [key: string]: string }
	export default classes
}

declare module '*.scss' {
	const classes: { [key: string]: string }
	export default classes
}

// For SCSS
declare module '*.module.scss' {
	const classes: { [key: string]: string }
	export default classes
}

declare module '*.png'

declare module '*.svg'

declare module 'container/routes' {
	const routes: any[]

	export default routes
}

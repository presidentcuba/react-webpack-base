import React, { Fragment, useReducer } from 'react'
import { BrowserHistory, Update, History } from 'history'
import { Middleware, createSlice } from '@reduxjs/toolkit'
import { Router } from 'react-router-dom'

type ReduxAction<T = any> = {
	type: string
	payload?: T
}

const { reducer: routerReducer, actions: routerActions } = createSlice({
	name: 'router',
	initialState: {
		path: window.location.pathname,
	},
	reducers: {
		push: (state, action) => ({ path: action.payload }),
	},
})

export const routerMiddleware =
	(history: BrowserHistory): Middleware =>
	() =>
	(next) =>
	(action: ReduxAction) => {
		switch (action.type) {
			case routerActions.push.type: {
				history.push(action.payload)
				return next(action)
			}
			default:
				return next(action)
		}
	}

export interface BrowserRouterProps {
	children?: React.ReactNode
	window?: Window
	history: History
}

export function ConnectedRouter({ children, history }: BrowserRouterProps) {
	const [state, dispatch] = useReducer((_: Update, action: Update) => action, {
		action: history.action,
		location: history.location,
	})

	React.useLayoutEffect(() => history.listen(dispatch), [history])

	return (
		<Router location={state.location} navigator={history}>
			<Fragment>{children}</Fragment>
		</Router>
	)
}

export const { push } = routerActions

export { routerReducer, routerActions }

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { routerMiddleware } from './reducers/routerSlice'
import { history } from '@/utility/history'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: true, immutableCheck: true, serializableCheck: false }).concat(
			sagaMiddleware,
			routerMiddleware(history)
		),
	devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

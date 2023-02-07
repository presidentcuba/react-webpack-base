import { combineReducers } from 'redux'
import { routerReducer } from './reducers/routerSlice'
import authentication from './reducers/authSlice'

const rootReducer = combineReducers({
	router: routerReducer,
	authentication,
})

export default rootReducer

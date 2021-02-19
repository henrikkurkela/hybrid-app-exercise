import { createStore, combineReducers } from 'redux'

import authReducer from './authReducer'
import postingsReducer from './postingsReducer'

const reducer = combineReducers({
	auth: authReducer,
	postings: postingsReducer
})

const store = createStore(reducer)

export default store

import React from 'react'
import { NativeRouter, Route, Switch } from 'react-router-native'
import { Provider } from 'react-redux'

import Dashboard from './components/dashboard'
import SignupForm from './components/signup'
import LoginForm from './components/login'
import Posting from './components/posting'
import Create from './components/create'
import Search from './components/search'

import store from './reducers'

export default function App() {
	return (
		<Provider store={store}>
			<NativeRouter>
				<Switch>
					<Route path='/' exact>
						<Dashboard />
					</Route>
					<Route path='/signup' exact>
						<SignupForm />
					</Route>
					<Route path='/login' exact>
						<LoginForm />
					</Route>
					<Route path='/create'>
						<Create />
					</Route>
					<Route path='/search'>
						<Search />
					</Route>
					<Route path='/posting/:id'>
						<Posting />
					</Route>
				</Switch>
			</NativeRouter>
		</Provider>
	)
}

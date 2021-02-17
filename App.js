import React from 'react'
import { NativeRouter, Route, Switch, Link } from 'react-router-native'
import { Provider } from 'react-redux'

import Dashboard from './components/dashboard'
import SignupForm from './components/signup'
import LoginForm from './components/login'

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
				</Switch>
			</NativeRouter>
		</Provider>
	)
}

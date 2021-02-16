import React from 'react'
import { View, Text } from 'react-native'
import { NativeRouter, Route, Switch, Link } from 'react-router-native'
import { Provider } from 'react-redux'
import LoginForm from './components/login'

import store from './reducers'
import styles from './styles'

export default function App() {
	return (
		<Provider store={store}>
			<NativeRouter>
				<View style={styles.container}>
					<Switch>
						<Route path='/' exact>
							<Link to='/login'>
								<Text style={styles.button}>Log In</Text>
							</Link>
						</Route>
						<Route path='/login' exact>
							<LoginForm />
						</Route>
					</Switch>
				</View>
			</NativeRouter>
		</Provider>
	)
}

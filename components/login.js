import React, { useState } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native'
import { useHistory, Link } from 'react-router-native'
import axios from 'axios'

import styles from '../styles'
import { authenticate } from '../actions'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [text, setText] = useState('Log In')

    const history = useHistory()

    const login = () => {

        axios.post('https://kebappi.herokuapp.com/api/login', { username, password })
            .then((response) => {
                authenticate({ auth: response.data.auth, username: username })
                history.push('/')
            }).catch((error) => {
                setText(error.response?.data || 'Network error.')
            })
    }

    return (
        <View style={styles.background}>
            <Text style={styles.headline}>{text}</Text>
            <TextInput
                style={styles.field}
                placeholder='username'
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.field}
                placeholder='password'
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Pressable onPress={login}>
                <Text style={styles.button}>
                    Log In
                </Text>
            </Pressable>
            <Pressable onPress={() => history.push('/')}>
                <Text style={styles.button}>
                    Go Back
                </Text>
            </Pressable>
            <Text style={styles.text}>
                No account yet?
            </Text>
            <Link to='/signup'>
                <Text style={styles.link}>Sign Up</Text>
            </Link>
        </View>
    )
}

export default LoginForm

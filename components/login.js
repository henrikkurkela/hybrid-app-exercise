import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, Pressable, BackHandler } from 'react-native'
import { useHistory, Link } from 'react-router-native'
import axios from 'axios'

import styles from '../styles'
import { authenticate } from '../actions'
import { BACKEND_URL } from '../constants'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [text, setText] = useState('Log In')

    const history = useHistory()

    useEffect(() => {

        const backAction = () => {
            history.goBack()
            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        )

        return () => backHandler.remove()
    }, [])

    const login = () => {

        axios.post(`${BACKEND_URL}/login`, { username, password })
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

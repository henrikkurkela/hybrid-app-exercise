import React, { useState } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native'
import { useHistory } from 'react-router-native'
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
                authenticate(response.data)
                history.push('/', [`Welcome ${username}`])
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
                onChange={(event) => setUsername(event.target.value)}
            />
            <TextInput
                style={styles.field}
                placeholder='password'
                secureTextEntry={true}
                onChange={(event) => setPassword(event.target.value)}
            />
            <Pressable onPress={login}>
                <Text style={styles.button}>
                    Log In
                </Text>
            </Pressable>
            <Pressable onPress={() => history.goBack()}>
                <Text style={styles.button}>
                    Go Back
                </Text>
            </Pressable>
        </View>
    )
}

export default LoginForm

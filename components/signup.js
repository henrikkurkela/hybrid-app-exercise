import React, { useState } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native'
import { useHistory, Link } from 'react-router-native'
import axios from 'axios'

import styles from '../styles'

const SignupForm = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [text, setText] = useState('Sign Up')

    const history = useHistory()

    const signup = () => {

        axios.post('https://kebappi.herokuapp.com/api/signup', { email, username, password })
            .then((response) => {
                console.log(response)
                history.push('/', [`Account ${username} created.`])
            }).catch((error) => {
                setText(error.response?.data || 'Network error.')
            })
    }

    return (
        <View style={styles.background}>
            <Text style={styles.headline}>{text}</Text>
            <TextInput
                style={styles.field}
                placeholder='email'
                onChange={(event) => setEmail(event.target.value)}
            />
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
            <Pressable onPress={signup}>
                <Text style={styles.button}>
                    Sign Up
                </Text>
            </Pressable>
            <Pressable onPress={() => history.push('/')}>
                <Text style={styles.button}>
                    Go Back
                </Text>
            </Pressable>
            <Text style={styles.text}>
                Already a member?
            </Text>
            <Link to='/login'>
                <Text style={styles.link}>Log In</Text>
            </Link>
        </View>
    )
}

export default SignupForm

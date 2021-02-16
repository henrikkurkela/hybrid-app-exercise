import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'

import styles from '../styles'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View>
            <Text style={styles.text}>Log In</Text>
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
            <Pressable>
                <Text style={styles.button}>
                    Log In
                </Text>
            </Pressable>
        </View>
    )
}

export default LoginForm

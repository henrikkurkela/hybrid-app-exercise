import React from 'react'
import { View, Text } from 'react-native'
import { Link, useHistory } from 'react-router-native'

import Postings from './postings'

import styles from '../styles'


const Dashboard = () => {

    const history = useHistory()

    const status = history.location.state

    return (
        <View>
            <Text style={styles.text}>{status}</Text>
            <Link to='/signup'>
                <Text style={styles.button}>Sign Up</Text>
            </Link>
            <Link to='/login'>
                <Text style={styles.button}>Log In</Text>
            </Link>
            <Postings />
        </View>
    )
}

export default Dashboard

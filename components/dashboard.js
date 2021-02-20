import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Link } from 'react-router-native'
import { useSelector } from 'react-redux'

import Postings from './postings'

import styles from '../styles'

const Dashboard = () => {

    const auth = useSelector(state => state.auth)
    const [status, setStatus] = useState('Welcome! Log in to start selling!')

    useEffect(() => {

        if (auth !== null) {
            setStatus(`Welcome back, ${auth.username}`)
        }
    }, [])

    return (
        <View style={styles.background}>
            <Text style={styles.headline}>{status}</Text>
            {
                auth ?
                    <Link to='/create'>
                        <Text style={styles.button}>New Posting</Text>
                    </Link> :
                    <Link to='/login'>
                        <Text style={styles.button}>Log In</Text>
                    </Link>
            }
            <Postings />
        </View>
    )
}

export default Dashboard

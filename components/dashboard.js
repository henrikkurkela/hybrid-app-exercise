import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import { useSelector } from 'react-redux'

import Postings from './postings'

import styles from '../styles'

const Dashboard = () => {

    const auth = useSelector(state => state.auth)
    const [status, setStatus] = useState('Welcome! Log in to start selling!')
    const [allPostings, setAllPostings] = useState(true)

    useEffect(() => {

        if (auth !== null) {
            setStatus(`Welcome back, ${auth.username}`)
        }
    }, [])

    const header = () => {

        if (auth) {
            return (
                <>
                    <Text style={styles.headline}>{status}</Text>
                    <Link to='/create'>
                        <Text style={styles.button}>New Posting</Text>
                    </Link>
                    <Pressable onPress={() => setAllPostings(!allPostings)}>
                        <Text style={styles.button}>{
                            allPostings ?
                                'Show My Postings' :
                                'Show All Postings'
                        }</Text>
                    </Pressable>
                </>
            )
        } else {
            return (
                <>
                    <Text style={styles.headline}>{status}</Text>
                    <Link to='/login'>
                        <Text style={styles.button}>Log In</Text>
                    </Link>
                </>
            )
        }
    }

    return (
        <View style={styles.background}>
            <Postings user={allPostings ? null : auth.username} header={header} />
        </View>
    )
}

export default Dashboard

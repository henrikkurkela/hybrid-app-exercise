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

    return (
        <View style={styles.background}>
            <Text style={styles.headline}>{status}</Text>
            {
                auth ?
                    <>
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
                    </> :
                    <Link to='/login'>
                        <Text style={styles.button}>Log In</Text>
                    </Link>
            }
            <Postings user={allPostings ? null : auth.username} />
        </View>
    )
}

export default Dashboard

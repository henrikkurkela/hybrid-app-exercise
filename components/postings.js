import React, { useState, useEffect } from 'react'
import { View, FlatList, Text } from 'react-native'
import axios from 'axios'

import styles from '../styles'

const Item = ({ title }) => (
    <View>
        <Text style={styles.text}>{title}</Text>
    </View>
)

const Postings = () => {

    const [postings, setPostings] = useState([])

    useEffect(() => {
        axios.get('https://kebappi.herokuapp.com/api/postings')
            .then((response) => {
                setPostings(response.data)
            }).catch((error) => {
                setPostings([{ id: 0, title: 'Network error.' }])
            })
    }, [])

    const renderPosting = ({ item }) => (
        <Item title={item.title} />
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={postings}
                renderItem={renderPosting}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default Postings

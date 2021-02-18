import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Image } from 'react-native'
import axios from 'axios'

import styles from '../styles'

const Item = ({ item }) => (
    <View style={styles.listItem}>
        <View style={styles.listPictureContainer}>
            <Image source={require('../assets/test.jpg')} style={{ width: 100, height: 100 }} />
        </View>
        <View style={styles.listTextContainer}>
            <Text style={styles.headline}>{item.title + ' ' + item.price + ' €'}</Text>
            <Text style={styles.text}>{item.description}</Text>
        </View>
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
        <Item item={item} />
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

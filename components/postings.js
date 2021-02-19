import React, { useEffect } from 'react'
import { View, FlatList, Text, Image } from 'react-native'
import { Link } from 'react-router-native'
import { useSelector } from 'react-redux'
import axios from 'axios'

import styles from '../styles'
import { addPosting } from '../actions'

const Item = ({ item }) => (
    <Link to={`/posting/${item.id}`}>
        <View style={styles.listItem}>
            <View style={styles.listPictureContainer}>
                <Image source={require('../assets/test.jpg')} style={{ width: 100, height: 100 }} />
            </View>
            <View style={styles.listTextContainer}>
                <Text style={styles.headline}>{item.title + ' ' + item.price + ' €'}</Text>
                <Text style={styles.text}>{item.description}</Text>
            </View>
        </View>
    </Link>
)

const Postings = () => {

    const postings = useSelector(state => state.postings)

    useEffect(() => {

        let mounted = true

        axios.get('https://kebappi.herokuapp.com/api/postings')
            .then((response) => {
                if (mounted) {
                    response.data.map((posting) => {
                        addPosting(posting)
                    })
                }
            }).catch((error) => {
                console.log(error)
            })

        return () => mounted = false
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

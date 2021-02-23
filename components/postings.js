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
                {
                    item.images[0] ?
                        <Image source={{ uri: `https://kebappi.herokuapp.com/api${item.images[0].image}` }} style={styles.image} /> :
                        null
                }
            </View>
            <View style={styles.listTextContainer}>
                <Text style={styles.headline}>{item.title + ' ' + item.price + ' €'}</Text>
                <Text style={styles.text}>{item.description}</Text>
            </View>
        </View>
    </Link>
)

const Postings = ({ user = null, filter = { field: null, value: null }, header = () => { return <></> } }) => {

    const postings = useSelector(state => state.postings)

    let listData = []

    useEffect(() => {

        const source = axios.CancelToken.source()

        axios.get('https://kebappi.herokuapp.com/api/postings', {
            cancelToken: source.token
        })
            .then((response) => {
                response.data.map((posting) => {
                    addPosting(posting)
                })
            }).catch((error) => {
                console.log(error)
            })

        return () => source.cancel()
    }, [])

    if (user) {
        listData = postings.filter((item) => item.user.username === user)
    } else {
        listData = postings
    }

    if (filter.field && filter.value) {
        listData = listData.filter((item) => RegExp(filter.value, 'gi').test(item[filter.field]))
    }

    const renderPosting = ({ item }) => (
        <Item item={item} />
    )

    return (
        <FlatList
            ListHeaderComponent={header}
            data={listData}
            renderItem={renderPosting}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default Postings

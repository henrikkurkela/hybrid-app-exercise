import React from 'react'
import { View, Text, Image } from 'react-native'
import { useParams, Link } from 'react-router-native'
import { useSelector } from 'react-redux'

import styles from '../styles'

const Posting = () => {

    const postings = useSelector(state => state.postings)
    const { id } = useParams()

    const posting = postings.find((item) => Number(item.id) === Number(id))

    return (
        <View style={styles.background}>
            <Text style={styles.headline}>{posting.title}</Text>
            <Text style={styles.text}>{`${posting.price} €`}</Text>
            {
                posting.images.map((image) => {
                    return <Image key={image.id} source={require('../assets/test.jpg')} style={styles.image} />
                })
            }
            <Text style={styles.text}>{posting.description}</Text>
            <Link to='/'>
                <Text style={styles.link}>Go Back</Text>
            </Link>
        </View>
    )
}

export default Posting

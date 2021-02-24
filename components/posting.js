import React, { useState } from 'react'
import { View, ScrollView, Text, Image, Pressable } from 'react-native'
import { useParams, Link, useHistory } from 'react-router-native'
import { useSelector } from 'react-redux'
import axios from 'axios'

import styles from '../styles'
import { removePosting } from '../actions'

const Posting = () => {

    const auth = useSelector(state => state.auth)
    const postings = useSelector(state => state.postings)

    const { id } = useParams()
    const history = useHistory()

    const posting = postings.find((item) => Number(item.id) === Number(id))

    const [ownPosting, setOwnPosting] = useState(() => {
        if (auth && posting.user.username === auth.username) {
            return true
        } else {
            return false
        }
    })

    const deletePosting = (item) => {

        axios.delete(`https://kebappi.herokuapp.com/api/postings/${item.id}`)
            .then(() => {
                removePosting(item)
                history.push('/')
            })
            .catch((error) => {
                console.log(error)
            })

    }

    if (posting) {
        return (
            <ScrollView style={styles.background}>
                <Text style={styles.headline}>{posting.title}</Text>
                <Text style={styles.text}>{`${posting.price} €`}</Text>
                {
                    ownPosting ?
                        <>
                            <Pressable onPress={() => history.push('/create', posting)}>
                                <Text style={styles.button}>Edit Posting</Text>
                            </Pressable>
                            <Pressable onPress={() => deletePosting(posting)}>
                                <Text style={styles.button}>Delete Posting</Text>
                            </Pressable>
                        </> :
                        null
                }
                {
                    posting.images.map((image) => {
                        return <Image key={image.id} source={{ uri: `https://kebappi.herokuapp.com/api${image.image}` }} style={styles.image} />
                    })
                }
                <Text style={styles.text}>{posting.description}</Text>
                <Text style={styles.text}>Shipping: {posting.shipping ? 'Yes' : 'No'}</Text>
                <Text style={styles.text}>Pickup: {posting.pickup ? 'Yes' : 'No'}</Text>
                <Text style={styles.text}>{`Contact: ${posting.user.email}`}</Text>
                <Link to='/'>
                    <Text style={{ ...styles.link, paddingBottom: 20 }}>Go Back</Text>
                </Link>
            </ScrollView>
        )
    } else {
        return (
            <View style={styles.background}>
                <Text style={styles.headline}>Posting Not Found</Text>
                <Link to='/'>
                    <Text style={styles.link}>Go Back</Text>
                </Link>
            </View>
        )
    }
}

export default Posting

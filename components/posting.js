import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, Image, Pressable, BackHandler } from 'react-native'
import { useParams, Link, useHistory } from 'react-router-native'
import { useSelector } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'

import styles from '../styles'
import { removePosting } from '../actions'
import { BACKEND_URL } from '../constants'

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

    useEffect(() => {

        const backAction = () => {
            history.goBack()
            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        )

        return () => backHandler.remove()
    }, [])

    const deletePosting = (item) => {

        axios.delete(`${BACKEND_URL}/postings/${item.id}`)
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <FontAwesome style={styles.iconContainer} name='truck' size={100} color={posting.shipping ? 'green' : 'red'} />
                        <Text style={styles.text}>Shipping: {posting.shipping ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FontAwesome style={styles.iconContainer} name='handshake-o' size={100} color={posting.pickup ? 'green' : 'red'} />
                        <Text style={styles.text}>Pickup: {posting.pickup ? 'Yes' : 'No'}</Text>
                    </View>
                </View>
                {
                    posting.images.map((image) => {
                        return <Image key={image.id} source={{ uri: `${BACKEND_URL}${image.image}` }} style={styles.image} />
                    })
                }
                <Text style={styles.text}>{posting.description}</Text>
                <Text style={{ ...styles.text, paddingBottom: 100 }}>{`Contact: ${posting.user.email}`}</Text>
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

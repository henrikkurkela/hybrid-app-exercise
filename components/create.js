import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { useHistory } from 'react-router-native'
import axios from 'axios'

import styles from '../styles'

const Create = () => {

    const [newPosting, setNewPosting] = useState({
        title: '',
        description: '',
        price: 0,
        location: '',
        category: '',
        shipping: false,
        pickup: false
    })

    const history = useHistory()

    const upload = () => {

        let formData = new FormData()

        formData.append('title', newPosting.title)
        formData.append('description', newPosting.description)
        formData.append('price', newPosting.price)
        formData.append('location', newPosting.location)
        formData.append('category', newPosting.category)
        if (newPosting.shipping) formData.append('shipping', 'true')
        if (newPosting.pickup) formData.append('pickup', 'true')

        axios({
            method: 'post',
            url: 'https://kebappi.herokuapp.com/api/postings',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(() => {
                history.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <View style={styles.background}>
            <Text style={styles.headline}>New Posting</Text>
            <TextInput
                style={styles.field}
                placeholder='title'
                onChange={(event) => setNewPosting({ ...newPosting, title: event.target.value })}
            />
            <TextInput
                style={styles.field}
                placeholder='description'
                onChange={(event) => setNewPosting({ ...newPosting, description: event.target.value })}
            />
            <TextInput
                style={styles.field}
                placeholder='price'
                keyboardType='numeric'
                onChange={(event) => setNewPosting({ ...newPosting, price: Number(event.target.value) })}
            />
            <TextInput
                style={styles.field}
                placeholder='location'
                onChange={(event) => setNewPosting({ ...newPosting, location: event.target.value })}
            />
            <TextInput
                style={styles.field}
                placeholder='category'
                onChange={(event) => setNewPosting({ ...newPosting, category: event.target.value })}
            />
            <Pressable onPress={() => setNewPosting({ ...newPosting, shipping: !newPosting.shipping })}>
                <Text style={styles.button}>
                    {newPosting.shipping ? 'I can ship' : 'No shipping'}
                </Text>
            </Pressable>
            <Pressable onPress={() => setNewPosting({ ...newPosting, pickup: !newPosting.pickup })}>
                <Text style={styles.button}>
                    {newPosting.pickup ? 'Buyer can pickup' : 'No pickups'}
                </Text>
            </Pressable>
            <Pressable onPress={upload}>
                <Text style={styles.button}>
                    Post
                </Text>
            </Pressable>
            <Pressable onPress={() => history.push('/')}>
                <Text style={styles.button}>
                    Go Back
                </Text>
            </Pressable>
        </View>
    )
}

export default Create

import React, { useState, useEffect } from 'react'
import { ScrollView, Text, TextInput, Pressable, Image } from 'react-native'
import { useHistory } from 'react-router-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

import styles from '../styles'
import { updatePosting } from '../actions'

const Create = () => {

    const [editMode, setEditMode] = useState(false)
    const [newPosting, setNewPosting] = useState({
        title: '',
        description: '',
        price: 0,
        location: '',
        category: '',
        images: [],
        shipping: false,
        pickup: false
    })

    const history = useHistory()

    useEffect(() => {

        if (history.location.state !== undefined) {
            setNewPosting({ ...history.location.state, images: [] })
            setEditMode(true)
        }
    }, [history])

    const addPicture = () => {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        }).then((result) => {
            console.log(result)

            if (result.cancelled === false) {
                setNewPosting({ ...newPosting, images: newPosting.images.concat(result.uri) })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const upload = () => {

        let formData = new FormData()

        formData.append('title', newPosting.title)
        formData.append('description', newPosting.description)
        formData.append('price', newPosting.price)
        formData.append('location', newPosting.location)
        formData.append('category', newPosting.category)

        newPosting.images.map((item, key) => {
            formData.append('images', { uri: item, type: 'image/*', name: `image${key}` })
        })

        if (newPosting.shipping) {
            formData.append('shipping', 'true')
        } else {
            formData.append('shipping', 'false')
        }
        if (newPosting.pickup) {
            formData.append('pickup', 'true')
        } else {
            formData.append('pickup', 'false')
        }

        if (editMode) {
            axios({
                method: 'patch',
                url: `https://kebappi.herokuapp.com/api/postings/${newPosting.id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then((response) => {
                    updatePosting(response.data)
                    history.push('/')
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
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
    }

    return (
        <ScrollView style={styles.background}>
            <Text style={styles.headline}>New Posting</Text>
            <TextInput
                style={styles.field}
                placeholder='title'
                value={newPosting.title}
                onChangeText={(text) => setNewPosting({ ...newPosting, title: text })}
            />
            <TextInput
                style={styles.field}
                placeholder='description'
                value={newPosting.description}
                onChangeText={(text) => setNewPosting({ ...newPosting, description: text })}
            />
            <TextInput
                style={styles.field}
                placeholder='price'
                keyboardType='numeric'
                value={String(newPosting.price)}
                onChangeText={(text) => setNewPosting({ ...newPosting, price: Number(text) })}
            />
            {
                newPosting.images.map((item, index) => {
                    return <Image key={index} source={{ uri: item }} style={styles.image} />
                })
            }
            <Pressable onPress={addPicture}>
                <Text style={styles.button}>
                    Add Picture
                </Text>
            </Pressable>
            <TextInput
                style={styles.field}
                placeholder='location'
                value={newPosting.location}
                onChangeText={(text) => setNewPosting({ ...newPosting, location: text })}
            />
            <TextInput
                style={styles.field}
                placeholder='category'
                value={newPosting.category}
                onChangeText={(text) => setNewPosting({ ...newPosting, category: text })}
            />
            <Pressable onPress={() => setNewPosting({ ...newPosting, shipping: !newPosting.shipping })}>
                <Text style={newPosting.shipping ? styles.buttonGreen : styles.buttonRed}>
                    {newPosting.shipping ? 'I can ship' : 'No shipping'}
                </Text>
            </Pressable>
            <Pressable onPress={() => setNewPosting({ ...newPosting, pickup: !newPosting.pickup })}>
                <Text style={newPosting.pickup ? styles.buttonGreen : styles.buttonRed}>
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
        </ScrollView>
    )
}

export default Create

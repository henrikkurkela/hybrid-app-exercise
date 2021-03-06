import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TextInput, Pressable, Image, BackHandler, Alert } from 'react-native'
import { useHistory } from 'react-router-native'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'

import styles from '../styles'
import { updatePosting } from '../actions'
import { BACKEND_URL } from '../constants'

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
            if (result.cancelled === false) {
                setNewPosting({ ...newPosting, images: newPosting.images.concat(result.uri) })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const removePicture = (picture) => {
        setNewPosting({ ...newPosting, images: newPosting.images.filter((item) => item !== picture) })
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

        if (newPosting.shipping === true) {
            formData.append('shipping', 'true')
        } else {
            formData.append('shipping', 'false')
        }

        if (newPosting.pickup === true) {
            formData.append('pickup', 'true')
        } else {
            formData.append('pickup', 'false')
        }

        if (editMode) {
            axios({
                method: 'patch',
                url: `${BACKEND_URL}/postings/${newPosting.id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then((response) => {
                    updatePosting(response.data)
                    history.push('/')
                })
                .catch((error) => {
                    Alert.alert(
                        'Error',
                        error.message,
                        [{ text: "OK" }]
                    )
                    console.log(error)
                })
        } else {
            axios({
                method: 'post',
                url: `${BACKEND_URL}/postings`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(() => {
                    history.push('/')
                })
                .catch((error) => {
                    Alert.alert(
                        'Error',
                        error.response?.data || 'Network error.',
                        [{ text: "OK" }]
                    )
                    console.log(error)
                })
        }
    }

    return (
        <ScrollView style={styles.background}>
            <Text style={styles.headline}>{editMode ? 'Edit Posting' : 'New Posting'}</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={{ flex: 1 }} onPress={() => setNewPosting({ ...newPosting, shipping: !newPosting.shipping })}>
                    <FontAwesome style={styles.iconContainer} name='truck' size={100} color={newPosting.shipping ? 'green' : 'red'} />
                    <Text style={styles.text}>Shipping: {newPosting.shipping ? 'Yes' : 'No'}</Text>
                </Pressable>
                <Pressable style={{ flex: 1 }} onPress={() => setNewPosting({ ...newPosting, pickup: !newPosting.pickup })}>
                    <FontAwesome style={styles.iconContainer} name='handshake-o' size={100} color={newPosting.pickup ? 'green' : 'red'} />
                    <Text style={styles.text}>Pickup: {newPosting.pickup ? 'Yes' : 'No'}</Text>
                </Pressable>
            </View>
            {
                newPosting.images.map((item, index) => {
                    return (
                        <Pressable key={index} onPress={() => removePicture(item)}>
                            <Image source={{ uri: item }} style={styles.image} />
                        </Pressable>
                    )
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
            <Pressable onPress={upload}>
                <Text style={styles.button}>
                    Post
                </Text>
            </Pressable>
        </ScrollView>
    )
}

export default Create

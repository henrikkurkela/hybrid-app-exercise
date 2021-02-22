import React, { useState } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { Link } from 'react-router-native'

import Postings from './postings'

import styles from '../styles'

const Search = () => {

    const fields = ['title', 'description', 'category', 'location']

    const [index, setIndex] = useState(0)
    const [filter, setFilter] = useState({ field: fields[index], value: '' })

    const changeField = () => {
        if (index < fields.length - 1) {
            setIndex(index + 1)
            setFilter({ ...filter, field: fields[index] })
        } else {
            setIndex(0)
        }
    }

    const header =
        <>
            <Text style={styles.headline}>Search</Text>
            <Link to='/'>
                <Text style={styles.button}>Go Back</Text>
            </Link>
            <TextInput
                style={styles.field}
                placeholder='value'
                value={filter.value}
                onChangeText={(text) => setFilter({ ...filter, value: text })}
            />
            <Pressable onPress={changeField}>
                <Text style={styles.buttonGreen}>{fields[index]}</Text>
            </Pressable>
        </>

    return (
        <View style={styles.background}>
            <Postings filter={filter} header={header} />
        </View>
    )
}

export default Search

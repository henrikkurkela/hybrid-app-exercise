import React, { useState } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { Link } from 'react-router-native'

import Postings from './postings'

import styles from '../styles'

const Header = ({ filter, setFilter }) => {

    const fields = ['title', 'description', 'category', 'location']

    const [index, setIndex] = useState(0)

    const changeField = () => {

        if (index < fields.length - 1) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }

        setFilter({ ...filter, field: fields[index] })
    }

    return (
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
                <Text style={styles.buttonGreen}>{filter.field}</Text>
            </Pressable>
        </>
    )
}

const Search = () => {

    const [filter, setFilter] = useState({ field: 'title', value: '' })

    return (
        <View style={styles.background}>
            <Postings filter={filter} header={<Header filter={filter} setFilter={setFilter} />} />
        </View>
    )
}

export default Search

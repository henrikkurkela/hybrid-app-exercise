import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
        flex: 1
    },
    container: {
        justifyContent: 'center',
    },
    headline: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
        paddng: 20
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    field: {
        fontSize: 20,
        margin: 20,
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        textAlign: 'center'
    },
    button: {
        fontSize: 20,
        margin: 20,
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'blue',
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center'
    },
    listItem: {
        width: '100%',
        padding: 20,
        borderTopWidth: 1,
        borderColor: 'white',
        flexDirection: 'row'
    },
    listPictureContainer: {
        flex: 1,
        flexGrow: 1,
    },
    listTextContainer: {
        flex: 1,
        flexGrow: 2,
        flexWrap: 'wrap'
    }
})

export default styles

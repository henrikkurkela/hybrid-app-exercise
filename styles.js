import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'black',
        padding: 20,
        flex: 1
    },
    headline: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        margin: 20
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    link: {
        fontSize: 20,
        textAlign: 'center',
        color: 'orange'
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
    buttonRed: {
        fontSize: 20,
        margin: 20,
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'red',
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center'
    },
    buttonGreen: {
        fontSize: 20,
        margin: 20,
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'green',
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
        flexShrink: 1
    },
    image: {
        resizeMode: 'contain',
        aspectRatio: 1,
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    }
})

export default styles

const reducer = (state = null, action) => {

    switch (action.type) {
        case 'AUTHENTICATE':
            return action.data
        case 'RESET':
            return state = null
        default:
            return state
    }
}

export default reducer

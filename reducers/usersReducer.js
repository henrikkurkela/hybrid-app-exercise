const reducer = (state = [], action) => {

    switch (action.type) {
        case 'NEW_USER':
            return state.concat(action.data)
        case 'REMOVE_USER':
            return state.filter(item => item.id !== action.data.id)
        case 'RESET':
            return state = []
        default:
            return state
    }
}

export default reducer

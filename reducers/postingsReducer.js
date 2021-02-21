const reducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_POSTING':
            if (state.find((posting) => posting.id === action.data.id)) {
                return state
            } else {
                return state.concat(action.data)
            }
        case 'REMOVE_POSTING':
            return state.filter((item) => item.id !== action.data.id)
        case 'RESET':
            return state = []
        default:
            return state
    }
}

export default reducer

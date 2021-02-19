const reducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_POSTING':
            if (state.find((posting) => posting.id === action.data.id)) {
                return state
            } else {
                return state.concat(action.data)
            }
        case 'RESET':
            return state = []
        default:
            return state
    }
}

export default reducer

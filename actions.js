import axios from 'axios'

import store from './reducers'

const authenticate = (user) => {
    store.dispatch({
        type: 'AUTHENTICATE',
        data: user
    })
    axios.defaults.headers['Authorization'] = `Bearer ${user.auth}`
}

const addPosting = (posting) => {
    store.dispatch({
        type: 'ADD_POSTING',
        data: posting
    })
}

const removePosting = (posting) => {
    store.dispatch({
        type: 'REMOVE_POSTING',
        data: posting
    })
}

export { authenticate, addPosting, removePosting }

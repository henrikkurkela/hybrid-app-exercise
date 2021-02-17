import axios from 'axios'

import store from './reducers'

const authenticate = (user) => {
    store.dispatch({
        type: 'AUTHENTICATE',
        data: user
    })
    axios.defaults.headers['Authorization'] = `Bearer ${user.auth}`
}

export { authenticate }

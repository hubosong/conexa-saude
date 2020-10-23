import axios from 'axios'
import { Alert } from 'react-native'
import { getUser } from '../Utils'

const api = axios.create({
    baseURL: 'baseURL',
})

api.interceptors.request.use(
    config =>
        getUser()
            .then((user: any) => {
                user = JSON.parse(user)

                if (user && user.data.token) {
                    config.headers.Authorization = `Bearer ${user.data.token.toString()}`
                }

                return Promise.resolve(config)
            })
            .catch(error => {
                return Promise.resolve(config)
            }),

    error => { return Promise.reject(error) },
)

api.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (
            error.request._hasError === true &&
            error.request._response.includes('connect')
        ) {
            Alert.alert(
                'Aviso',
                'Não foi possível conectar aos nossos servidores, sem conexão a internet',
                [{ text: 'OK' }],
                { cancelable: false },
            )
        }
        return Promise.reject(error)
    }
)

export default api
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

const getApi = () => {
    const api = axios.create({
        baseURL: "https://api.secompufscar.com.br/api/v1"
    })  
  
    api.interceptors.request.use(async config => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem("user"))

            if (user) {
                config.headers['Authorization'] = `bearer ${user.token}`
            }

            return config
        } catch(error) { console.log(error) } finally {
            return config
        }
    })

    return api
}

export default getApi()
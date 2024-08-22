import api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage';


type Login = ({
    email: string
    senha: string
})

type SignUp = ({
    nome: string
    email: string
    senha: string
})

export const login = async (data: Login): Promise<User> => {
    const response = await api.post("/users/login", data)

    const { token } = response.data;
        
    // Armazenar o token em AsyncStorage
    await AsyncStorage.setItem('userToken', token);

    return response.data
}

export const signup = async (data: SignUp): Promise<User> => {
    const response = await api.post("/users/signup", data)

    return response.data
}


  
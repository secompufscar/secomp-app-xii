import api from './api'

// GET PARAMETERS EXAMPLE

export const getProfileById = async (id: string): Promise<User> => {
    const { data } = await api.get(`/getProfile/${id}`)

    return data
}

// POST EXAMPLE

export const setProfile = async (data: User): Promise<User> => {
    const response = await api.post<User>('/setProfile')

    return response.data
}
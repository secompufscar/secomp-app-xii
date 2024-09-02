import { useAuth } from '../hooks/AuthContext'
import api from './api'

type Activity = ({
    id: string
    nome: string
    palestranteNome: string
    data: string
    vagas: string
    detalhes: string
    categoriaId: string
})


export const getActivities = async (): Promise<Activity[]> => {
   const response = await api.get('/activities/')

    return response.data
}

export const getUserSubscribedActivities = async (userId: string): Promise<Activity[]> => {
    const response = await api.get(`/userAtActivities/all-activities/${userId}`)

    return response.data
}

export type { Activity };

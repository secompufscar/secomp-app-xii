import api from './api';

type UserAtActivity = {
    id: string;
    userId: string;
    activityId: string;
    presente: boolean;
    inscricaoPrevia: boolean;
    listaEspera: boolean;
};

export const userSubscription = async (userId: string, activityId: string): Promise<UserAtActivity> => {
    // Corrigido para usar crase (backticks) na URL
    const response = await api.get(`/userAtActivities/user-activity/${userId}/${activityId}`);

    return response.data;
};
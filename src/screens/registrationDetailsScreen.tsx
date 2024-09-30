import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { ScheduleItemProps } from "../entities/schedule-item";
import { useRoute } from "@react-navigation/native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";
import { useAuth } from "../hooks/AuthContext";
import { subscribeToActivity, unsubscribeToActivity } from "../services/activities";
import { userSubscription } from "../services/userAtActivities";
import { ButtonHome } from "../components/buttonHome";

const isIos: Boolean = Platform.OS === 'ios'

type RegistrationDetailsProps = {
    item: Activity
    registered: UserAtActivity
}

export default function RegistrationDetails() {
    const navigation = useNavigation();
    const route = useRoute()
    const { user: { user } }: any = useAuth()
    const [subscriptionData, setSubscriptionData] = useState<UserAtActivity | null>(null);

    const { item, registered } = route.params as RegistrationDetailsProps

    useEffect(() => {
        async function Subscription() {
            try {
                const data = await userSubscription(user.id, item.id);
                setSubscriptionData(data);  // Atualiza o estado com os dados recebidos
            } catch (error) {
                console.error("Error fetching subscription data:", error);
            }
        }

        Subscription();
    }, [user.id, item.id]);

    useEffect(() => {
        if (subscriptionData) {
            console.log("Subscription Data:", subscriptionData);
        } else {
            console.log("No Subscription Data found");
        }
    }, [subscriptionData]); 


    async function requestSubscription() {

        // subscribeToActivity(user.id, item.id)
        // navigation.goBack()

        try {
           const response =  await subscribeToActivity(user.id, item.id);  // Aguarda a resolução da promise
           const {listaEspera} = response.data
            if(listaEspera==true)
                Alert.alert('Limite de vagas atingido', 'O limite de vagas foi atingidio. Você entrou na lista de espera');
            else
                Alert.alert('Inscrição realizada', 'Sua inscrição foi realizada com sucesso.');

            navigation.goBack();  // Navega de volta após o sucesso
        } catch (error) {
            console.error('Erro ao tentar se inscrever:', error);  // Captura e exibe qualquer erro
            // Você pode exibir um alerta ou notificação de erro aqui
            Alert.alert('Erro', 'Não foi possível realizar a inscrição. Tente novamente mais tarde.');
        }
    
    }

    function requestUnSubscription() {
        Alert.alert(
            'Confirmar desistência',
            `Você realmente deseja cancelar sua inscrição nesta atividade?`,
            [{
                text: 'OK', onPress: () => {
                    unsubscribeToActivity(user.id, item.id)
                        .then(() => {
                            Alert.alert("Desinscrição realizada", "Você foi desinscrito com sucesso.");
                            navigation.goBack(); 
                        })
                        .catch(error => {
                            Alert.alert("Erro", "Ocorreu um erro ao tentar se desinscrever.");
                            console.error(error);
                        });
                }

            }]
        );
    }

    return (
        <View className='bg-white flex-1'>
            <View className={`flex-row justify-start items-center pt-12 px-4 gap-4`}>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="#445BE6" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-blue'>Inscrições</Text>
                {/* <TouchableOpacity className='pl-10' disabled={true}>
                    <AntDesign name="search1" size={24} color="#51B68D" />
                </TouchableOpacity> */}
            </View>
            {/* <View className="flex-row justify-around mx-12 pt-6">
                <TouchableOpacity disabled={true}>
                    <Text className={`text-xl font-bold text-blue ${(!subscriptionData) && "underline"}`}>Inscreva-se</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={true}>
                    <Text className={`text-xl font-bold text-blue ${(subscriptionData) && "underline"}`}>Inscritos</Text>
                </TouchableOpacity>
            </View> */}

            <View className="p-8 mt-16 mb-16">
                <View className='flex flex-col justify-start p-2 bg-white rounded-2xl' style={(isIos) ? [styles.shadowProp] : [styles.elevation]}>
                    <View className="p-4">
                        <View className='pb-4 items-center'>
                            <Text className='text-xl font-bold text-blue'>{item.nome}</Text>
                        </View>
                        <View className=''>
                            <View className='flex-row items-center pb-1'>
                                <AntDesign name="calendar" size={24} color="#445BE6" />
                                <Text className='pl-2'>{item.data.substring(0, 10)}</Text>
                            </View>
                            <View className='flex-row items-center pb-1'>
                                <Ionicons name="time-outline" size={24} color="#445BE6" />
                                <Text className='pl-2'>{item.data.substring(11, 16)}</Text>
                            </View>
                            <View className='flex-row items-center pb-1'>
                                <AntDesign name="team" size={24} color="#445BE6" />
                                <Text className='pl-2'>{item.palestranteNome}</Text>
                            </View>
                            <View className='flex-row items-center pb-1'>
                                <AntDesign name="enviromento" size={24} color="#445BE6" />
                                <Text className='pl-2'>{item.local}</Text>
                            </View>
                            <View className='flex-row pb-1 items-start'>
                                <Ionicons name="information-circle-outline" size={24} color="#445BE6" />
                                <Text className='pl-2 flex text-justify'>
                                    {item.detalhes}
                                </Text>
                            </View>

                            {/* <View className='flex-row items-center pb-1'>
                                <AntDesign name="enviromento" size={24} color="#445BE6" />
                                <Text className='pl-2'>{item.vagas}</Text>
                            </View> */}
                        </View>
                    </View>
                    <View className="pt-10"></View>
                </View>
            </View>

            <View className="flex items-center" style={(isIos) ? [styles.shadowProp] : [styles.elevation]}>
                {subscriptionData ? (
                    <ButtonHome title="DESINSCREVA-SE" onPress={requestUnSubscription} />

                ) : (
                    <ButtonHome title="INSCREVA-SE" onPress={requestSubscription} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -1, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 5,
        shadowColor: '#171717',
    },
})


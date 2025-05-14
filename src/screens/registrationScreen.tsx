import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Animated, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ScheduleItemProps } from '../entities/schedule-item';
import MyEvent from '../components/myEvent';
import { getActivities, getUserSubscribedActivities } from '../services/activities';
import { useAuth } from '../hooks/AuthContext';


import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

const formatDate = (date: Date) => {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatDayOfWeek = (dateString: string) => {
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    // Desmembrando a string "YYYY-MM-DD" e criando a data no fuso horário local
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Mês em JS começa de 0

    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
};

const groupByDate = (items: Activity[]): Record<string, Activity[]> => {
    const grouped = items.reduce((acc: Record<string, Activity[]>, item: Activity) => {
        // Normalizando a data para o formato YYYY-MM-DD
        const dateKey = item.data.substring(0, 10); // Pegando somente a data (primeiros 10 caracteres)

        (acc[dateKey] = acc[dateKey] || []).push(item);
        return acc;
    }, {});

    // Ordenando as datas em ordem crescente
    const sortedGrouped = Object.keys(grouped)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .reduce((acc: Record<string, Activity[]>, key: string) => {
            // Ordenar os itens dentro de cada data pelo horário 
            acc[key] = grouped[key].sort((a, b) => {
                const timeA = a.data.substring(11, 16);
                const timeB = b.data.substring(11, 16);
                return timeA.localeCompare(timeB);
            });
            return acc;
        }, {});

    return sortedGrouped;
};



export default function Registration() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("")
    const [searching, setSearching] = useState(false)
    const [items, setItems] = useState<Activity[]>([])
    const [registered, setRegistered] = useState(false)
    const { user: { user } }: any = useAuth()
    const [loading, setLoading] = useState(false);


    const anim = useRef(new Animated.Value(0)).current;
    //ADICIONAR CARREGAMENTO DE TELA 

    const open = () => {
        Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    const close = () => {
        Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);  // Iniciar o carregamento

            try {
                const fetchedItemsUnsubscribed: Activity[] = await getActivities();
                const fetchedItemsSubscribed: UserAtActivity[] = await getUserSubscribedActivities(user.id);

                const validFetchedItemsSubscribed = fetchedItemsSubscribed || [];
                const validFetchedItemsUnsubscribed = fetchedItemsUnsubscribed || [];

                let filteredItems: Activity[] = validFetchedItemsUnsubscribed;

                console.log('Unsubscribed Items:', validFetchedItemsUnsubscribed);
                console.log('Subscribed Items:', validFetchedItemsSubscribed);

                if (registered) {
                    const subscribedActivityIds = validFetchedItemsSubscribed.map((subscription) => subscription.activityId);

                    // Filtra as atividades completas a partir dos `activityId` das inscrições
                    filteredItems = validFetchedItemsUnsubscribed.filter(activity =>
                        subscribedActivityIds.includes(activity.id)
                    );
                    console.log('Subscribed Activities:', filteredItems);

                } else {
                    // Se estiver visualizando os não inscritos, filtre as atividades
                    filteredItems = validFetchedItemsUnsubscribed.filter(unsubscribedItem =>
                        !validFetchedItemsSubscribed.some(subscribedItem => subscribedItem.id === unsubscribedItem.id)
                    );
                }

                // Se estiver buscando, aplique o filtro de busca
                if (searching) {
                    filteredItems = filteredItems.filter(item => item.nome.toLowerCase().includes(search.toLowerCase()));
                }

                filteredItems = filteredItems.filter(item => item.categoriaId === '1');

                setItems(filteredItems);
            } catch (error) {
                console.error("Erro ao buscar atividades: ", error);
            } finally {
                setLoading(false);  // Encerrar o carregamento
            }

        };

        fetchItems();
    }, [registered, search, searching, user.id]);


    function handleSearch(str: string) {
        setSearch(str)
    }

    function handleSearching() {
        if (searching) {
            close()
        } else {
            open()
        }
        setSearching(!searching)
    }

    const groupedItems = groupByDate(items);
    console.log('Subscribed Items:', items);


    const handlePress = (item: Activity, registered: boolean = false) => {
        // @ts-ignore
        navigation.navigate('RegistrationDetails', { item, registered });
    }

    return (
        <View className='bg-white flex-1 px-8 pb-8'>
            <View className={`flex-row justify-center items-center mt-10 ${(!searching) && 'pb-8'}`}>
                <TouchableOpacity className='py-2 px-3' style={{ position: 'absolute', left: 0, top: 0 }} onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="chevron-left" size={14} color="#000000" />
                </TouchableOpacity>

                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-xl text-black pt-0.5'>Eventos</Text>
            </View>

            {searching && (
                <Animated.View className='p-2' style={{
                    transform: [{
                        translateY: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 0]
                        })
                    }]
                }}>
                    <TextInput
                        className="bg-gray-200 rounded-md border p-2"
                        placeholder="Buscar eventos"
                        onChangeText={handleSearch}
                        value={search}
                    />
                </Animated.View>
            )}
            {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#445BE6" />
            </View>
            ) : (
                <>
                    <View className="flex-row justify-between mb-5 px-2">
                        <TouchableOpacity className='w-[47%]' onPress={() => setRegistered(false)}>
                            <View
                                style={{
                                    backgroundColor: !registered ? 'rgba(68, 91, 230, 0.1)' : 'rgba(229, 231, 235, 0.4)', // bg-blue-old/10 ou bg-neutral-200/40
                                    borderRadius: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Inter_600SemiBold',
                                        color: !registered ? '#445BE6' : 'rgba(107, 114, 128, 0.7)', // text-blue-old ou text-neutral-500/70
                                        fontSize: 18, // text-lg
                                        paddingHorizontal: 4,
                                        paddingVertical: 10,
                                        textAlign: 'center',
                                    }}
                                >
                                    Inscreva-se
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className='w-[47%]' onPress={() => setRegistered(true)}>
                            <View
                                style={{
                                    backgroundColor: registered ? 'rgba(68, 91, 230, 0.1)' : 'rgba(229, 231, 235, 0.4)', // bg-blue-old/10 ou bg-neutral-200/40
                                    borderRadius: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Inter_600SemiBold',
                                        color: registered ? '#445BE6' : 'rgba(107, 114, 128, 0.7)', // text-blue-old ou text-neutral-500/70
                                        fontSize: 18, // text-lg
                                        paddingHorizontal: 4,
                                        paddingVertical: 10,
                                        textAlign: 'center',
                                    }}
                                >
                                    Inscritos
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <ScrollView className="flex py-0">
                        <View className='flex-row flex-wrap justify-around'>
                            {Object.keys(groupedItems).map((date) => (
                                <View key={date} className="w-full mb-4">
                                    <View className='flex-1 flex-row justify-start items-center mt-4 mb-2 px-2 space-x-2'>
                                        <MaterialIcons name="event" size={20} color="#445BE6" />
                                        <Text style={{ fontFamily: 'Inter_600SemiBold' }} className="text-lg text-neutral-700">{formatDate(new Date(date.substring(0, 10)))}</Text>
                                        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-md text-neutral-700/50 pt-0.5">{formatDayOfWeek(date.substring(0, 10))}</Text>
                                    </View>

                                    <View className='flex-row flex-wrap justify-between'>
                                        {groupedItems[date].map((item, index) => (
                                            <View
                                                className='p-2 w-full'
                                                key={index}
                                            >
                                                <MyEvent
                                                    scheduleItem={item}
                                                    onClick={() => handlePress(item)}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </>)}


        </View>
    );
}
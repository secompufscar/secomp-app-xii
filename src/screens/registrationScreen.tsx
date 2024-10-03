import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ScheduleItemProps } from '../entities/schedule-item';
import { AntDesign } from '@expo/vector-icons';
import MyEvent from '../components/myEvent';
import { getActivities, getUserSubscribedActivities } from '../services/activities';
import { useAuth } from '../hooks/AuthContext';

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const groupByDate = (items: Activity[]): Record<string, Activity[]> => {
    return items.reduce((acc: Record<string, Activity[]>, item: Activity) => {
        (acc[item.data] = acc[item.data] || []).push(item);
        return acc;
    }, {});
};

export default function Registration() {
    const navigation = useNavigation();
    const currentDayString = "13"
    const [search, setSearch] = useState("")
    const [searching, setSearching] = useState(false)
    const [items, setItems] = useState<Activity[]>([])
    const [registered, setRegistered] = useState(false)
    const {user:{user}}: any = useAuth()

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
            const fetchedItemsUnsubscribed: Activity[] = await getActivities();

            const fetchedItemsSubscribed: Activity[] = await getUserSubscribedActivities(user.id);


            const validFetchedItemsSubscribed = fetchedItemsSubscribed || [];
        
            let filteredItems: Activity[] = fetchedItemsUnsubscribed || [];
        
            console.log('Unsubscribed Items:', fetchedItemsUnsubscribed);
            console.log('Subscribed Items:', fetchedItemsSubscribed);

            
            if (registered) {
                filteredItems = fetchedItemsSubscribed;
            } else {
                filteredItems = fetchedItemsUnsubscribed.filter(unsubscribedItem => 
                    !validFetchedItemsSubscribed.some(subscribedItem => subscribedItem.id === unsubscribedItem.id)
                );
            }
        
            if (searching) {
                filteredItems = filteredItems.filter(item => item.nome.includes(search));
            }
        
            setItems(filteredItems);
        };

        fetchItems();
    }, [registered, search]);

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

    const handlePress = (item: Activity, registered: boolean = false) => {
        // @ts-ignore
        navigation.navigate('RegistrationDetails', { item, registered });
    }

    return (
        <View className='bg-white flex-1'>
            <View className={`flex-row justify-start items-center pt-12 ${(!searching) && 'pb-10'} px-4 gap-4`}>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="#445BE6" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-blue'>Inscrições</Text>
                {/* <TouchableOpacity className='pl-25'> 
                    <AntDesign name="search1" size={24} color="#445BE6" onPress={handleSearching} />
                </TouchableOpacity> */}
            </View>
            {searching && (
                <Animated.View className='p-4' style={{
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
{/* 
            <View className="flex-row justify-around mx-12 mb-5">
                <TouchableOpacity onPress={() => setRegistered(false)}>
                    <Text className={`text-xl font-bold text-blue ${(!registered) && "underline"}`}>Inscreva-se</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRegistered(true)}>
                    <Text className={`text-xl font-bold text-blue ${(registered) && "underline"}`}>Inscritos</Text>
                </TouchableOpacity>
            </View> 
 */}

            <ScrollView className="flex px-5 py-0">
                <View className='flex-row flex-wrap justify-around'>
                    {Object.keys(groupedItems).map((date) => (
                        <View key={date} className="w-full">
                            <View className='flex-1 justify-center items-center pb-6'>
                                <Text className="text-2xl font-bold text-blue">{date.substring(0, 10)}</Text>
                            </View>
                            <View className='flex-row flex-wrap justify-around'>
                                {groupedItems[date].map((item, index) => (
                                    <View className='pb-4 px-2 bg-white flex-wrap' key={index}>
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

            
        </View>
    );
}

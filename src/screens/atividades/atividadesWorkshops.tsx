import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/AuthContext";
import { getActivities } from '../../services/activities';

export default function Workshops() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { user: { user } }: any = useAuth();

    const [activities, setActivities] = useState<Activity[]>([]);

    // Id da cateogira workshops
    const categoriaId = "b9fa7e7a-b313-45fe-868c-3b80149103cb";

    useEffect(() => {
        const getActivitiesData = async () => {
            const data = await getActivities();
            setActivities(data);
        };

        getActivitiesData();
    }, []);

    const renderActivity = ({ item }: { item: Activity }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('QRCode', { id: item.id }) }}>
            <View className='grow h-32 flex-row space-x-1 rounded-lg bg-neutral-200/20 my-2'>
                <View className='w-[84%] flex-col px-6 py-4 justify-between'>
                    <View className='w-full'>
                        <Text className='text-xl font-semibold text-neutral-700'>{item.nome}</Text>
                        <Text className='text-base text-neutral-500'>{item.detalhes}</Text>
                    </View>

                    <View className=''>
                        <Text className='text-base text-blue'>{item.palestranteNome}</Text>
                    </View>
                </View>

                <View className='w-14 h-full ml-2 items-center justify-center'>
                    <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
                </View>
            </View>
        </TouchableOpacity>
    );

    // Filtra as atividades pelo `categoriaId`
    const filteredActivities = activities.filter(activity => activity.categoriaId === categoriaId);

    return (
        <SafeAreaView className='bg-white flex-1'>
            
            <View className='flex-row justify-start items-center pt-12 pb-5 px-4 gap-4'>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="#445BE6" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-blue'>Workshops</Text>
            </View>

            <FlatList
                className='px-2'
                data={filteredActivities}
                renderItem={renderActivity}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16 }}
            />
            
        </SafeAreaView>
    );
}
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
    const categoriaId = "3";

    useEffect(() => {
        const getActivitiesData = async () => {
            const data = await getActivities();
            setActivities(data);
        };

        getActivitiesData();
    }, []);

    const renderActivity = ({ item }: { item: Activity }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('QRCode', { id: item.id }) }}>
            <View className='justify-between flex-row rounded-lg bg-neutral-200/20 my-2 border border-neutral-200/40'>
                <View className='flex-col px-6 py-4 justify-between max-w-[80%]'>
                    <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-base text-neutral-700 mb-1 truncate'>
                        {item.nome}
                    </Text>

                    <Text style={{ fontFamily: 'Inter_400Regular' }} className='text-base text-blue truncate'>
                        {item.palestranteNome}
                    </Text>
                </View>
    
                <View className='w-14 ml-2 items-center justify-center'>
                    <FontAwesome6 name="chevron-right" size={18} color="#a3a3a3" />
                </View>
            </View>
        </TouchableOpacity>
    );

    // Filtra as atividades pelo `categoriaId`
    const filteredActivities = activities.filter(activity => activity.categoriaId === categoriaId);

    return (
        <SafeAreaView className='bg-white flex-1 px-8'>
            <View className={"flex-row justify-center items-center mt-10"}>
                <TouchableOpacity className='py-2 px-3' style={{ position: 'absolute', left: 0, top: 0 }} onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="chevron-left" size={14} color="#000000" />
                </TouchableOpacity>

                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-xl text-black pt-0.5'>Workshops</Text>
            </View>

            <FlatList
                className='mt-5'
                data={filteredActivities}
                renderItem={renderActivity}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 10 }}
            />
            
        </SafeAreaView>
    );
}
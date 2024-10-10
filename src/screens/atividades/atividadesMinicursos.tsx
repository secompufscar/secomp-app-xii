import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/AuthContext";
import { getActivities } from '../../services/activities';

export default function Minicursos() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { user: { user } }: any = useAuth();

    const [activities, setActivities] = useState<Activity[]>([]);

    // Id da cateogira minicurso
    const categoriaId = "1";

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
                    <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-base text-neutral-700 mb-1'>
                        {item.nome}
                    </Text>

                    <Text style={{ fontFamily: 'Inter_400Regular' }} className='text-base text-blue'>
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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 32 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={{ paddingVertical: 8, paddingHorizontal: 12, position: 'absolute', left: 0, top: 0 }} onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="chevron-left" size={14} color="#000000" />
                </TouchableOpacity>

                <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 20, color: 'black' }}>Minicursos</Text>
            </View>

            <FlatList
                style={{ marginTop: 28, paddingHorizontal: 10}}
                data={activities}
                renderItem={renderActivity}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}
import { useEffect, useState } from 'react';
import { getActivities } from '../../services/activities';
import { Pressable, View, Text, FlatList, Image } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function CompetitionsList(){
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [activities, setActivities] = useState<Activity[]>([]);
    const categoriaId = "4";

    // Formatação da data
    const formatDate = (date: Date) => {
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    };

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getActivities();
                setActivities(data);
            } catch (error) {
                console.error("Erro ao buscar atividades para homepage:", error);
            }
        };

        fetchActivities();
    }, []);

    // Filtra as atividades pelo `categoriaId`
    const filteredActivities = activities.filter(activity => activity.categoriaId === categoriaId);

    const renderActivity = ({ item }: { item: Activity }) => {
        return (
            <Pressable onPress={() => { navigation.navigate('RegistrationDetails', { item }) }}>
                <View className="w-full flex-row py-3 gap-1 border-b-[1px] border-[#242936]">
                    <View className="flex-1 flex-col gap-2">
                        <Text className="text-white text-[13px] font-inter">{item.nome}</Text>
                        
                        <View className="flex-row">
                            <Text className="text-default text-[12px] text-inter">Data: </Text>
                            <Text className="text-blue-200 text-[12px] text-inter mr-3">{formatDate(new Date(item.data.substring(0, 10)))}</Text>
                            <Text className="text-default text-[12px] text-inter">Horário: </Text>
                            <Text className="text-blue-200 text-[12px] text-inter" >{item.data.substring(11, 16)}</Text>
                        </View>
                    </View>

                    <View className="h-full flex items-center justify-center">
                        <Image source={require('../../../assets/home/arrow.svg')} style={{ height: 36 }}/>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View className="">
            { filteredActivities ?
                <FlatList
                    data={filteredActivities}
                    renderItem={renderActivity}
                    keyExtractor={(item) => item.id.toString()}
                />
            :
            <View className="w-full">
                <Text className="text-default text-[12px] font-inter">
                    Nenhuma competição encontrada.
                </Text>
            </View>
            }
        </View>
    );
}
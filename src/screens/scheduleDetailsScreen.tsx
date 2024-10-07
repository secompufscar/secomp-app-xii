import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ScheduleItemProps } from "../entities/schedule-item";
import { useRoute } from "@react-navigation/native";
import { FontAwesome6, AntDesign, Ionicons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


type ScheduleDetailsProps = {
    item: Activity
}

const formatDate = (date: Date) => {
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


export default function ScheduleDetails() {
    const navigation = useNavigation()
    const route = useRoute();
    // Utiliza parametros da rotas para pegar o item selecionado
    const { item } = route.params as ScheduleDetailsProps;

    return (
        <View className='bg-white flex-1'>
            <View className={`flex-row justify-center items-center mt-12  'pb-8'}`}>
                <TouchableOpacity className='py-2 px-3' style={{ position: 'absolute', left: 0, top: 0 }} onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="chevron-left" size={14} color="#000000" />
                </TouchableOpacity>

                <Text style={{ fontFamily: 'Inter_600SemiBold' }} className='text-xl text-black pt-0.5'>Detalhes</Text>
            </View>

            <View className="p-8 mt-5 mb-3">
                <View className='flex flex-col justify-start p-2 bg-white rounded-3xl' style={styles.elevation}>
                    <View className="p-4">
                        <View className='pb-4 items-center'>
                            <Text className='font-bold text-black'>{item.nome}</Text>
                        </View>
                        <View className=''>
                            <View className='flex-row items-center pb-1'>
                                <AntDesign name="calendar" size={24} color="#445BE6" />
                                <Text className='pl-2'>{formatDate(new Date(item.data.substring(0, 10)))}</Text>
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
                            <View className='flex-row pb-1 items-start mr-4'>
                                <Ionicons name="information-circle-outline" size={24} color="#445BE6" />
                                <Text className='pl-2 flex text-justify'>
                                    {item.detalhes}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 4,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
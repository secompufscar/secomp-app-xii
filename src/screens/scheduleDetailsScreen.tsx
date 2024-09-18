import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScheduleItemProps } from "../entities/schedule-item";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


type ScheduleDetailsProps = {
    item: Activity
}

export default function ScheduleDetails() {
    const navigation = useNavigation()
    const route = useRoute();
    // Utiliza parametros da rotas para pegar o item selecionado
    const { item } = route.params as ScheduleDetailsProps;

    return (
        <View className='bg-white flex-1'>
            <View className='flex-row justify-start items-center pt-12 pb-6 px-4 gap-4'>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="#445BE6" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-blue'>Detalhes</Text>
            </View>
            <View>
                <Text className="text-2xl text-center text-blue font-bold">{item.nome}</Text>
                <View className="p-4 gap-4">
                    <Text className="text-xl">
                        <Text className="text-xl font-bold text-blue">Data:</Text> <Text>{item.data.substring(0, 10)}</Text>
                    </Text>
                    <Text className="text-xl">
                        <Text className="text-xl font-bold text-blue">Horário:</Text> <Text>{item.data.substring(11, 16)}</Text>
                    </Text>
                    <Text className="text-xl">
                        <Text className="text-xl font-bold text-blue text-justify">Descrição:</Text> <Text> {item.detalhes}</Text>
                    </Text>
                    <Text className="text-xl">
                        <Text className="text-xl font-bold text-blue">Vagas:</Text> <Text> {item.vagas}</Text>
                    </Text>
                    <Text className="text-xl">
                        <Text className="text-xl font-bold text-blue">Palestrante:</Text> <Text> {item.palestranteNome}</Text>
                    </Text>
                </View>
                <View className="items-center">
            </View>
            </View>
        </View>
    );
}

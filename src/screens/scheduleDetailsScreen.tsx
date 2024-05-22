import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScheduleItemProps } from "../entities/schedule-item";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

type ScheduleDetailsProps = {
    item: ScheduleItemProps
}

export default function ScheduleDetails() {
    const navigation = useNavigation()
    const route = useRoute();
    // Utiliza parametros da rotas para pegar o item selecionado
    const { item } = route.params as ScheduleDetailsProps;

    return (
        <View>
            <View className='flex-row justify-start items-center pt-12 pb-6 px-4 gap-4'>
                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={24} color="#51B68D" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text className='text-3xl font-bold text-green-700'>Detalhes</Text>
            </View>
            <View>
                <Text className="text-2xl text-center font-bold">{item.title}</Text>
                <View className="p-4 gap-4">
                    <Text>Date: {item.date}</Text>
                    <Text>Description: {item.description}</Text>
                    <Text>Location: {item.location}</Text>
                    <Text>Speaker: {item.speaker}</Text>
                </View>
            </View>
        </View>
    );
}
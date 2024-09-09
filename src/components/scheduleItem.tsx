import React from 'react';
import {View, Text, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { ScheduleItemProps } from '../entities/schedule-item';

type ScheduleItemComponentProps = {
    scheduleItem: Activity;
    onClick: () => void;
}

// Componente de ítens do cronogramam, pode ser mudado depois para aceitar mais informações
export default function ScheduleItemComponent({scheduleItem, onClick}: ScheduleItemComponentProps) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View className='flex flex-row justify-start min-w-full items-center p-4 rounded-md bg-blue'>
                <View className='pl-8 pr-4'>
                    <Text className='text-white'>{scheduleItem.data.substring(11, 16)}</Text>
                </View>
                <View className='pl-4 pr-8 max-w-[80%]'>
                    <Text className='text-white'>{scheduleItem.nome} - {scheduleItem.palestranteNome}</Text>
                    <Text className='text-white'>{scheduleItem.detalhes}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
